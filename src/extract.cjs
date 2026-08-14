const opentype = require('opentype.js');
const fs = require('fs');

const NGGLEGENA_IDS = [
  'ha', 'na', 'ca', 'ra', 'ka',
  'da', 'ta', 'sa', 'wa', 'la',
  'pa', 'dha', 'ja', 'ya', 'nya',
  'ma', 'ga', 'ba', 'tha', 'nga'
];

const PASANGAN_MAP = {};
NGGLEGENA_IDS.forEach(id => PASANGAN_MAP[id] = id + '.pas');

const SANDANGAN_MAP = {
  'wulu': 'i.ns',
  'suku': 'u.ns',
  'pepet': 'ae.ns',
  'taling': 'taling',
  'tarung': 'tarung',
  'cecak': 'cecak.ns',
  'layar': 'layar.ns',
  'wignyan': 'wignyan'
};

function sampleQuadratic(p0, p1, p2, steps = 5) {
  const pts = [];
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const inv = 1 - t;
    const x = inv * inv * p0.x + 2 * inv * t * p1.x + t * t * p2.x;
    const y = inv * inv * p0.y + 2 * inv * t * p1.y + t * t * p2.y;
    pts.push({ x, y });
  }
  return pts;
}

function sampleCubic(p0, p1, p2, p3, steps = 10) {
  const pts = [];
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const inv = 1 - t;
    const x = inv*inv*inv*p0.x + 3*inv*inv*t*p1.x + 3*inv*t*t*p2.x + t*t*t*p3.x;
    const y = inv*inv*inv*p0.y + 3*inv*inv*t*p1.y + 3*inv*t*t*p2.y + t*t*t*p3.y;
    pts.push({ x, y });
  }
  return pts;
}

function extractGlyph(font, glyphName) {
  const glyphIndex = font.charToGlyphIndex(glyphName);
  let glyph = font.glyphs.get(glyphIndex);
  if (!glyph || glyph.name !== glyphName) {
    glyph = Object.values(font.glyphs.glyphs).find(g => g.name === glyphName);
  }
  if (!glyph) {
    console.error("Missing:", glyphName);
    return [];
  }
  
  const path = glyph.getPath(0, 0, 72);
  const subpaths = [];
  let currentSubpath = [];
  let currentPoint = {x: 0, y: 0};
  
  for (const cmd of path.commands) {
    if (cmd.type === 'M') {
      if (currentSubpath.length > 0) subpaths.push(currentSubpath);
      currentSubpath = [{ x: cmd.x, y: cmd.y }];
      currentPoint = { x: cmd.x, y: cmd.y };
    } else if (cmd.type === 'L') {
      currentSubpath.push({ x: cmd.x, y: cmd.y });
      currentPoint = { x: cmd.x, y: cmd.y };
    } else if (cmd.type === 'Q') {
      const sampled = sampleQuadratic(currentPoint, {x: cmd.x1, y: cmd.y1}, {x: cmd.x, y: cmd.y});
      currentSubpath.push(...sampled);
      currentPoint = { x: cmd.x, y: cmd.y };
    } else if (cmd.type === 'C') {
      const sampled = sampleCubic(currentPoint, {x: cmd.x1, y: cmd.y1}, {x: cmd.x2, y: cmd.y2}, {x: cmd.x, y: cmd.y});
      currentSubpath.push(...sampled);
      currentPoint = { x: cmd.x, y: cmd.y };
    } else if (cmd.type === 'Z') {
      if (currentSubpath.length > 0) {
        subpaths.push(currentSubpath);
      }
      currentSubpath = [];
    }
  }
  if (currentSubpath.length > 0) subpaths.push(currentSubpath);
  
  if (subpaths.length === 0) return [];

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const sp of subpaths) {
    for (const p of sp) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
  }
  
  const width = maxX - minX;
  const height = maxY - minY;
  const size = Math.max(width, height) || 1;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  
  // Normalize and flip Y so it goes from top to bottom (like canvas)
  const normalized = subpaths.map(sp => sp.map(p => ({
    x: Number(((p.x - cx) / size + 0.5).toFixed(4)),
    y: Number((1.0 - ((p.y - cy) / size + 0.5)).toFixed(4))
  })));
  
  return normalized;
}

try {
  const buffer = fs.readFileSync('NotoSansJavanese.ttf');
  const arrayBuffer = new Uint8Array(buffer).buffer;
  const font = opentype.parse(arrayBuffer);
  
  const nglegenaData = NGGLEGENA_IDS.map(id => ({
    id,
    unicode: '\\u0000',
    contour: extractGlyph(font, id)
  }));
  
  const pasanganData = NGGLEGENA_IDS.map(id => ({
    id,
    unicode: '\\u0000',
    contour: extractGlyph(font, PASANGAN_MAP[id])
  }));
  
  const sandanganData = Object.keys(SANDANGAN_MAP).map(id => ({
    id,
    roman: id === 'wulu' ? 'i' : id === 'suku' ? 'u' : id === 'pepet' ? 'e' : id === 'taling' ? 'è' : id === 'tarung' ? 'o' : id === 'cecak' ? 'ng' : id === 'layar' ? 'r' : 'h',
    unicode: '\\u0000',
    contour: extractGlyph(font, SANDANGAN_MAP[id])
  }));
  
  fs.writeFileSync('src/data/nglegena_contours.json', JSON.stringify(nglegenaData));
  fs.writeFileSync('src/data/pasangan_contours.json', JSON.stringify(pasanganData));
  fs.writeFileSync('src/data/sandangan_contours.json', JSON.stringify(sandanganData));
  console.log("Done extracting!");
} catch (err) {
  console.error(err);
}
