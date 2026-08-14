import sys
from fontTools.ttLib import TTFont

font = TTFont('src/public/fonts/NotoSansJavanese[wght].woff2')
names = font.getGlyphNames()
pasangan = [n for n in names if 'pstf' in n.lower() or 'sub' in n.lower() or 'blwf' in n.lower() or 'post' in n.lower()]
print(names[-100:])
