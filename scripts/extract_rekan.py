import json
import math
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import RecordingPen

font = TTFont('src/public/fonts/NotoSansJavanese[wght].woff2')
glyph_set = font.getGlyphSet()
hmtx = font['hmtx']

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

def extract_contours(glyph_name, shift_x=0):
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
            current_path = [(args[0][0] + shift_x, args[0][1])]
            current_pt = args[0]
            start_pt = args[0]
        elif cmd == 'lineTo':
            current_path.append((args[0][0] + shift_x, args[0][1]))
            current_pt = args[0]
        elif cmd == 'qCurveTo':
            pts = list(args)
            if len(pts) == 0: continue
            
            if pts[-1] is None:
                pts[-1] = start_pt
                
            for i in range(len(pts) - 1):
                p1 = pts[i]
                p2 = pts[i+1]
                if i < len(pts) - 2:
                    implied = ((p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2)
                    steps = max(3, int(math.hypot(implied[0]-current_pt[0], implied[1]-current_pt[1]) / 10))
                    sampled = sample_quadratic(current_pt, p1, implied, steps)
                    current_path.extend([(p[0]+shift_x, p[1]) for p in sampled])
                    current_pt = implied
                else:
                    steps = max(3, int(math.hypot(p2[0]-current_pt[0], p2[1]-current_pt[1]) / 10))
                    sampled = sample_quadratic(current_pt, p1, p2, steps)
                    current_path.extend([(p[0]+shift_x, p[1]) for p in sampled])
                    current_pt = p2
        elif cmd == 'curveTo':
            p1, p2, p3 = args
            steps = max(3, int(math.hypot(p3[0]-current_pt[0], p3[1]-current_pt[1]) / 10))
            sampled = sample_cubic(current_pt, p1, p2, p3, steps)
            current_path.extend([(p[0]+shift_x, p[1]) for p in sampled])
            current_pt = p3
        elif cmd == 'closePath':
            if current_path:
                subpaths.append(current_path)
            current_path = []

    if current_path:
        subpaths.append(current_path)
        
    return subpaths

rekan_map = [
    ('kha', 'ka', '\uA990\uA9B3'),
    ('dza', 'da', '\uA98F\uA9B3'),
    ('fa', 'pa', '\uA9A5\uA9B3'),
    ('za', 'ja', '\uA997\uA9B3'),
    ('gha', 'ga', '\uA992\uA9B3')
]

result = []
for rekan_id, base_name, unicode_val in rekan_map:
    # 1. Extract base
    base_contours = extract_contours(base_name, 0)
    
    # 2. Extract cecak telu, shifted by advance width of base
    adv_width = hmtx[base_name][0]
    cecak_contours = extract_contours('cecaktelu.ns', adv_width)
    
    contours = base_contours + cecak_contours
    
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
        "id": rekan_id,
        "unicode": unicode_val,
        "contour": normalized
    })

with open('src/src/data/rekan_contours.json', 'w') as f:
    f.write(json.dumps(result, indent=2))

print("Extracted rekan successfully!")
