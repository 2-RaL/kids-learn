import os
import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

def ensure_rgba(img):
    if img.mode != 'RGBA':
        return img.convert('RGBA')
    return img

def draw_star(d, cx, cy, r_outer, r_inner, fill, outline=None, points=5):
    coords = []
    angle_step = math.pi / points
    start_angle = -math.pi / 2
    for i in range(points * 2):
        r = r_outer if i % 2 == 0 else r_inner
        ang = start_angle + i * angle_step
        coords.append((cx + int(math.cos(ang) * r), cy + int(math.sin(ang) * r)))
    d.polygon(coords, fill=fill, outline=outline)

# ----------------- PROPS FACTORY -----------------

def create_props(command, w, h):
    # Returns (bg_layer, fg_layer) where bg is behind character, fg is in front
    bg = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    fg = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    dbg = ImageDraw.Draw(bg)
    dfg = ImageDraw.Draw(fg)

    # 1. STOP
    if command == 'stop':
        # Bright red STOP octagonal sign on right side
        sx, sy = int(w * 0.68), int(h * 0.40)
        # Pole
        dfg.rectangle([sx + 65, sy + 130, sx + 85, sy + 500], fill=(160, 160, 170, 255), outline=(100, 100, 110, 255))
        # Octagon points
        r = 85
        cx, cy = sx + 75, sy + 75
        oct_pts = []
        for i in range(8):
            a = math.radians(22.5 + i * 45)
            oct_pts.append((cx + int(math.cos(a) * r), cy + int(math.sin(a) * r)))
        dfg.polygon(oct_pts, fill=(235, 35, 45, 255), outline=(255, 255, 255, 255), width=6)
        # Inner white border
        oct_inner = []
        for i in range(8):
            a = math.radians(22.5 + i * 45)
            oct_inner.append((cx + int(math.cos(a) * (r - 10)), cy + int(math.sin(a) * (r - 10))))
        dfg.polygon(oct_inner, outline=(255, 255, 255, 220), width=4)
        # Text "STOP"
        dfg.text((cx - 42, cy - 20), "STOP", fill=(255, 255, 255, 255))

    # 2. WALK / FORWARD / BACKWARD / LEFT / RIGHT
    elif command in ['walk', 'walkForward']:
        # Bright green path & stepping arrows on ground
        for i, (fx, fy) in enumerate([(int(w*0.35), int(h*0.88)), (int(w*0.5), int(h*0.82)), (int(w*0.62), int(h*0.76))]):
            dfg.ellipse([fx, fy, fx + 50, fy + 30], fill=(52, 211, 153, 230), outline=(16, 185, 129, 255), width=3)
            # Arrow
            dfg.polygon([(fx + 25, fy + 5), (fx + 40, fy + 22), (fx + 10, fy + 22)], fill=(255, 255, 255, 240))
    elif command == 'walkBackward':
        # Coral backward path & arrows
        for i, (fx, fy) in enumerate([(int(w*0.62), int(h*0.76)), (int(w*0.5), int(h*0.82)), (int(w*0.35), int(h*0.88))]):
            dfg.ellipse([fx, fy, fx + 50, fy + 30], fill=(251, 113, 133, 230), outline=(244, 63, 94, 255), width=3)
            dfg.polygon([(fx + 25, fy + 25), (fx + 40, fy + 8), (fx + 10, fy + 8)], fill=(255, 255, 255, 240))
    elif command == 'moveLeft':
        # Purple directional navigation arrow pointing left
        ax, ay = int(w * 0.12), int(h * 0.55)
        dfg.polygon([(ax, ay), (ax + 70, ay - 45), (ax + 70, ay - 18), (ax + 170, ay - 18), (ax + 170, ay + 18), (ax + 70, ay + 18), (ax + 70, ay + 45)], fill=(168, 85, 247, 240), outline=(126, 34, 206, 255), width=4)
        draw_star(dfg, ax + 20, ay - 55, 16, 8, (255, 230, 80, 255))
    elif command == 'moveRight':
        # Orange directional navigation arrow pointing right
        ax, ay = int(w * 0.88), int(h * 0.55)
        dfg.polygon([(ax, ay), (ax - 70, ay - 45), (ax - 70, ay - 18), (ax - 170, ay - 18), (ax - 170, ay + 18), (ax - 70, ay + 18), (ax - 70, ay + 45)], fill=(249, 115, 22, 240), outline=(194, 65, 12, 255), width=4)
        draw_star(dfg, ax - 20, ay - 55, 16, 8, (255, 230, 80, 255))

    # 3. SPIN
    elif command == 'spin':
        # Colorful 360 whirlwind swirl ribbon around character
        for ang in range(0, 360, 45):
            rad = math.radians(ang)
            rx = int(w * 0.5 + math.cos(rad) * (w * 0.38))
            ry = int(h * 0.60 + math.sin(rad) * 120)
            c = (147, 197, 253, 220) if ang % 90 == 0 else (253, 224, 71, 230)
            dfg.ellipse([rx - 15, ry - 15, rx + 15, ry + 15], fill=c)
        dfg.arc([int(w*0.1), int(h*0.50), int(w*0.9), int(h*0.75)], start=30, end=330, fill=(99, 102, 241, 240), width=12)

    # 4. SLIDE (Playground Rainbow Slide)
    elif command == 'slide':
        # Colorful slide ramp curving underneath the character
        # Background slide ladder/post
        dbg.rectangle([int(w * 0.72), int(h * 0.35), int(w * 0.76), int(h * 0.95)], fill=(245, 158, 11, 255), outline=(217, 119, 6, 255))
        # Slide chute (blue & yellow rainbow slide)
        for offset, color in [(0, (239, 68, 68, 255)), (16, (245, 158, 11, 255)), (32, (59, 130, 246, 255)), (48, (16, 185, 129, 255))]:
            dfg.arc([int(w * 0.05), int(h * 0.45) + offset, int(w * 0.85), int(h * 0.95) + offset], start=210, end=350, fill=color, width=14)

    # 5. RIDE BIKE (Children's Bicycle)
    elif command == 'rideBike':
        # Wheels
        w1_x, w1_y = int(w * 0.22), int(h * 0.84)
        w2_x, w2_y = int(w * 0.74), int(h * 0.84)
        wheel_r = 75
        for wx, wy in [(w1_x, w1_y), (w2_x, w2_y)]:
            # Tire
            dfg.ellipse([wx - wheel_r, wy - wheel_r, wx + wheel_r, wy + wheel_r], outline=(50, 50, 60, 255), width=16)
            # Rim & Spokes
            dfg.ellipse([wx - wheel_r + 14, wy - wheel_r + 14, wx + wheel_r - 14, wy + wheel_r - 14], outline=(220, 220, 230, 255), width=5)
            for ang in range(0, 360, 45):
                rad = math.radians(ang)
                dfg.line([(wx, wy), (wx + int(math.cos(rad) * (wheel_r - 15)), wy + int(math.sin(rad) * (wheel_r - 15)))], fill=(180, 180, 190, 255), width=3)
            # Hub
            dfg.ellipse([wx - 14, wy - 14, wx + 14, wy + 14], fill=(239, 68, 68, 255))
        # Frame (bright red sports bike frame)
        seat_x, seat_y = int(w * 0.44), int(h * 0.73)
        handle_x, handle_y = int(w * 0.66), int(h * 0.67)
        pedal_x, pedal_y = int(w * 0.48), int(h * 0.84)
        dfg.line([(w1_x, w1_y), (seat_x, seat_y)], fill=(239, 68, 68, 255), width=14)
        dfg.line([(seat_x, seat_y), (pedal_x, pedal_y)], fill=(239, 68, 68, 255), width=14)
        dfg.line([(w1_x, w1_y), (pedal_x, pedal_y)], fill=(239, 68, 68, 255), width=14)
        dfg.line([(pedal_x, pedal_y), (handle_x, handle_y)], fill=(239, 68, 68, 255), width=14)
        dfg.line([(seat_x, seat_y), (handle_x, handle_y)], fill=(239, 68, 68, 255), width=14)
        dfg.line([(handle_x, handle_y), (w2_x, w2_y)], fill=(239, 68, 68, 255), width=14)
        # Handlebars & grips
        dfg.line([(handle_x - 35, handle_y - 25), (handle_x + 35, handle_y - 25)], fill=(30, 41, 59, 255), width=16)
        # Seat
        dfg.rounded_rectangle([seat_x - 45, seat_y - 20, seat_x + 30, seat_y], radius=8, fill=(30, 41, 59, 255))

    # 6. SLEEP (Pillow, Moon, Stars, Zzz)
    elif command == 'sleep':
        # Soft cozy pillow behind character
        dbg.rounded_rectangle([int(w * 0.15), int(h * 0.62), int(w * 0.58), int(h * 0.88)], radius=50, fill=(191, 219, 254, 255), outline=(147, 197, 253, 255), width=8)
        # Golden crescent moon in sky
        mx, my = int(w * 0.75), int(h * 0.16)
        dbg.ellipse([mx - 55, my - 55, mx + 55, my + 55], fill=(254, 240, 138, 255))
        dbg.ellipse([mx - 30, my - 65, mx + 70, my + 45], fill=(0, 0, 0, 0)) # cutout mask in pillow rendering
        # Stars in background
        for sx, sy in [(int(w*0.2), int(h*0.18)), (int(w*0.85), int(h*0.28)), (int(w*0.65), int(h*0.08))]:
            draw_star(dbg, sx, sy, 18, 9, (253, 224, 71, 255))
        # Floating Sleep "Zzz"
        for i, (zx, zy, sz) in enumerate([(int(w*0.65), int(h*0.35), 44), (int(w*0.73), int(h*0.29), 34), (int(w*0.79), int(h*0.24), 26)]):
            dfg.rounded_rectangle([zx, zy, zx + sz, zy + sz], radius=10, fill=(167, 139, 250, 240))
            dfg.text((zx + sz//4, zy + sz//6), "Z", fill=(255, 255, 255, 255))

    # 7. READ (Open Storybook)
    elif command == 'read':
        # Open children's book held right in front of chest/hands
        bx, by = int(w * 0.28), int(h * 0.52)
        bw, bh = int(w * 0.48), int(h * 0.20)
        # Book covers
        dfg.polygon([(bx, by + bh), (bx - 20, by + 20), (bx + bw//2, by), (bx + bw//2, by + bh - 15)], fill=(37, 99, 235, 255))
        dfg.polygon([(bx + bw//2, by), (bx + bw + 20, by + 20), (bx + bw, by + bh), (bx + bw//2, by + bh - 15)], fill=(37, 99, 235, 255))
        # White open pages
        dfg.polygon([(bx + 5, by + bh - 5), (bx - 12, by + 25), (bx + bw//2 - 5, by + 8), (bx + bw//2 - 5, by + bh - 20)], fill=(255, 255, 255, 255), outline=(220, 225, 235, 255), width=2)
        dfg.polygon([(bx + bw//2 + 5, by + 8), (bx + bw + 12, by + 25), (bx + bw - 5, by + bh - 5), (bx + bw//2 + 5, by + bh - 20)], fill=(255, 255, 255, 255), outline=(220, 225, 235, 255), width=2)
        # Illustration on page (colorful apple & sun)
        dfg.ellipse([bx + 25, by + 50, bx + 65, by + 90], fill=(239, 68, 68, 255))
        draw_star(dfg, bx + bw - 45, by + 65, 18, 9, (245, 158, 11, 255))
        # Text lines
        for ly in range(by + 105, by + bh - 30, 14):
            dfg.line([(bx + 15, ly), (bx + bw//2 - 20, ly)], fill=(148, 163, 184, 255), width=3)
            dfg.line([(bx + bw//2 + 20, ly), (bx + bw - 15, ly)], fill=(148, 163, 184, 255), width=3)

    # 8. EAT (Crisp Apple & Bowl)
    elif command == 'eat':
        ax, ay = int(w * 0.62), int(h * 0.46)
        # Red apple in hand
        dfg.ellipse([ax - 45, ay - 45, ax + 45, ay + 45], fill=(239, 68, 68, 255), outline=(185, 28, 28, 255), width=4)
        # Apple shine highlight
        dfg.ellipse([ax - 28, ay - 28, ax - 10, ay - 10], fill=(254, 202, 202, 240))
        # Apple stem
        dfg.line([(ax, ay - 42), (ax + 5, ay - 70)], fill=(120, 53, 15, 255), width=6)
        # Green Leaf
        dfg.ellipse([ax + 5, ay - 75, ax + 35, ay - 55], fill=(34, 197, 94, 255), outline=(21, 128, 61, 255), width=2)
        # Crunch sparkle
        draw_star(dfg, ax + 50, ay - 20, 16, 8, (253, 224, 71, 255))

    # 9. DRINK (Water Cup with Straw)
    elif command == 'drink':
        cx, cy = int(w * 0.60), int(h * 0.45)
        # Cup body
        dfg.polygon([(cx - 35, cy - 60), (cx + 35, cy - 60), (cx + 25, cy + 50), (cx - 25, cy + 50)], fill=(56, 189, 248, 220), outline=(2, 132, 199, 255), width=4)
        # Water level inside
        dfg.polygon([(cx - 30, cy - 20), (cx + 30, cy - 20), (cx + 23, cy + 45), (cx - 23, cy + 45)], fill=(14, 165, 233, 240))
        # Straw
        dfg.line([(cx - 5, cy + 20), (cx + 15, cy - 80), (cx + 45, cy - 105)], fill=(244, 63, 94, 255), width=8)
        # Droplets
        dfg.ellipse([cx + 50, cy - 50, cx + 62, cy - 35], fill=(56, 189, 248, 240))
        dfg.ellipse([cx + 35, cy + 10, cx + 45, cy + 22], fill=(56, 189, 248, 240))

    # 10. BATHE (Shower Head, Bubbles, Duck)
    elif command == 'bathe':
        # Overhead shower head
        sh_x, sh_y = int(w * 0.48), int(h * 0.08)
        dbg.line([(sh_x - 120, sh_y), (sh_x, sh_y)], fill=(148, 163, 184, 255), width=16)
        dbg.polygon([(sh_x - 45, sh_y + 20), (sh_x + 45, sh_y + 20), (sh_x + 65, sh_y + 60), (sh_x - 65, sh_y + 60)], fill=(203, 213, 225, 255), outline=(100, 116, 139, 255), width=4)
        # Water droplets streaming down
        for dx in range(-50, 51, 20):
            dbg.line([(sh_x + dx, sh_y + 65), (sh_x + dx * 2, sh_y + 280)], fill=(125, 211, 252, 180), width=4)
        # Floating soap bubbles
        for bx, by, br in [(int(w*0.18), int(h*0.4), 28), (int(w*0.78), int(h*0.45), 35), (int(w*0.25), int(h*0.65), 45), (int(w*0.75), int(h*0.7), 40), (int(w*0.48), int(h*0.85), 32)]:
            dfg.ellipse([bx - br, by - br, bx + br, by + br], fill=(224, 242, 254, 160), outline=(56, 189, 248, 230), width=3)
            dfg.ellipse([bx - br//2, by - br//2, bx - br//4, by - br//4], fill=(255, 255, 255, 220))
        # Rubber ducky on bottom right
        dk_x, dk_y = int(w * 0.72), int(h * 0.82)
        dfg.ellipse([dk_x - 35, dk_y - 20, dk_x + 35, dk_y + 25], fill=(250, 204, 21, 255), outline=(202, 138, 4, 255), width=3)
        dfg.ellipse([dk_x - 30, dk_y - 45, dk_x + 5, dk_y - 15], fill=(250, 204, 21, 255), outline=(202, 138, 4, 255), width=3)
        dfg.polygon([(dk_x - 30, dk_y - 35), (dk_x - 50, dk_y - 30), (dk_x - 30, dk_y - 25)], fill=(249, 115, 22, 255))
        dfg.ellipse([dk_x - 18, dk_y - 38, dk_x - 12, dk_y - 32], fill=(0, 0, 0, 255))

    # 11. WASH (Hands with Water Tap & Soap Suds)
    elif command == 'wash':
        # Modern water tap
        tap_x, tap_y = int(w * 0.65), int(h * 0.45)
        dfg.line([(tap_x + 100, tap_y - 60), (tap_x, tap_y - 60), (tap_x, tap_y)], fill=(148, 163, 184, 255), width=20)
        # Flowing crystal water
        dfg.line([(tap_x, tap_y), (tap_x, tap_y + 120)], fill=(56, 189, 248, 220), width=14)
        # Soap bar
        dfg.rounded_rectangle([tap_x - 70, tap_y + 70, tap_x - 10, tap_y + 115], radius=12, fill=(244, 114, 182, 255), outline=(219, 39, 119, 255), width=3)
        # Foam suds
        for fx, fy in [(tap_x - 20, tap_y + 90), (tap_x + 10, tap_y + 105), (tap_x - 5, tap_y + 125), (tap_x - 40, tap_y + 110)]:
            dfg.ellipse([fx - 14, fy - 14, fx + 14, fy + 14], fill=(255, 255, 255, 230), outline=(186, 230, 253, 255), width=2)

    # 12. COMB (Hair Brush with Sparkles)
    elif command == 'comb':
        cb_x, cb_y = int(w * 0.65), int(h * 0.18)
        # Brush handle
        dfg.line([(cb_x + 80, cb_y + 80), (cb_x + 25, cb_y + 25)], fill=(168, 85, 247, 255), width=18)
        # Brush head
        dfg.ellipse([cb_x - 25, cb_y - 25, cb_x + 40, cb_y + 40], fill=(192, 132, 252, 255), outline=(126, 34, 206, 255), width=4)
        # Bristles
        for i in range(-20, 31, 10):
            dfg.line([(cb_x + i, cb_y - 20), (cb_x + i - 8, cb_y - 45)], fill=(240, 171, 252, 255), width=4)
        # Hair Shine Sparkles
        draw_star(dfg, cb_x - 60, cb_y + 10, 22, 10, (253, 224, 71, 255))
        draw_star(dfg, cb_x - 30, cb_y - 60, 16, 8, (255, 255, 255, 255))

    # 13. DRESS (Hanger with Colorful Shirt)
    elif command == 'dress':
        hx, hy = int(w * 0.70), int(h * 0.40)
        # Hanger hook
        dfg.arc([hx - 15, hy - 40, hx + 15, hy - 10], start=180, end=360, fill=(245, 158, 11, 255), width=6)
        # Hanger bar
        dfg.polygon([(hx - 70, hy + 15), (hx + 70, hy + 15), (hx, hy - 10)], outline=(245, 158, 11, 255), width=6)
        # Colorful jacket / t-shirt
        dfg.polygon([(hx - 60, hy + 15), (hx + 60, hy + 15), (hx + 50, hy + 120), (hx - 50, hy + 120)], fill=(59, 130, 246, 255), outline=(29, 78, 216, 255), width=4)
        # Collar
        dfg.polygon([(hx - 20, hy + 15), (hx, hy + 40), (hx + 20, hy + 15)], fill=(255, 255, 255, 255))

    # 14. WRITE (Notepad & Pencil)
    elif command == 'write':
        nx, ny = int(w * 0.32), int(h * 0.55)
        # Notepad
        dfg.rounded_rectangle([nx, ny, nx + 160, ny + 200], radius=10, fill=(254, 252, 232, 255), outline=(202, 138, 4, 255), width=4)
        # Lines
        for ly in range(ny + 35, ny + 180, 24):
            dfg.line([(nx + 20, ly), (nx + 140, ly)], fill=(147, 197, 253, 200), width=3)
        # Pencil in hand
        px, py = nx + 130, ny + 90
        dfg.line([(px + 45, py - 45), (px, py)], fill=(234, 179, 8, 255), width=14)
        # Lead tip
        dfg.polygon([(px, py), (px + 6, py - 12), (px - 6, py - 6)], fill=(30, 41, 59, 255))

    # 15. DRAW (Easel with Rainbow Canvas)
    elif command == 'draw':
        # Wooden easel
        ex, ey = int(w * 0.65), int(h * 0.45)
        # Legs
        dbg.line([(ex + 60, ey - 60), (ex - 40, ey + 400)], fill=(180, 83, 9, 255), width=14)
        dbg.line([(ex + 60, ey - 60), (ex + 160, ey + 400)], fill=(180, 83, 9, 255), width=14)
        # Canvas
        dfg.rectangle([ex - 20, ey, ex + 140, ey + 180], fill=(255, 255, 255, 255), outline=(217, 119, 6, 255), width=6)
        # Rainbow on canvas
        dfg.arc([ex, ey + 20, ex + 120, ey + 140], start=180, end=360, fill=(239, 68, 68, 255), width=8)
        dfg.arc([ex + 8, ey + 28, ex + 112, ey + 132], start=180, end=360, fill=(245, 158, 11, 255), width=8)
        dfg.arc([ex + 16, ey + 36, ex + 104, ey + 124], start=180, end=360, fill=(59, 130, 246, 255), width=8)
        draw_star(dfg, ex + 25, ey + 40, 14, 7, (250, 204, 21, 255))

    # 16. PAINT (Artist Palette & Paintbrush)
    elif command == 'paint':
        pl_x, pl_y = int(w * 0.62), int(h * 0.50)
        # Kidney palette
        dfg.ellipse([pl_x - 60, pl_y - 45, pl_x + 60, pl_y + 45], fill=(217, 119, 6, 255), outline=(146, 64, 14, 255), width=4)
        # Paint dollops
        for c, dx, dy in [((239, 68, 68, 255), -35, -15), ((245, 158, 11, 255), -10, -25), ((59, 130, 246, 255), 20, -20), ((34, 197, 94, 255), 35, 5)]:
            dfg.ellipse([pl_x + dx - 10, pl_y + dy - 10, pl_x + dx + 10, pl_y + dy + 10], fill=c)
        # Paintbrush
        dfg.line([(pl_x + 20, pl_y + 40), (pl_x + 90, pl_y - 40)], fill=(202, 138, 4, 255), width=10)
        # Brush bristle tip dripping blue paint
        dfg.polygon([(pl_x + 90, pl_y - 40), (pl_x + 105, pl_y - 55), (pl_x + 85, pl_y - 50)], fill=(59, 130, 246, 255))

    # 17. CUT (Scissors Cutting Paper)
    elif command == 'cut':
        sc_x, sc_y = int(w * 0.58), int(h * 0.55)
        # Paper sheet
        dfg.rectangle([sc_x - 80, sc_y - 40, sc_x + 30, sc_y + 80], fill=(96, 165, 250, 255), outline=(37, 99, 235, 255), width=3)
        # Cut slit
        dfg.line([(sc_x - 30, sc_y - 40), (sc_x - 10, sc_y + 20)], fill=(255, 255, 255, 255), width=4)
        # Red Craft Scissors
        dfg.line([(sc_x - 25, sc_y - 10), (sc_x + 45, sc_y + 45)], fill=(203, 213, 225, 255), width=8)
        dfg.line([(sc_x - 25, sc_y + 35), (sc_x + 45, sc_y - 15)], fill=(203, 213, 225, 255), width=8)
        # Red finger loops
        dfg.ellipse([sc_x + 35, sc_y + 35, sc_x + 70, sc_y + 70], outline=(239, 68, 68, 255), width=8)
        dfg.ellipse([sc_x + 35, sc_y - 35, sc_x + 70, sc_y], outline=(239, 68, 68, 255), width=8)

    # 18. COUNT (1, 2, 3 Glossy Number Cubes)
    elif command == 'count':
        bx, by = int(w * 0.68), int(h * 0.72)
        cube_sz = 65
        # Cube 1 (Cyan)
        dfg.rounded_rectangle([bx, by, bx + cube_sz, by + cube_sz], radius=14, fill=(6, 182, 212, 255), outline=(8, 145, 178, 255), width=4)
        dfg.text((bx + 20, by + 12), "1", fill=(255, 255, 255, 255))
        # Cube 2 (Amber)
        dfg.rounded_rectangle([bx + 15, by - cube_sz + 10, bx + 15 + cube_sz, by + 10], radius=14, fill=(245, 158, 11, 255), outline=(217, 119, 6, 255), width=4)
        dfg.text((bx + 35, by - cube_sz + 22), "2", fill=(255, 255, 255, 255))
        # Cube 3 (Purple)
        dfg.rounded_rectangle([bx + 30, by - cube_sz * 2 + 20, bx + 30 + cube_sz, by - cube_sz + 20], radius=14, fill=(168, 85, 247, 255), outline=(126, 34, 206, 255), width=4)
        dfg.text((bx + 50, by - cube_sz * 2 + 32), "3", fill=(255, 255, 255, 255))

    # 19. TALK (Speech Bubble with Waves)
    elif command == 'talk':
        sb_x, sb_y = int(w * 0.60), int(h * 0.22)
        # Bubble
        dfg.rounded_rectangle([sb_x, sb_y, sb_x + 190, sb_y + 110], radius=24, fill=(255, 255, 255, 255), outline=(99, 102, 241, 255), width=5)
        # Tail
        dfg.polygon([(sb_x + 30, sb_y + 105), (sb_x - 15, sb_y + 140), (sb_x + 60, sb_y + 105)], fill=(255, 255, 255, 255), outline=(99, 102, 241, 255))
        # Sound / Conversation waves
        for ox in [35, 75, 115]:
            dfg.ellipse([sb_x + ox, sb_y + 45, sb_x + ox + 22, sb_y + 67], fill=(99, 102, 241, 255))

    # 20. BUILD (Toy Building Blocks Tower)
    elif command == 'build':
        tx, ty = int(w * 0.58), int(h * 0.65)
        colors = [(239, 68, 68, 255), (59, 130, 246, 255), (245, 158, 11, 255), (34, 197, 94, 255)]
        for i, col in enumerate(colors):
            ly = ty + i * 45
            dfg.rounded_rectangle([tx - (4 - i) * 10, ly, tx + 110 + (4 - i) * 10, ly + 40], radius=8, fill=col, outline=(30, 41, 59, 255), width=3)
            # Lego pegs
            for px in range(tx, tx + 100, 30):
                dfg.rounded_rectangle([px, ly - 8, px + 18, ly], radius=3, fill=col, outline=(30, 41, 59, 255), width=2)

    # 21. POINT (Target Focus Reticle)
    elif command == 'point':
        rx, ry = int(w * 0.78), int(h * 0.35)
        dfg.ellipse([rx - 50, ry - 50, rx + 50, ry + 50], outline=(239, 68, 68, 255), width=4)
        dfg.ellipse([rx - 25, ry - 25, rx + 25, ry + 25], outline=(239, 68, 68, 255), width=3)
        dfg.line([(rx - 65, ry), (rx + 65, ry)], fill=(239, 68, 68, 255), width=4)
        dfg.line([(rx, ry - 65), (rx, ry + 65)], fill=(239, 68, 68, 255), width=4)

    # 22. STRETCH (Energy Workout Aura)
    elif command == 'stretch':
        # Upward power arrows and workout aura
        for ax in [int(w * 0.22), int(w * 0.78)]:
            dfg.polygon([(ax, int(h*0.12)), (ax - 30, int(h*0.22)), (ax - 12, int(h*0.22)), (ax - 12, int(h*0.35)), (ax + 12, int(h*0.35)), (ax + 12, int(h*0.22)), (ax + 30, int(h*0.22))], fill=(16, 185, 129, 240), outline=(5, 150, 105, 255), width=3)
        draw_star(dfg, int(w * 0.5), int(h * 0.08), 35, 16, (253, 224, 71, 255))

    # 23. HUG (Big Plush Teddy Bear with Hearts)
    elif command == 'hug':
        tx, ty = int(w * 0.40), int(h * 0.52)
        # Teddy Body
        dfg.ellipse([tx - 60, ty, tx + 60, ty + 120], fill=(180, 110, 60, 255), outline=(130, 70, 30, 255), width=4)
        # Belly
        dfg.ellipse([tx - 35, ty + 25, tx + 35, ty + 95], fill=(230, 180, 140, 255))
        # Head
        dfg.ellipse([tx - 50, ty - 75, tx + 50, ty + 15], fill=(180, 110, 60, 255), outline=(130, 70, 30, 255), width=4)
        # Snout
        dfg.ellipse([tx - 25, ty - 35, tx + 25, ty], fill=(230, 180, 140, 255))
        dfg.ellipse([tx - 10, ty - 28, tx + 10, ty - 12], fill=(60, 30, 15, 255))
        # Ears
        dfg.ellipse([tx - 55, ty - 85, tx - 25, ty - 55], fill=(180, 110, 60, 255), outline=(130, 70, 30, 255), width=3)
        dfg.ellipse([tx + 25, ty - 85, tx + 55, ty - 55], fill=(180, 110, 60, 255), outline=(130, 70, 30, 255), width=3)
        # Floating Hearts
        for hx, hy in [(tx - 80, ty - 40), (tx + 80, ty - 60), (tx, ty - 110)]:
            dfg.ellipse([hx - 15, hy - 15, hx + 5, hy + 5], fill=(244, 63, 94, 255))
            dfg.ellipse([hx - 5, hy - 15, hx + 15, hy + 5], fill=(244, 63, 94, 255))
            dfg.polygon([(hx - 14, hy - 2), (hx + 14, hy - 2), (hx, hy + 16)], fill=(244, 63, 94, 255))

    # 24. HOLD HANDS (Friendship Golden Hand Clasp)
    elif command == 'holdHands':
        hx, hy = int(w * 0.72), int(h * 0.55)
        dfg.ellipse([hx - 45, hy - 35, hx + 45, hy + 35], fill=(251, 191, 36, 255), outline=(217, 119, 6, 255), width=4)
        draw_star(dfg, hx, hy, 25, 12, (255, 255, 255, 255))
        # Friendship rainbow arc
        dfg.arc([hx - 90, hy - 120, hx + 90, hy + 40], start=180, end=360, fill=(244, 63, 94, 240), width=6)
        dfg.arc([hx - 80, hy - 110, hx + 80, hy + 50], start=180, end=360, fill=(59, 130, 246, 240), width=6)

    # 25. HELP (Helping Hand Shield)
    elif command == 'help':
        hx, hy = int(w * 0.68), int(h * 0.50)
        # Red cross / heart rescue shield
        dfg.polygon([(hx, hy - 60), (hx + 55, hy - 40), (hx + 45, hy + 40), (hx, hy + 75), (hx - 45, hy + 40), (hx - 55, hy - 40)], fill=(239, 68, 68, 255), outline=(255, 255, 255, 255), width=5)
        # White cross
        dfg.rectangle([hx - 10, hy - 35, hx + 10, hy + 35], fill=(255, 255, 255, 255))
        dfg.rectangle([hx - 35, hy - 10, hx + 35, hy + 10], fill=(255, 255, 255, 255))

    # 26. OPEN DOOR (Open Wooden Doorway to Sunny Garden)
    elif command == 'openDoor':
        dx, dy = int(w * 0.08), int(h * 0.28)
        # Outer Door Frame
        dbg.rectangle([dx, dy, dx + 240, dy + 650], fill=(120, 53, 15, 255), outline=(69, 26, 3, 255), width=8)
        # Outside sunny garden view
        dbg.rectangle([dx + 15, dy + 15, dx + 225, dy + 635], fill=(186, 230, 253, 255))
        # Green lawn outside
        dbg.polygon([(dx + 15, dy + 450), (dx + 225, dy + 400), (dx + 225, dy + 635), (dx + 15, dy + 635)], fill=(74, 222, 128, 255))
        # Sun outside
        dbg.ellipse([dx + 40, dy + 50, dx + 110, dy + 120], fill=(253, 224, 71, 255))
        # Open door slab swinging outward
        dbg.polygon([(dx + 225, dy + 15), (dx + 310, dy + 60), (dx + 310, dy + 610), (dx + 225, dy + 635)], fill=(180, 83, 9, 255), outline=(120, 53, 15, 255), width=4)
        # Brass knob
        dbg.ellipse([dx + 290, dy + 325, dx + 305, dy + 340], fill=(251, 191, 36, 255))

    # 27. CLOSE DOOR (Sturdy Oak Door with Brass Lock)
    elif command == 'closeDoor':
        dx, dy = int(w * 0.08), int(h * 0.28)
        dbg.rectangle([dx, dy, dx + 240, dy + 650], fill=(146, 64, 14, 255), outline=(69, 26, 3, 255), width=8)
        # Panels
        for py in [dy + 40, dy + 340]:
            dbg.rounded_rectangle([dx + 30, py, dx + 210, py + 240], radius=10, fill=(120, 53, 15, 255), outline=(69, 26, 3, 255), width=5)
        # Brass Lock & Handle
        dfg.ellipse([dx + 195, dy + 320, dx + 225, dy + 350], fill=(251, 191, 36, 255), outline=(180, 83, 9, 255), width=3)
        dfg.rectangle([dx + 205, dy + 340, dx + 215, dy + 360], fill=(69, 26, 3, 255))

    # 28. PUT AWAY / COLLECT (Toy Box Organizer / Basket)
    elif command in ['putAway', 'collect']:
        bx, by = int(w * 0.55), int(h * 0.68)
        # Colorful Toy Box
        dfg.rounded_rectangle([bx, by, bx + 220, by + 160], radius=16, fill=(129, 140, 248, 255), outline=(79, 70, 229, 255), width=5)
        # Toy details inside (teddy ears, beach ball, blocks)
        dfg.ellipse([bx + 30, by - 25, bx + 90, by + 35], fill=(244, 63, 94, 255))
        dfg.ellipse([bx + 110, by - 35, bx + 180, by + 35], fill=(245, 158, 11, 255))
        dfg.rounded_rectangle([bx + 75, by - 45, bx + 130, by + 10], radius=6, fill=(34, 197, 94, 255))

    # 29. CLEAN (Sweeping Broom with Clean Stars)
    elif command == 'clean':
        bm_x, bm_y = int(w * 0.62), int(h * 0.48)
        # Wooden broom stick
        dfg.line([(bm_x + 90, bm_y - 80), (bm_x - 30, bm_y + 260)], fill=(180, 83, 9, 255), width=16)
        # Straw bristles
        dfg.polygon([(bm_x - 30, bm_y + 260), (bm_x - 90, bm_y + 360), (bm_x + 30, bm_y + 360), (bm_x - 10, bm_y + 260)], fill=(251, 191, 36, 255), outline=(217, 119, 6, 255), width=4)
        for i in range(-70, 21, 15):
            dfg.line([(bm_x - 20, bm_y + 260), (bm_x + i, bm_y + 360)], fill=(217, 119, 6, 255), width=2)
        # Sparkling clean stars on floor
        for sx, sy in [(bm_x - 120, bm_y + 340), (bm_x - 70, bm_y + 370), (bm_x - 140, bm_y + 375)]:
            draw_star(dfg, sx, sy, 18, 9, (255, 255, 255, 255))

    # 30. BRING / TAKE AWAY (Gift Box / Parcel with Ribbons)
    elif command in ['bring', 'takeAway']:
        gx, gy = int(w * 0.58), int(h * 0.55)
        # Gift Box
        dfg.rounded_rectangle([gx, gy, gx + 150, gy + 140], radius=10, fill=(239, 68, 68, 255), outline=(185, 28, 28, 255), width=4)
        # Golden ribbon bands
        dfg.rectangle([gx + 60, gy, gx + 90, gy + 140], fill=(251, 191, 36, 255))
        dfg.rectangle([gx, gy + 55, gx + 150, gy + 85], fill=(251, 191, 36, 255))
        # Ribbon Bow on top
        dfg.ellipse([gx + 35, gy - 30, gx + 75, gy + 10], fill=(251, 191, 36, 255))
        dfg.ellipse([gx + 75, gy - 30, gx + 115, gy + 10], fill=(251, 191, 36, 255))
        dfg.ellipse([gx + 65, gy - 15, gx + 85, gy + 5], fill=(217, 119, 6, 255))

    # 31. CARRY (Backpack on Back)
    elif command == 'carry':
        bp_x, bp_y = int(w * 0.22), int(h * 0.48)
        # Blue school backpack
        dbg.rounded_rectangle([bp_x - 80, bp_y, bp_x + 50, bp_y + 190], radius=24, fill=(14, 165, 233, 255), outline=(2, 132, 199, 255), width=5)
        # Front pocket
        dbg.rounded_rectangle([bp_x - 70, bp_y + 70, bp_x + 35, bp_y + 160], radius=14, fill=(56, 189, 248, 255), outline=(2, 132, 199, 255), width=3)
        # Straps
        dfg.line([(bp_x + 20, bp_y + 10), (bp_x + 60, bp_y + 120)], fill=(30, 41, 59, 255), width=12)

    # 32. PULL (Toy Wagon with Rope)
    elif command == 'pull':
        wg_x, wg_y = int(w * 0.12), int(h * 0.78)
        # Red wagon cart
        dfg.polygon([(wg_x - 50, wg_y), (wg_x + 120, wg_y), (wg_x + 100, wg_y + 70), (wg_x - 30, wg_y + 70)], fill=(239, 68, 68, 255), outline=(185, 28, 28, 255), width=4)
        # Wheels
        for wx in [wg_x - 10, wg_x + 80]:
            dfg.ellipse([wx - 24, wg_y + 55, wx + 24, wg_y + 103], fill=(251, 191, 36, 255), outline=(30, 41, 59, 255), width=4)
        # Pull rope connecting to character's hand
        dfg.line([(wg_x + 120, wg_y + 30), (int(w * 0.45), int(h * 0.65))], fill=(180, 83, 9, 255), width=6)

    # 33. SCATTER (Party Confetti & Balloon Burst)
    elif command == 'scatter':
        colors = [(239, 68, 68, 255), (59, 130, 246, 255), (245, 158, 11, 255), (168, 85, 247, 255), (34, 197, 94, 255)]
        for i in range(35):
            ang = math.radians(i * (360 / 35))
            dist = 180 + (i % 5) * 45
            cx = int(w * 0.5 + math.cos(ang) * dist)
            cy = int(h * 0.5 + math.sin(ang) * dist)
            c = colors[i % len(colors)]
            if i % 3 == 0:
                draw_star(dfg, cx, cy, 18, 9, c)
            else:
                dfg.rounded_rectangle([cx - 10, cy - 6, cx + 10, cy + 6], radius=3, fill=c)

    # 34. WATER PLANT (Watering Can & Blooming Flower)
    elif command == 'waterPlant':
        pot_x, pot_y = int(w * 0.65), int(h * 0.70)
        dfg.ellipse([pot_x - 10, pot_y + 190, pot_x + 190, pot_y + 230], fill=(0, 0, 0, 80))
        dfg.polygon([(pot_x + 20, pot_y + 100), (pot_x + 160, pot_y + 100), (pot_x + 140, pot_y + 200), (pot_x + 40, pot_y + 200)], fill=(210, 105, 50, 255), outline=(160, 70, 30, 255))
        dfg.rounded_rectangle([pot_x + 10, pot_y + 85, pot_x + 170, pot_y + 105], radius=8, fill=(230, 120, 60, 255), outline=(160, 70, 30, 255), width=3)
        dfg.ellipse([pot_x + 25, pot_y + 90, pot_x + 155, pot_y + 102], fill=(80, 45, 20, 255))
        dfg.line([(pot_x + 90, pot_y + 95), (pot_x + 90, pot_y - 20)], fill=(40, 160, 60, 255), width=10)
        dfg.ellipse([pot_x + 20, pot_y + 25, pot_x + 85, pot_y + 55], fill=(50, 185, 75, 255), outline=(30, 140, 50, 255), width=2)
        dfg.ellipse([pot_x + 95, pot_y + 10, pot_x + 160, pot_y + 40], fill=(50, 185, 75, 255), outline=(30, 140, 50, 255), width=2)
        fl_cx, fl_cy = pot_x + 90, pot_y - 30
        for angle in range(0, 360, 60):
            rad = math.radians(angle)
            px = fl_cx + int(math.cos(rad) * 26)
            py = fl_cy + int(math.sin(rad) * 26)
            dfg.ellipse([px - 28, py - 28, px + 28, py + 28], fill=(255, 110, 160, 255), outline=(220, 60, 120, 255), width=2)
        dfg.ellipse([fl_cx - 20, fl_cy - 20, fl_cx + 20, fl_cy + 20], fill=(255, 215, 0, 255), outline=(220, 160, 0, 255), width=3)
        can_x, can_y = int(w * 0.45), int(h * 0.48)
        dfg.rounded_rectangle([can_x, can_y, can_x + 140, can_y + 110], radius=20, fill=(70, 190, 160, 255), outline=(40, 140, 115, 255), width=4)
        dfg.arc([can_x - 50, can_y - 10, can_x + 30, can_y + 100], start=90, end=270, fill=(40, 140, 115, 255), width=10)
        dfg.line([(can_x + 130, can_y + 80), (can_x + 230, can_y - 10)], fill=(70, 190, 160, 255), width=14)
        dfg.ellipse([can_x + 215, can_y - 25, can_x + 250, can_y + 5], fill=(255, 215, 80, 255), outline=(200, 160, 40, 255), width=3)
        for dx, dy in [(245, 15), (255, 35), (235, 50), (250, 65), (240, 85)]:
            dfg.ellipse([can_x + dx - 4, can_y + dy - 6, can_x + dx + 4, can_y + dy + 6], fill=(100, 200, 255, 220))

    # 35. LIGHT MATCH (Candle Lantern with Warm Flame)
    elif command == 'lightMatch':
        lt_x, lt_y = int(w * 0.65), int(h * 0.48)
        # Lantern base
        dfg.rounded_rectangle([lt_x - 40, lt_y + 60, lt_x + 40, lt_y + 80], radius=6, fill=(30, 41, 59, 255))
        # Glass housing
        dfg.rectangle([lt_x - 35, lt_y - 30, lt_x + 35, lt_y + 60], fill=(254, 240, 138, 120), outline=(30, 41, 59, 255), width=4)
        # Candle pillar
        dfg.rectangle([lt_x - 12, lt_y + 15, lt_x + 12, lt_y + 60], fill=(255, 255, 255, 255))
        # Golden flame
        dfg.ellipse([lt_x - 10, lt_y - 10, lt_x + 10, lt_y + 15], fill=(245, 158, 11, 255))
        dfg.ellipse([lt_x - 6, lt_y - 5, lt_x + 6, lt_y + 10], fill=(254, 240, 138, 255))
        # Glow halo
        draw_star(dfg, lt_x, lt_y - 2, 38, 18, (253, 224, 71, 160))

    # 36. THINK (Thought Cloud with Glowing Idea Bulb)
    elif command == 'think':
        tc_x, tc_y = int(w * 0.65), int(h * 0.18)
        # Cloud puffs
        dbg.ellipse([tc_x - 60, tc_y - 40, tc_x + 60, tc_y + 40], fill=(241, 245, 249, 240), outline=(148, 163, 184, 255), width=3)
        dbg.ellipse([tc_x - 90, tc_y - 20, tc_x - 30, tc_y + 35], fill=(241, 245, 249, 240), outline=(148, 163, 184, 255), width=3)
        dbg.ellipse([tc_x + 30, tc_y - 20, tc_x + 90, tc_y + 35], fill=(241, 245, 249, 240), outline=(148, 163, 184, 255), width=3)
        # Small thought bubbles leading down to head
        dbg.ellipse([tc_x - 45, tc_y + 60, tc_x - 25, tc_y + 80], fill=(241, 245, 249, 240), outline=(148, 163, 184, 255), width=2)
        dbg.ellipse([tc_x - 65, tc_y + 95, tc_x - 53, tc_y + 107], fill=(241, 245, 249, 240), outline=(148, 163, 184, 255), width=2)
        # Glowing Idea Lightbulb inside cloud
        dfg.ellipse([tc_x - 22, tc_y - 30, tc_x + 22, tc_y + 10], fill=(250, 204, 21, 255), outline=(202, 138, 4, 255), width=3)
        dfg.rectangle([tc_x - 12, tc_y + 10, tc_x + 12, tc_y + 25], fill=(148, 163, 184, 255))
        draw_star(dfg, tc_x, tc_y - 10, 32, 15, (254, 240, 138, 180))

    # 37. SURPRISED (Exclamation Marks & Shock Burst)
    elif command == 'surprised':
        # Comic shock burst
        draw_star(dfg, int(w * 0.72), int(h * 0.20), 55, 25, (254, 240, 138, 255), outline=(245, 158, 11, 255))
        dfg.text((int(w * 0.68), int(h * 0.16)), "!", fill=(239, 68, 68, 255))
        draw_star(dfg, int(w * 0.28), int(h * 0.22), 40, 18, (254, 240, 138, 255), outline=(245, 158, 11, 255))
        dfg.text((int(w * 0.25), int(h * 0.19)), "?", fill=(59, 130, 246, 255))

    # 38. CLAP (Sound Clapping Bursts)
    elif command == 'clap':
        cx, cy = int(w * 0.50), int(h * 0.52)
        # Clapping impact bursts
        draw_star(dfg, cx, cy, 55, 25, (253, 224, 71, 255), outline=(245, 158, 11, 255))
        draw_star(dfg, cx - 70, cy - 40, 24, 12, (255, 255, 255, 255))
        draw_star(dfg, cx + 70, cy - 40, 24, 12, (255, 255, 255, 255))

    # 39. DANCE (Musical Notes & Disco Sparkles)
    elif command == 'dance':
        for i, (nx, ny) in enumerate([(int(w*0.22), int(h*0.22)), (int(w*0.78), int(h*0.28)), (int(w*0.82), int(h*0.48)), (int(w*0.18), int(h*0.52))]):
            c = (244, 63, 94, 255) if i % 2 == 0 else (99, 102, 241, 255)
            # Musical Note
            dfg.ellipse([nx, ny, nx + 25, ny + 20], fill=c)
            dfg.line([(nx + 22, ny + 10), (nx + 22, ny - 35)], fill=c, width=5)
            dfg.polygon([(nx + 22, ny - 35), (nx + 40, ny - 25), (nx + 22, ny - 15)], fill=c)
            draw_star(dfg, nx - 20, ny - 20, 14, 7, (253, 224, 71, 255))

    # 40. SING (Microphone on Stand with Notes)
    elif command == 'sing':
        mx, my = int(w * 0.65), int(h * 0.40)
        # Mic head
        dfg.ellipse([mx - 20, my - 25, mx + 20, my + 15], fill=(71, 85, 105, 255), outline=(30, 41, 59, 255), width=3)
        dfg.rectangle([mx - 15, my + 15, mx + 15, my + 25], fill=(148, 163, 184, 255))
        # Mic handle
        dfg.line([(mx, my + 25), (mx + 25, my + 120)], fill=(30, 41, 59, 255), width=12)
        # Floating singing notes
        dfg.ellipse([mx + 45, my - 45, mx + 65, my - 30], fill=(236, 72, 153, 255))
        dfg.line([(mx + 63, my - 38), (mx + 63, my - 70)], fill=(236, 72, 153, 255), width=4)

    # 41. PLAY TOY (Teddy Bear & Toy Train)
    elif command == 'playToy':
        tx, ty = int(w * 0.65), int(h * 0.72)
        # Small toy teddy bear
        dfg.ellipse([tx - 35, ty - 15, tx + 35, ty + 55], fill=(180, 110, 60, 255), outline=(130, 70, 30, 255), width=3)
        dfg.ellipse([tx - 28, ty - 55, tx + 28, ty - 5], fill=(180, 110, 60, 255), outline=(130, 70, 30, 255), width=3)
        # Red wooden toy train
        rx, ry = int(w * 0.28), int(h * 0.82)
        dfg.rectangle([rx, ry, rx + 75, ry + 45], fill=(239, 68, 68, 255), outline=(185, 28, 28, 255), width=3)
        dfg.rectangle([rx + 45, ry - 30, rx + 75, ry], fill=(59, 130, 246, 255), outline=(29, 78, 216, 255), width=3)
        for wx in [rx + 15, rx + 60]:
            dfg.ellipse([wx - 14, ry + 35, wx + 14, ry + 63], fill=(245, 158, 11, 255), outline=(30, 41, 59, 255), width=3)

    # 42. NOD (Big Green Checkmark Badge "Bəli!")
    elif command == 'nod':
        bx, by = int(w * 0.75), int(h * 0.35)
        dfg.ellipse([bx - 55, by - 55, bx + 55, by + 55], fill=(34, 197, 94, 255), outline=(255, 255, 255, 255), width=6)
        # Checkmark
        dfg.line([(bx - 28, by - 2), (bx - 8, by + 22), (bx + 30, by - 25)], fill=(255, 255, 255, 255), width=12)

    # 43. SHAKE HEAD (Soft Coral Negation Badge "Xeyr")
    elif command == 'shakeHead':
        bx, by = int(w * 0.75), int(h * 0.35)
        dfg.ellipse([bx - 55, by - 55, bx + 55, by + 55], fill=(244, 63, 94, 255), outline=(255, 255, 255, 255), width=6)
        # Gentle palm or cross
        dfg.line([(bx - 25, by - 25), (bx + 25, by + 25)], fill=(255, 255, 255, 255), width=10)
        dfg.line([(bx + 25, by - 25), (bx - 25, by + 25)], fill=(255, 255, 255, 255), width=10)

    # 44. WAKE UP (Morning Sun & Ringing Alarm Clock)
    elif command == 'wakeUp':
        # Smiling morning sun
        sx, sy = int(w * 0.78), int(h * 0.16)
        for a in range(0, 360, 45):
            rad = math.radians(a)
            dbg.line([(sx, sy), (sx + int(math.cos(rad) * 65), sy + int(math.sin(rad) * 65))], fill=(251, 191, 36, 255), width=6)
        dbg.ellipse([sx - 42, sy - 42, sx + 42, sy + 42], fill=(253, 224, 71, 255), outline=(245, 158, 11, 255), width=4)
        # Ringing alarm clock
        ax, ay = int(w * 0.22), int(h * 0.72)
        dfg.ellipse([ax - 40, ay - 40, ax + 40, ay + 40], fill=(239, 68, 68, 255), outline=(185, 28, 28, 255), width=4)
        dfg.ellipse([ax - 30, ay - 30, ax + 30, ay + 30], fill=(255, 255, 255, 255))
        dfg.line([(ax, ay), (ax, ay - 20)], fill=(30, 41, 59, 255), width=4)
        dfg.line([(ax, ay), (ax + 14, ay)], fill=(30, 41, 59, 255), width=4)
        # Bells
        dfg.ellipse([ax - 40, ay - 48, ax - 16, ay - 24], fill=(245, 158, 11, 255))
        dfg.ellipse([ax + 16, ay - 48, ax + 40, ay - 24], fill=(245, 158, 11, 255))

    return bg, fg

print("Props factory loaded.")
