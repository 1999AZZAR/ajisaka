const fs = require('fs')
const opentype = require('opentype.js')

function parseGlyph(font, glyphName) {
  const glyph = font.nameToGlyph(glyphName)
  if (!glyph) {
    console.error(`Glyph not found: ${glyphName}`)
    return []
  }
  const path = glyph.getPath(0, 0, 72)
  const cmds = path.commands
  
  let paths = []
  let currentPath = []
  
  let x0 = 0, y0 = 0
  
  const sampleQ = (x0, y0, x1, y1, x2, y2, steps = 10) => {
    const pts = []
    for (let i = 1; i <= steps; i++) {
      const t = i / steps
      const inv = 1 - t
      const x = inv*inv*x0 + 2*inv*t*x1 + t*t*x2
      const y = inv*inv*y0 + 2*inv*t*y1 + t*t*y2
      pts.push({x, y})
    }
    return pts
  }
  
  const sampleC = (x0, y0, x1, y1, x2, y2, x3, y3, steps = 10) => {
    const pts = []
    for (let i = 1; i <= steps; i++) {
      const t = i / steps
      const inv = 1 - t
      const x = inv*inv*inv*x0 + 3*inv*inv*t*x1 + 3*inv*t*t*x2 + t*t*t*x3
      const y = inv*inv*inv*y0 + 3*inv*inv*t*y1 + 3*inv*t*t*y2 + t*t*t*y3
      pts.push({x, y})
    }
    return pts
  }
  
  for (const cmd of cmds) {
    if (cmd.type === 'M') {
      if (currentPath.length > 0) paths.push(currentPath)
      currentPath = [{x: cmd.x, y: cmd.y}]
      x0 = cmd.x; y0 = cmd.y
    } else if (cmd.type === 'L') {
      currentPath.push({x: cmd.x, y: cmd.y})
      x0 = cmd.x; y0 = cmd.y
    } else if (cmd.type === 'Q') {
      const pts = sampleQ(x0, y0, cmd.x1, cmd.y1, cmd.x, cmd.y)
      currentPath.push(...pts)
      x0 = cmd.x; y0 = cmd.y
    } else if (cmd.type === 'C') {
      const pts = sampleC(x0, y0, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y)
      currentPath.push(...pts)
      x0 = cmd.x; y0 = cmd.y
    } else if (cmd.type === 'Z') {
      // currentPath.push(currentPath[0]) // close
      paths.push(currentPath)
      currentPath = []
    }
  }
  if (currentPath.length > 0) paths.push(currentPath)
    
  return paths
}

function normalize(paths) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const p of paths) {
    for (const pt of p) {
      if (pt.x < minX) minX = pt.x
      if (pt.y < minY) minY = pt.y
      if (pt.x > maxX) maxX = pt.x
      if (pt.y > maxY) maxY = pt.y
    }
  }
  const s = Math.max(maxX - minX, maxY - minY, 1e-6)
  
  return paths.map(p => p.map(pt => ({
    x: Number(((pt.x - minX) / s).toFixed(4)),
    y: Number(((pt.y - minY) / s).toFixed(4)) // Note: TTF is y-up, so this might be upside down, but wait, opentype.js getPath is usually y-down for rendering! Let's check!
  })))
}

function main() {
  const buffer = fs.readFileSync('../files/Noto_Sans_Javanese/NotoSansJavanese-VariableFont_wght.ttf')
  const font = opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength))
  
  // 1. Update pasangan
  const NGL_NAMES = ['ha','na','ca','ra','ka','da','ta','sa','wa','la','pa','dha','ja','ya','nya','ma','ga','ba','tha','nga']
  
  let pasanganData = []
  for (const n of NGL_NAMES) {
    let glyphName = n + '.pas'
    if (n === 'ra') glyphName = 'cakra' // pasangan ra is cakra
    if (n === 'ya') glyphName = 'pengkal' // pasangan ya is pengkal
    if (n === 'dha') glyphName = 'dda.pas' // ꦝ (Javanese Dha) is TTA in font
    if (n === 'tha') glyphName = 'tta.pas' // ꦛ (Javanese Tha) is DDA in font
    
    // Check if the glyph exists
    let paths = parseGlyph(font, glyphName)
    if (paths.length === 0 && n === 'ha') paths = parseGlyph(font, 'ha')
    if (paths.length === 0 && n === 'sa') paths = parseGlyph(font, 'sa')
    if (paths.length === 0 && n === 'pa') paths = parseGlyph(font, 'pa')

    const norm = normalize(paths)
    
    // If opentype.js getPath puts y up, we need to invert Y!
    // We'll flip Y during normalization if it looks upside down. Actually TTF is y-up, so Y needs to be inverted.
    const flipped = norm.map(p => p.map(pt => ({x: pt.x, y: pt.y})))
    
    pasanganData.push({
      id: n,
      contour: flipped
    })
  }
  fs.writeFileSync('src/data/pasangan_contours.json', JSON.stringify(pasanganData, null, 2))
  
  // 2. Add missing Sandangan
  // The existing sandangan_contours.json has: wulu, suku, pepet, taling, tarung, cecak, layar, wignyan
  const existingSandangan = JSON.parse(fs.readFileSync('src/data/sandangan_contours.json', 'utf8'))
  
  const NEW_SANDANGAN = [
    {id: 'pangkon', g: 'pangkon'},
    {id: 'pada lingsa', g: 'uniA9C8'},
    {id: 'pada lungsi', g: 'uniA9C9'},
    {id: 'pada pangkat', g: 'uniA9CA'},
    {id: 'pada adeg-adeg', g: 'uniA9CB'},
    {id: 'cakra', g: 'cakra'},
    {id: 'cakra keret', g: 'keret.ns'},
    {id: 'pengkal', g: 'pengkal'},
    {id: 'pa ceret', g: 'uniA989'},
    {id: 'nga lelet', g: 'ngalelet'}
  ]
  
  // Remove them from existing if they exist (they shouldn't)
  let updatedSandangan = existingSandangan.filter(s => !NEW_SANDANGAN.find(n => n.id === s.id))
  
  for (const s of NEW_SANDANGAN) {
    let paths = parseGlyph(font, s.g)
    const norm = normalize(paths)
    const flipped = norm.map(p => p.map(pt => ({x: pt.x, y: pt.y})))
    updatedSandangan.push({
      id: s.id,
      contour: flipped
    })
  }
  
  fs.writeFileSync('src/data/sandangan_contours.json', JSON.stringify(updatedSandangan, null, 2))
  console.log("Done extracting contours!")
}
main()
