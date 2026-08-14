const opentype = require('opentype.js');
const fs = require('fs');

const buffer = fs.readFileSync('NotoSansJavanese.ttf');
const arrayBuffer = new Uint8Array(buffer).buffer;
const font = opentype.parse(arrayBuffer);

for (let i = 0; i < font.numGlyphs; i++) {
  const glyph = font.glyphs.get(i);
  if (glyph.name) console.log(glyph.name);
}
