import json
import math
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import RecordingPen

font = TTFont('src/public/fonts/NotoSansJavanese[wght].woff2')
glyph_set = font.getGlyphSet()

def sample_quadratic(p0, p1, p2, steps):
    points = []
    for i in range(1, steps + 1):
        t = i / steps
        x = (1 - t)**2 * p0[0] + 2 * (1 - t) * t * p1[0] + t**2 * p2[0]
        y = (1 - t)**2 * p0[1] + 2 * (1 - t) * t * p1[1] + t**2 * p2[1]
        points.append((x, y))
    return points

def sample_cubic(p0, p1, p2, p3, steps):
    points = []
    for i in range(1, steps + 1):
        t = i / steps
        x = (1 - t)**3 * p0[0] + 3 * (1 - t)**2 * t * p1[0] + 3 * (1 - t) * t**2 * p2[0] + t**3 * p3[0]
        y = (1 - t)**3 * p0[1] + 3 * (1 - t)**2 * t * p1[1] + 3 * (1 - t) * t**2 * p2[1] + t**3 * p3[1]
        points.append((x, y))
    return points

def extract_contours(glyph_name):
    if glyph_name not in glyph_set:
        return []
    pen = RecordingPen()
    glyph_set[glyph_name].draw(pen)
    
    subpaths = []
    current_path = []
    current_pt = (0, 0)
    start_pt = (0, 0)
    
    for cmd, args in pen.value:
        if cmd == 'moveTo':
            if current_path:
                subpaths.append(current_path)
            current_path = [args[0]]
            current_pt = args[0]
            start_pt = args[0]
        elif cmd == 'lineTo':
            current_path.append(args[0])
            current_pt = args[0]
        elif cmd == 'qCurveTo':
            pts = list(args)
            if len(pts) == 0: continue
            
            # TTF quadratic curves can have multiple off-curve points
            # If the last point is not specified as an on-curve point by the font format? 
            # In TTFont RecordingPen, qCurveTo args are (pt, pt, ..., pt).
            # The last point IS an on-curve point, UNLESS it's the end of a contour and it loops to start.
            # Usually the last argument is on-curve. If it's None, it means closed contour without explicit on-curve.
            # fontTools handles this. The last point in `args` is always the destination.
            
            # Wait, fontTools RecordingPen qCurveTo last arg might be None if it's implicitly closing.
            if pts[-1] is None:
                pts[-1] = start_pt
                
            for i in range(len(pts) - 1):
                p1 = pts[i]
                p2 = pts[i+1]
                if i < len(pts) - 2:
                    implied = ((p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2)
                    steps = max(3, int(math.hypot(implied[0]-current_pt[0], implied[1]-current_pt[1]) / 10))
                    current_path.extend(sample_quadratic(current_pt, p1, implied, steps))
                    current_pt = implied
                else:
                    steps = max(3, int(math.hypot(p2[0]-current_pt[0], p2[1]-current_pt[1]) / 10))
                    current_path.extend(sample_quadratic(current_pt, p1, p2, steps))
                    current_pt = p2
        elif cmd == 'curveTo':
            p1, p2, p3 = args
            steps = max(3, int(math.hypot(p3[0]-current_pt[0], p3[1]-current_pt[1]) / 10))
            current_path.extend(sample_cubic(current_pt, p1, p2, p3, steps))
            current_pt = p3
        elif cmd == 'closePath':
            if current_path:
                subpaths.append(current_path)
            current_path = []

    if current_path:
        subpaths.append(current_path)
        
    return subpaths

pasangan_names = [
    ('ha', 'ha.pas'), ('na', 'na.pas'), ('ca', 'ca.pas'), ('ra', 'ra.pas'), ('ka', 'ka.pas'),
    ('da', 'da.pas'), ('ta', 'ta.pas'), ('sa', 'sa.pas'), ('wa', 'wa.pas'), ('la', 'la.pas'),
    ('pa', 'pa.pas'), ('dha', 'dha.pas'), ('ja', 'ja.pas'), ('ya', 'ya.pas'), ('nya', 'nya.pas'),
    ('ma', 'ma.pas'), ('ga', 'ga.pas'), ('ba', 'ba.pas'), ('tha', 'tha.pas'), ('nga', 'nga.pas')
]

result = []
for id_name, glyph_name in pasangan_names:
    contours = extract_contours(glyph_name)
    
    all_x = [p[0] for path in contours for p in path]
    all_y = [p[1] for path in contours for p in path]
    
    if not all_x: continue
    
    min_x, max_x = min(all_x), max(all_x)
    min_y, max_y = min(all_y), max(all_y)
    
    w = max_x - min_x
    h = max_y - min_y
    size = max(w, h, 1) # Prevent div by 0
    
    normalized = []
    for path in contours:
        norm_path = []
        for x, y in path:
            nx = (x - min_x) / size + (1 - w/size)/2
            ny = 1.0 - ((y - min_y) / size + (1 - h/size)/2)
            norm_path.append({"x": round(nx, 4), "y": round(ny, 4)})
        normalized.append(norm_path)
        
    result.append({
        "id": id_name,
        "unicode": "",
        "contour": normalized
    })

with open('src/src/data/pasangan_contours.json', 'w') as f:
    f.write(json.dumps(result, indent=2))

print("Extracted pasangan successfully!")
