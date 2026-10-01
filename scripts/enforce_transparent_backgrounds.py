import os
from PIL import Image, ImageDraw

CHARS_DIR = os.path.join('public', 'assets', 'characters')
png_files = [f for f in os.listdir(CHARS_DIR) if f.endswith('.png')]

print(f"Checking background transparency on {len(png_files)} character PNG files...")

fixed_count = 0
for fn in png_files:
    p = os.path.join(CHARS_DIR, fn)
    img = Image.open(p).convert('RGBA')
    w, h = img.size
    pix = img.load()
    
    corners = [(0, 0), (w-1, 0), (0, h-1), (w-1, h-1)]
    # Check if any corner has alpha > 0 and looks like backdrop (light grey / white / near white)
    needs_fix = False
    for cx, cy in corners:
        r, g, b, a = pix[cx, cy]
        if a > 0 and (r > 200 and g > 200 and b > 200):
            needs_fix = True
            break
            
    if needs_fix:
        # Flood fill from each corner to clear background
        for cx, cy in corners:
            try:
                ImageDraw.floodfill(img, (cx, cy), (0, 0, 0, 0), thresh=45)
            except Exception:
                pass
        q = img.quantize(colors=256, method=Image.Quantize.FASTOCTREE)
        q.save(p, optimize=True)
        fixed_count += 1
        print(f"Fixed transparency for {fn}")

print(f"Finished: {fixed_count} files fixed out of {len(png_files)} files.")
