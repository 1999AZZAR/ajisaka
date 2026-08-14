const opentype = require('opentype.js');
const fs = require('fs');

try {
  const buffer = fs.readFileSync('NotoSansJavanese.ttf');
  // convert Buffer to ArrayBuffer
  const arrayBuffer = new Uint8Array(buffer).buffer;
  const font = opentype.parse(arrayBuffer);
  
  const glyphs = font.stringToGlyphs('\uA9C0\uA98F');
  console.log("Glyphs for pangkon + ka:");
  glyphs.forEach(g => {
    console.log(g.name, g.unicode);
  });
} catch (err) {
  console.error(err);
}
