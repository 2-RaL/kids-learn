import sys, os, math
from PIL import Image, ImageDraw, ImageFilter
sys.path.insert(0, os.path.dirname(__file__))
from realistic_scenes import CHAR_COLORS, hex_to_rgba

WIDTH = 768
HEIGHT = 1376

def create_transparent(w=WIDTH, h=HEIGHT):
    return Image.new('RGBA', (w, h), (0, 0, 0, 0))

# -------------------------------------------------------------
# 1. THINK: Thoughtful pose, hand to chin, deep in thought
# -------------------------------------------------------------
def render_think(base_img, char_id):
    w, h = base_img.size
    skin_col = hex_to_rgba(CHAR_COLORS[char_id]['skin'])
    shadow_col = (int(skin_col[0]*0.8), int(skin_col[1]*0.8), int(skin_col[2]*0.8), 255)
    
    fg = create_transparent(w, h)
    dfg = ImageDraw.Draw(fg)
    
    # Character's arm coming up to chin:
    # Elbow near waist (w*0.52, h*0.52), forearm angling up to chin (w*0.48, h*0.32)
    chin_x, chin_y = int(w * 0.48), int(h * 0.32)
    elbow_x, elbow_y = int(w * 0.58), int(h * 0.50)
    
    # Forearm sleeve & skin
    dfg.line([(elbow_x, elbow_y), (chin_x + 10, chin_y + 30)], fill=hex_to_rgba(CHAR_COLORS[char_id]['outfit']), width=48)
    dfg.line([(chin_x + 10, chin_y + 30), (chin_x, chin_y)], fill=skin_col, width=32)
    
    # Hand resting thoughtfully under chin
    # Palm / knuckle support
    dfg.ellipse([chin_x - 22, chin_y - 12, chin_x + 22, chin_y + 25], fill=skin_col, outline=shadow_col, width=3)
    # Index finger pointing along jawline
    dfg.rounded_rectangle([chin_x - 14, chin_y - 25, chin_x - 2, chin_y + 5], radius=6, fill=skin_col, outline=shadow_col, width=2)
    # Thumb supporting under jaw
    dfg.rounded_rectangle([chin_x + 2, chin_y + 2, chin_x + 22, chin_y + 14], radius=5, fill=skin_col, outline=shadow_col, width=2)
    # Soft shadow under jaw
    dfg.ellipse([chin_x - 28, chin_y - 8, chin_x + 28, chin_y + 8], fill=(0, 0, 0, 45))
    
    comp = Image.alpha_composite(base_img, fg)
    return comp

# -------------------------------------------------------------
# 2. DANCE: Azerbaijani National Costume & Traditional Dance Pose
# -------------------------------------------------------------
def render_dance(base_img, char_id):
    w, h = base_img.size
    is_girl = CHAR_COLORS[char_id]['gender'] == 'girl'
    skin_col = hex_to_rgba(CHAR_COLORS[char_id]['skin'])
    
    bg = create_transparent(w, h)
    fg = create_transparent(w, h)
    dbg = ImageDraw.Draw(bg)
    dfg = ImageDraw.Draw(fg)
    
    cx = int(w * 0.50)
    
    if is_girl:
        # === AZERBAIJANI NATIONAL COSTUME FOR GIRLS ===
        # 1. Silk Veil flowing down back (Kəlağayı)
        dbg.polygon([
            (cx - 110, int(h * 0.12)), (cx + 110, int(h * 0.12)),
            (cx + 160, int(h * 0.70)), (cx - 160, int(h * 0.70))
        ], fill=(255, 255, 255, 180), outline=(245, 158, 11, 200), width=4)
        
        # 2. Araxçın (Headdress Cap) on head
        dfg.ellipse([cx - 75, int(h * 0.07), cx + 75, int(h * 0.16)], fill=(190, 18, 60, 255), outline=(245, 158, 11, 255), width=5)
        # Gold filigree pattern on Araxçın
        for ox in range(-50, 51, 25):
            dfg.ellipse([cx + ox - 8, int(h * 0.10) - 8, cx + ox + 8, int(h * 0.10) + 8], fill=(251, 191, 36, 255))
            
        # 3. Traditional Long Velvet Dress (Milli Don)
        # Flowing skirt covering from waist to ankles
        dfg.polygon([
            (cx - 90, int(h * 0.52)), (cx + 90, int(h * 0.52)),
            (cx + 210, int(h * 0.92)), (cx - 210, int(h * 0.92))
        ], fill=(190, 18, 60, 255), outline=(159, 18, 57, 255), width=4)
        # Gold border trim along skirt bottom
        dfg.polygon([
            (cx - 210, int(h * 0.88)), (cx + 210, int(h * 0.88)),
            (cx + 215, int(h * 0.92)), (cx - 215, int(h * 0.92))
        ], fill=(245, 158, 11, 255))
        # Gold Buta embroidery along skirt front
        for by in range(int(h * 0.60), int(h * 0.85), 55):
            dfg.ellipse([cx - 20, by, cx + 20, by + 35], fill=(251, 191, 36, 240))
            
        # 4. Embroidered Vest (Arxalıq / Küdrü)
        dfg.polygon([
            (cx - 85, int(h * 0.35)), (cx + 85, int(h * 0.35)),
            (cx + 80, int(h * 0.54)), (cx - 80, int(h * 0.54))
        ], fill=(159, 18, 57, 255), outline=(245, 158, 11, 255), width=5)
        # Silver Belt at waist (Kəmər)
        dfg.rounded_rectangle([cx - 85, int(h * 0.52), cx + 85, int(h * 0.56)], radius=6, fill=(226, 232, 240, 255), outline=(148, 163, 184, 255), width=3)
        dfg.ellipse([cx - 15, int(h * 0.51), cx + 15, int(h * 0.57)], fill=(251, 191, 36, 255))
        
        # 5. Azerbaijani Traditional Dance Arms (Zərif milli rəqs qolları)
        # Right arm curved gracefully overhead
        dfg.line([(cx + 60, int(h * 0.36)), (cx + 130, int(h * 0.22)), (cx + 100, int(h * 0.10))], fill=(190, 18, 60, 255), width=38)
        dfg.ellipse([cx + 85, int(h * 0.08), cx + 115, int(h * 0.13)], fill=skin_col)
        # Left arm extended gracefully sideways
        dfg.line([(cx - 60, int(h * 0.36)), (cx - 160, int(h * 0.40)), (cx - 220, int(h * 0.44))], fill=(190, 18, 60, 255), width=38)
        dfg.ellipse([cx - 235, int(h * 0.42), cx - 210, int(h * 0.47)], fill=skin_col)

    else:
        # === AZERBAIJANI NATIONAL COSTUME FOR BOYS ===
        # 1. Astrakhan Papakha (Papaq)
        dfg.ellipse([cx - 80, int(h * 0.05), cx + 80, int(h * 0.15)], fill=(30, 41, 59, 255), outline=(15, 23, 42, 255), width=4)
        for i in range(12):
            dfg.ellipse([cx - 70 + i * 12, int(h * 0.06), cx - 55 + i * 12, int(h * 0.12)], fill=(51, 65, 85, 200))
            
        # 2. Traditional Chokha (Çuxa Coat)
        dfg.polygon([
            (cx - 95, int(h * 0.35)), (cx + 95, int(h * 0.35)),
            (cx + 130, int(h * 0.88)), (cx - 130, int(h * 0.88))
        ], fill=(30, 41, 59, 255), outline=(15, 23, 42, 255), width=5)
        
        # 3. Chest Cartridge Tubes (Qazırlar) on both sides of chest
        for side in [-1, 1]:
            for row in range(5):
                gx = cx + side * (35 + row * 10)
                gy = int(h * 0.38) + row * 12
                dfg.rounded_rectangle([gx - 4, gy - 16, gx + 4, gy + 16], radius=2, fill=(226, 232, 240, 255), outline=(15, 23, 42, 255))
                dfg.rectangle([gx - 4, gy - 16, gx + 4, gy - 8], fill=(245, 158, 11, 255))
                
        # 4. Silver Belt & Ceremonial Dagger (Kəmər & Qəmə)
        dfg.rounded_rectangle([cx - 90, int(h * 0.54), cx + 90, int(h * 0.58)], radius=4, fill=(226, 232, 240, 255), outline=(71, 85, 105, 255), width=3)
        # Dagger Scabbard angled at waist
        dfg.polygon([
            (cx - 10, int(h * 0.57)), (cx + 10, int(h * 0.57)),
            (cx + 5, int(h * 0.72)), (cx - 5, int(h * 0.72))
        ], fill=(15, 23, 42, 255), outline=(226, 232, 240, 255), width=2)
        
        # 5. Proud Lezginka / Yallı Folk Dance Arms
        # Right arm bent sharply across chest
        dfg.line([(cx + 70, int(h * 0.38)), (cx + 120, int(h * 0.44)), (cx, int(h * 0.45))], fill=(30, 41, 59, 255), width=42)
        dfg.ellipse([cx - 15, int(h * 0.43), cx + 15, int(h * 0.47)], fill=skin_col)
        # Left arm outstretched proudly to side
        dfg.line([(cx - 70, int(h * 0.38)), (cx - 160, int(h * 0.38)), (cx - 230, int(h * 0.38))], fill=(30, 41, 59, 255), width=42)
        dfg.ellipse([cx - 245, int(h * 0.36), cx - 220, int(h * 0.41)], fill=skin_col)
        
    comp = Image.alpha_composite(bg, base_img)
    comp = Image.alpha_composite(comp, fg)
    return comp

# -------------------------------------------------------------
# 3. SING: Holding real microphone in hand with music notes
# -------------------------------------------------------------
def render_sing(base_img, char_id):
    w, h = base_img.size
    skin_col = hex_to_rgba(CHAR_COLORS[char_id]['skin'])
    
    fg = create_transparent(w, h)
    dfg = ImageDraw.Draw(fg)
    
    # Hand holding microphone right at chest/mouth level
    mic_x, mic_y = int(w * 0.56), int(h * 0.40)
    
    # Microphone body
    dfg.line([(mic_x + 10, mic_y + 10), (mic_x + 45, mic_y + 110)], fill=(30, 41, 59, 255), width=18)
    # Metallic collar ring
    dfg.ellipse([mic_x + 4, mic_y + 8, mic_x + 20, mic_y + 20], fill=(226, 232, 240, 255), outline=(100, 116, 139, 255))
    # Chrome mesh ball head
    dfg.ellipse([mic_x - 22, mic_y - 32, mic_x + 22, mic_y + 12], fill=(203, 213, 225, 255), outline=(51, 65, 85, 255), width=4)
    # Mesh texture lines
    for i in range(-15, 16, 8):
        dfg.line([(mic_x + i, mic_y - 28), (mic_x + i, mic_y + 8)], fill=(100, 116, 139, 255), width=2)
    # Highlights
    dfg.ellipse([mic_x - 14, mic_y - 24, mic_x - 4, mic_y - 14], fill=(255, 255, 255, 220))
    
    # Fingers wrapped around microphone handle
    for fy in range(mic_y + 25, mic_y + 75, 14):
        dfg.rounded_rectangle([mic_x + 2, fy, mic_x + 26, fy + 12], radius=6, fill=skin_col, outline=(150, 100, 60, 255), width=2)
        
    # Floating 3D Musical Notes around character (NO SMILEYS!)
    notes = [
        (int(w * 0.22), int(h * 0.26), 28, (59, 130, 246, 230)),
        (int(w * 0.78), int(h * 0.22), 34, (236, 72, 153, 230)),
        (int(w * 0.82), int(h * 0.45), 26, (245, 158, 11, 230)),
        (int(w * 0.18), int(h * 0.48), 30, (168, 85, 247, 230))
    ]
    for nx, ny, sz, col in notes:
        # Note head
        dfg.ellipse([nx, ny, nx + sz, ny + int(sz * 0.75)], fill=col)
        # Note stem
        dfg.line([(nx + sz - 3, ny + sz // 2), (nx + sz - 3, ny - sz)], fill=col, width=5)
        # Note flag
        dfg.polygon([(nx + sz - 3, ny - sz), (nx + sz + 15, ny - sz + 10), (nx + sz - 3, ny - sz + 18)], fill=col)
        
    comp = Image.alpha_composite(base_img, fg)
    return comp

# -------------------------------------------------------------
# 4. PLAY TOY: Girls with Barbies, Boys with Toy Cars (Seated)
# -------------------------------------------------------------
def render_playtoy(base_img, char_id):
    w, h = base_img.size
    is_girl = CHAR_COLORS[char_id]['gender'] == 'girl'
    skin_col = hex_to_rgba(CHAR_COLORS[char_id]['skin'])
    
    bg = create_transparent(w, h)
    fg = create_transparent(w, h)
    dbg = ImageDraw.Draw(bg)
    dfg = ImageDraw.Draw(fg)
    
    # Floor play mat underneath
    dbg.ellipse([int(w * 0.08), int(h * 0.75), int(w * 0.92), int(h * 0.96)], fill=(241, 245, 249, 220), outline=(203, 213, 225, 255), width=4)
    
    if is_girl:
        # === BARBIE DOLLS FOR GIRLS ===
        bx, by = int(w * 0.58), int(h * 0.65)
        # Main Barbie Doll held/posed in front
        # Doll Legs & Shoes
        dfg.line([(bx - 12, by + 120), (bx - 12, by + 180)], fill=(253, 224, 71, 255), width=8)
        dfg.line([(bx + 12, by + 120), (bx + 12, by + 180)], fill=(253, 224, 71, 255), width=8)
        dfg.ellipse([bx - 18, by + 175, bx - 6, by + 188], fill=(236, 72, 153, 255))
        dfg.ellipse([bx + 6, by + 175, bx + 18, by + 188], fill=(236, 72, 153, 255))
        # Doll Pink Princess Dress (Flared Gown)
        dfg.polygon([(bx - 18, by + 60), (bx + 18, by + 60), (bx + 45, by + 130), (bx - 45, by + 130)], fill=(244, 114, 182, 255), outline=(219, 39, 119, 255), width=3)
        # Glitter ruffles
        dfg.arc([bx - 45, by + 120, bx + 45, by + 135], start=0, end=180, fill=(255, 255, 255, 255), width=3)
        # Doll Torso
        dfg.rounded_rectangle([bx - 14, by + 25, bx + 14, by + 62], radius=4, fill=(236, 72, 153, 255))
        # Doll Head & Face
        dfg.ellipse([bx - 16, by - 12, bx + 16, by + 24], fill=(254, 215, 170, 255), outline=(249, 115, 22, 255), width=2)
        # Barbie Long Golden Hair
        dfg.ellipse([bx - 22, by - 22, bx + 22, by + 15], fill=(250, 204, 21, 255))
        dfg.polygon([(bx - 22, by), (bx - 28, by + 75), (bx - 12, by + 75)], fill=(250, 204, 21, 255))
        dfg.polygon([(bx + 22, by), (bx + 28, by + 75), (bx + 12, by + 75)], fill=(250, 204, 21, 255))
        
        # Second mini Barbie doll sitting beside on play mat
        dfg.ellipse([bx - 80, by + 90, bx - 55, by + 120], fill=(168, 85, 247, 255))
        dfg.ellipse([bx - 74, by + 70, bx - 60, by + 90], fill=(254, 215, 170, 255))
        dfg.ellipse([bx - 77, by + 65, bx - 57, by + 82], fill=(120, 53, 15, 255))
        
        # Doll accessory kit (mirror, purse, brush)
        dfg.rounded_rectangle([bx + 60, by + 130, bx + 95, by + 155], radius=6, fill=(244, 63, 94, 255), outline=(190, 18, 60, 255), width=2)
        dfg.arc([bx + 70, by + 120, bx + 85, by + 135], start=180, end=360, fill=(245, 158, 11, 255), width=3)
        
    else:
        # === TOY CARS FOR BOYS ===
        cx, cy = int(w * 0.58), int(h * 0.72)
        # Main Sleek Red Sports Car
        # Car Body
        dfg.rounded_rectangle([cx - 90, cy + 20, cx + 90, cy + 80], radius=16, fill=(220, 38, 38, 255), outline=(153, 27, 27, 255), width=4)
        # Cabin / Windshield
        dfg.polygon([(cx - 45, cy + 20), (cx - 20, cy - 15), (cx + 35, cy - 15), (cx + 55, cy + 20)], fill=(30, 41, 59, 255), outline=(15, 23, 42, 255), width=3)
        dfg.polygon([(cx - 15, cy - 10), (cx + 30, cy - 10), (cx + 45, cy + 16), (cx - 35, cy + 16)], fill=(125, 211, 252, 240))
        # Racing Stripe
        dfg.rectangle([cx - 90, cy + 38, cx + 90, cy + 50], fill=(255, 255, 255, 255))
        # Rear Spoiler
        dfg.rectangle([cx - 95, cy + 5, cx - 75, cy + 15], fill=(153, 27, 27, 255))
        dfg.line([(cx - 85, cy + 15), (cx - 85, cy + 30)], fill=(153, 27, 27, 255), width=6)
        # Black Rubber Wheels with Chrome Rims
        for wx in [cx - 60, cx + 55]:
            dfg.ellipse([wx - 26, cy + 60, wx + 26, cy + 112], fill=(15, 23, 42, 255), outline=(71, 85, 105, 255), width=3)
            dfg.ellipse([wx - 14, cy + 72, wx + 14, cy + 100], fill=(226, 232, 240, 255))
            
        # Second Toy Blue Monster Truck / SUV beside it
        tx, ty = int(w * 0.22), int(h * 0.78)
        dfg.rounded_rectangle([tx - 65, ty, tx + 65, ty + 50], radius=12, fill=(2, 132, 199, 255), outline=(3, 105, 161, 255), width=3)
        dfg.rectangle([tx - 35, ty - 22, tx + 35, ty], fill=(30, 41, 59, 255))
        for wx in [tx - 45, tx + 40]:
            dfg.ellipse([wx - 22, ty + 35, wx + 22, ty + 79], fill=(15, 23, 42, 255))
            
    comp = Image.alpha_composite(bg, base_img)
    comp = Image.alpha_composite(comp, fg)
    return comp

# -------------------------------------------------------------
# 5. WALK: Side profile walking stride along a stone path
# -------------------------------------------------------------
def render_walk(base_img, char_id):
    w, h = base_img.size
    fg = create_transparent(w, h)
    dfg = ImageDraw.Draw(fg)
    
    # Clean natural garden stone pathway beneath feet
    for i, (sx, sy, sw, sh) in enumerate([
        (int(w * 0.18), int(h * 0.88), 120, 45),
        (int(w * 0.42), int(h * 0.84), 140, 50),
        (int(w * 0.68), int(h * 0.89), 130, 45)
    ]):
        dfg.ellipse([sx, sy, sx + sw, sy + sh], fill=(226, 232, 240, 230), outline=(148, 163, 184, 255), width=4)
        dfg.ellipse([sx + 15, sy + 8, sx + sw - 15, sy + sh - 12], fill=(241, 245, 249, 255))
        
    comp = Image.alpha_composite(base_img, fg)
    return comp

# -------------------------------------------------------------
# 6. SLIDE: Realistic curved playground slide with child sliding
# -------------------------------------------------------------
def render_slide(base_img, char_id):
    w, h = base_img.size
    bg = create_transparent(w, h)
    fg = create_transparent(w, h)
    dbg = ImageDraw.Draw(bg)
    dfg = ImageDraw.Draw(fg)
    
    # Background Ladder & Platform
    dbg.rectangle([int(w * 0.68), int(h * 0.25), int(w * 0.72), int(h * 0.92)], fill=(245, 158, 11, 255), outline=(180, 83, 9, 255), width=4)
    for ly in range(int(h * 0.35), int(h * 0.90), 65):
        dbg.line([(int(w * 0.65), ly), (int(w * 0.75), ly)], fill=(251, 191, 36, 255), width=8)
    dbg.rounded_rectangle([int(w * 0.58), int(h * 0.25), int(w * 0.78), int(h * 0.30)], radius=8, fill=(245, 158, 11, 255), outline=(180, 83, 9, 255), width=3)
    
    # 3D Curved Slide Chute running under and around character
    # Background Chute base
    dbg.arc([int(w * -0.05), int(h * 0.40), int(w * 0.88), int(h * 0.96)], start=200, end=355, fill=(37, 99, 235, 255), width=65)
    # Foreground Protective Side Guardrails
    dfg.arc([int(w * -0.05), int(h * 0.38), int(w * 0.88), int(h * 0.94)], start=200, end=355, fill=(239, 68, 68, 255), width=18)
    dfg.arc([int(w * 0.02), int(h * 0.45), int(w * 0.95), int(h * 1.01)], start=200, end=355, fill=(250, 204, 21, 255), width=18)
    
    comp = Image.alpha_composite(bg, base_img)
    comp = Image.alpha_composite(comp, fg)
    return comp

# -------------------------------------------------------------
# 7. RIDE BIKE: Character mounted on and riding bicycle
# -------------------------------------------------------------
def render_ridebike(base_img, char_id):
    w, h = base_img.size
    bg = create_transparent(w, h)
    fg = create_transparent(w, h)
    dbg = ImageDraw.Draw(bg)
    dfg = ImageDraw.Draw(fg)
    
    w1_x, w1_y = int(w * 0.22), int(h * 0.80)
    w2_x, w2_y = int(w * 0.76), int(h * 0.80)
    wr = 85
    
    # Rear Wheel (Background)
    dbg.ellipse([w1_x - wr, w1_y - wr, w1_x + wr, w1_y + wr], fill=(15, 23, 42, 255), outline=(71, 85, 105, 255), width=16)
    dbg.ellipse([w1_x - wr + 18, w1_y - wr + 18, w1_x + wr - 18, w1_y + wr - 18], fill=(0, 0, 0, 0), outline=(226, 232, 240, 255), width=5)
    for ang in range(0, 360, 30):
        rad = math.radians(ang)
        dbg.line([(w1_x, w1_y), (w1_x + int(math.cos(rad)*(wr-20)), w1_y + int(math.sin(rad)*(wr-20)))], fill=(203, 213, 225, 255), width=2)
        
    # Front Wheel (Foreground)
    dfg.ellipse([w2_x - wr, w2_y - wr, w2_x + wr, w2_y + wr], fill=(15, 23, 42, 255), outline=(71, 85, 105, 255), width=16)
    dfg.ellipse([w2_x - wr + 18, w2_y - wr + 18, w2_x + wr - 18, w2_y + wr - 18], fill=(0, 0, 0, 0), outline=(226, 232, 240, 255), width=5)
    for ang in range(0, 360, 30):
        rad = math.radians(ang)
        dfg.line([(w2_x, w2_y), (w2_x + int(math.cos(rad)*(wr-20)), w2_y + int(math.sin(rad)*(wr-20)))], fill=(203, 213, 225, 255), width=2)
        
    # Frame & Handlebars
    seat_x, seat_y = int(w * 0.42), int(h * 0.68)
    head_x, head_y = int(w * 0.66), int(h * 0.60)
    pedal_x, pedal_y = int(w * 0.48), int(h * 0.80)
    
    # Tubes
    dfg.line([(w1_x, w1_y), (seat_x, seat_y)], fill=(239, 68, 68, 255), width=16)
    dfg.line([(seat_x, seat_y), (pedal_x, pedal_y)], fill=(239, 68, 68, 255), width=16)
    dfg.line([(w1_x, w1_y), (pedal_x, pedal_y)], fill=(239, 68, 68, 255), width=16)
    dfg.line([(pedal_x, pedal_y), (head_x, head_y)], fill=(239, 68, 68, 255), width=16)
    dfg.line([(seat_x, seat_y), (head_x, head_y)], fill=(239, 68, 68, 255), width=16)
    dfg.line([(head_x, head_y), (w2_x, w2_y)], fill=(239, 68, 68, 255), width=16)
    
    # Saddle & Handlebars
    dfg.rounded_rectangle([seat_x - 55, seat_y - 22, seat_x + 35, seat_y], radius=8, fill=(15, 23, 42, 255))
    dfg.line([(head_x - 30, head_y - 35), (head_x + 30, head_y - 35)], fill=(15, 23, 42, 255), width=18)
    # Bell
    dfg.ellipse([head_x - 20, head_y - 50, head_x, head_y - 32], fill=(251, 191, 36, 255))
    
    comp = Image.alpha_composite(bg, base_img)
    comp = Image.alpha_composite(comp, fg)
    return comp

# -------------------------------------------------------------
# 8. WAKE UP: In bed, half-risen, quilt over lap, morning stretch
# -------------------------------------------------------------
def render_wakeup(base_img, char_id):
    w, h = base_img.size
    bg = create_transparent(w, h)
    fg = create_transparent(w, h)
    dbg = ImageDraw.Draw(bg)
    dfg = ImageDraw.Draw(fg)
    
    # Wooden Headboard behind character
    dbg.rounded_rectangle([int(w * 0.10), int(h * 0.35), int(w * 0.90), int(h * 0.85)], radius=24, fill=(180, 83, 9, 255), outline=(120, 53, 15, 255), width=8)
    for px in range(int(w * 0.18), int(w * 0.85), 65):
        dbg.rectangle([px, int(h * 0.40), px + 40, int(h * 0.70)], fill=(146, 64, 14, 255))
        
    # Fluffy Bed Pillows
    dbg.rounded_rectangle([int(w * 0.20), int(h * 0.50), int(w * 0.80), int(h * 0.68)], radius=35, fill=(241, 245, 249, 255), outline=(203, 213, 225, 255), width=6)
    
    # Soft Thick Quilted Duvet / Blanket (Yorğan) draping across lap and legs
    dfg.rounded_rectangle([int(w * 0.12), int(h * 0.70), int(w * 0.88), int(h * 0.94)], radius=30, fill=(191, 219, 254, 255), outline=(96, 165, 250, 255), width=6)
    # Quilt fold pattern
    for qx in range(int(w * 0.18), int(w * 0.85), 70):
        dfg.arc([qx, int(h * 0.72), qx + 60, int(h * 0.80)], start=0, end=180, fill=(147, 197, 253, 255), width=4)
        
    # Warm gentle morning sunbeams filtering across
    dbg.polygon([(int(w * 0.75), int(h * 0.05)), (int(w * 0.98), int(h * 0.05)), (int(w * 0.70), int(h * 0.65)), (int(w * 0.45), int(h * 0.65))], fill=(254, 240, 138, 70))
    
    comp = Image.alpha_composite(bg, base_img)
    comp = Image.alpha_composite(comp, fg)
    return comp

# -------------------------------------------------------------
# 9. BATHE: Side view, shower head with cascading water streams
# -------------------------------------------------------------
def render_bathe(base_img, char_id):
    w, h = base_img.size
    bg = create_transparent(w, h)
    fg = create_transparent(w, h)
    dbg = ImageDraw.Draw(bg)
    dfg = ImageDraw.Draw(fg)
    
    # Chrome Shower Pipe & Rain-Shower Head
    sh_x, sh_y = int(w * 0.45), int(h * 0.08)
    dbg.line([(sh_x - 140, sh_y), (sh_x, sh_y)], fill=(148, 163, 184, 255), width=22)
    dbg.polygon([
        (sh_x - 55, sh_y + 15), (sh_x + 55, sh_y + 15),
        (sh_x + 80, sh_y + 55), (sh_x - 80, sh_y + 55)
    ], fill=(203, 213, 225, 255), outline=(100, 116, 139, 255), width=4)
    
    # Realistic Cascading Water Streams & Droplets
    for ox in range(-70, 71, 14):
        # Long flowing water streams
        dfg.line([(sh_x + ox, sh_y + 60), (sh_x + int(ox * 1.8), int(h * 0.85))], fill=(186, 230, 253, 180), width=4)
        # Droplets
        for dy in range(int(h * 0.18), int(h * 0.80), 65):
            dfg.ellipse([sh_x + ox - 3, dy, sh_x + ox + 3, dy + 10], fill=(56, 189, 248, 220))
            
    # Water splash mist at shoulders
    for mx in range(int(w * 0.35), int(w * 0.65), 18):
        dfg.ellipse([mx, int(h * 0.42), mx + 8, int(h * 0.42) + 8], fill=(255, 255, 255, 200))
        
    comp = Image.alpha_composite(bg, base_img)
    comp = Image.alpha_composite(comp, fg)
    return comp

# -------------------------------------------------------------
# 10. WASH: At ceramic washbasin with rich foaming soap bubbles
# -------------------------------------------------------------
def render_wash(base_img, char_id):
    w, h = base_img.size
    fg = create_transparent(w, h)
    dfg = ImageDraw.Draw(fg)
    
    # Modern Bathroom Ceramic Washbasin (Moydadır)
    bx, by = int(w * 0.50), int(h * 0.65)
    # Basin Bowl
    dfg.ellipse([bx - 160, by, bx + 160, by + 160], fill=(255, 255, 255, 255), outline=(203, 213, 225, 255), width=6)
    dfg.ellipse([bx - 130, by + 20, bx + 130, by + 130], fill=(241, 245, 249, 255), outline=(226, 232, 240, 255), width=4)
    # Drain
    dfg.ellipse([bx - 16, by + 75, bx + 16, by + 95], fill=(148, 163, 184, 255))
    
    # Chrome Swan-neck Mixer Tap (Kran)
    tx, ty = bx, by - 40
    dfg.arc([tx - 40, ty - 80, tx + 40, ty], start=180, end=360, fill=(148, 163, 184, 255), width=18)
    dfg.line([(tx + 40, ty - 40), (tx + 40, ty + 15)], fill=(148, 163, 184, 255), width=18)
    # Flowing Water Stream
    dfg.line([(tx + 40, ty + 15), (tx + 40, by + 80)], fill=(56, 189, 248, 220), width=14)
    
    # Hands covered in rich white foaming soap lather & bubbles
    hx, hy = tx + 35, by + 45
    for fx, fy, fr in [
        (hx - 25, hy - 10, 22), (hx + 15, hy - 15, 26),
        (hx - 10, hy + 15, 28), (hx + 25, hy + 10, 24),
        (hx - 35, hy + 20, 20), (hx, hy - 25, 18)
    ]:
        dfg.ellipse([fx - fr, fy - fr, fx + fr, fy + fr], fill=(255, 255, 255, 240), outline=(186, 230, 253, 255), width=3)
        # Bubble shine
        dfg.ellipse([fx - fr//2, fy - fr//2, fx - fr//4, fy - fr//4], fill=(255, 255, 255, 255))
        
    comp = Image.alpha_composite(base_img, fg)
    return comp

# -------------------------------------------------------------
# 11. COMB: Comb in hand actively combing hair locks
# -------------------------------------------------------------
def render_comb(base_img, char_id):
    w, h = base_img.size
    skin_col = hex_to_rgba(CHAR_COLORS[char_id]['skin'])
    
    fg = create_transparent(w, h)
    dfg = ImageDraw.Draw(fg)
    
    # Hair Comb placed right at the side/crown of hair
    cx, cy = int(w * 0.65), int(h * 0.18)
    # Arm raised to head
    dfg.line([(int(w * 0.55), int(h * 0.40)), (cx + 35, cy + 80), (cx + 10, cy + 20)], fill=skin_col, width=32)
    # Comb Spine / Handle
    dfg.line([(cx + 40, cy + 40), (cx - 40, cy - 30)], fill=(147, 51, 234, 255), width=18)
    # Comb Teeth engaging hair
    for i in range(-35, 36, 7):
        dfg.line([(cx + i, cy + int(i * 0.8)), (cx + i - 18, cy + int(i * 0.8) - 22)], fill=(192, 132, 252, 255), width=3)
    # Hair Grooming Shine Waves
    dfg.arc([cx - 70, cy - 40, cx + 10, cy + 20], start=160, end=260, fill=(255, 255, 255, 220), width=4)
    
    comp = Image.alpha_composite(base_img, fg)
    return comp

# -------------------------------------------------------------
# 12. EAT: Seated at table with food bowl and spoon
# -------------------------------------------------------------
def render_eat(base_img, char_id):
    w, h = base_img.size
    skin_col = hex_to_rgba(CHAR_COLORS[char_id]['skin'])
    
    fg = create_transparent(w, h)
    dfg = ImageDraw.Draw(fg)
    
    # Dining Table with Tablecloth
    tx, ty = int(w * 0.50), int(h * 0.68)
    dfg.rounded_rectangle([int(w * 0.15), ty, int(w * 0.85), ty + 120], radius=16, fill=(254, 243, 199, 255), outline=(245, 158, 11, 255), width=5)
    # Tablecloth runner
    dfg.rectangle([int(w * 0.28), ty, int(w * 0.72), ty + 120], fill=(254, 202, 202, 200))
    
    # Ceramic Bowl of warm food
    dfg.ellipse([tx - 85, ty + 15, tx + 85, ty + 95], fill=(255, 255, 255, 255), outline=(203, 213, 225, 255), width=5)
    dfg.ellipse([tx - 70, ty + 25, tx + 70, ty + 80], fill=(245, 158, 11, 255))
    # Berry treats on food
    for bx, by in [(tx - 30, ty + 50), (tx + 15, ty + 45), (tx, ty + 60)]:
        dfg.ellipse([bx - 8, by - 8, bx + 8, by + 8], fill=(225, 29, 72, 255))
        
    # Hand holding metallic spoon
    sx, sy = tx + 65, ty - 10
    dfg.line([(sx + 50, sy + 40), (sx - 15, sy - 20)], fill=(148, 163, 184, 255), width=8)
    dfg.ellipse([sx - 35, sy - 35, sx - 10, sy - 15], fill=(203, 213, 225, 255), outline=(100, 116, 139, 255), width=2)
    # Fingers holding spoon
    dfg.rounded_rectangle([sx + 5, sy + 5, sx + 28, sy + 25], radius=6, fill=skin_col)
    
    comp = Image.alpha_composite(base_img, fg)
    return comp

# -------------------------------------------------------------
# 13. DRINK: Holding glass cup with clear water and straw
# -------------------------------------------------------------
def render_drink(base_img, char_id):
    w, h = base_img.size
    skin_col = hex_to_rgba(CHAR_COLORS[char_id]['skin'])
    
    fg = create_transparent(w, h)
    dfg = ImageDraw.Draw(fg)
    
    # Glass Tumbler in front of chest/mouth
    gx, gy = int(w * 0.55), int(h * 0.44)
    # Glass Body
    dfg.polygon([
        (gx - 40, gy - 65), (gx + 40, gy - 65),
        (gx + 30, gy + 55), (gx - 30, gy + 55)
    ], fill=(224, 242, 254, 160), outline=(56, 189, 248, 255), width=4)
    # Clear Sparkling Water Level
    dfg.polygon([
        (gx - 36, gy - 20), (gx + 36, gy - 20),
        (gx + 28, gy + 50), (gx - 28, gy + 50)
    ], fill=(14, 165, 233, 220))
    # Drinking Straw
    dfg.line([(gx - 5, gy + 20), (gx + 20, gy - 85), (gx + 50, gy - 110)], fill=(239, 68, 68, 255), width=8)
    # Fingers gripping glass
    dfg.rounded_rectangle([gx - 45, gy - 10, gx - 20, gy + 30], radius=8, fill=skin_col)
    dfg.rounded_rectangle([gx + 20, gy - 10, gx + 45, gy + 30], radius=8, fill=skin_col)
    
    comp = Image.alpha_composite(base_img, fg)
    return comp

# -------------------------------------------------------------
# 14. DRESS: Standing at wardrobe closet holding a t-shirt
# -------------------------------------------------------------
def render_dress(base_img, char_id):
    w, h = base_img.size
    skin_col = hex_to_rgba(CHAR_COLORS[char_id]['skin'])
    
    bg = create_transparent(w, h)
    fg = create_transparent(w, h)
    dbg = ImageDraw.Draw(bg)
    dfg = ImageDraw.Draw(fg)
    
    # Open Wooden Wardrobe Closet behind character
    wx, wy = int(w * 0.12), int(h * 0.25)
    dbg.rounded_rectangle([wx, wy, wx + 280, wy + 720], radius=16, fill=(180, 83, 9, 255), outline=(120, 53, 15, 255), width=6)
    dbg.rectangle([wx + 15, wy + 15, wx + 265, wy + 705], fill=(254, 243, 199, 255))
    # Clothes hanging on rail inside closet
    dbg.line([(wx + 20, wy + 70), (wx + 260, wy + 70)], fill=(100, 116, 139, 255), width=8)
    # Colorful hanging shirts
    colors = [(239, 68, 68, 255), (59, 130, 246, 255), (16, 185, 129, 255), (168, 85, 247, 255)]
    for i, col in enumerate(colors):
        sx = wx + 45 + i * 55
        dbg.polygon([(sx - 20, wy + 80), (sx + 20, wy + 80), (sx + 15, wy + 210), (sx - 15, wy + 210)], fill=col)
        
    # Character holding a folded bright T-Shirt in hand
    hx, hy = int(w * 0.65), int(h * 0.52)
    # T-Shirt
    dfg.polygon([
        (hx - 55, hy - 40), (hx + 55, hy - 40),
        (hx + 45, hy + 65), (hx - 45, hy + 65)
    ], fill=(59, 130, 246, 255), outline=(29, 78, 216, 255), width=4)
    # Collar
    dfg.polygon([(hx - 18, hy - 40), (hx, hy - 20), (hx + 18, hy - 40)], fill=(255, 255, 255, 255))
    # Hand holding t-shirt
    dfg.rounded_rectangle([hx - 20, hy - 50, hx + 20, hy - 25], radius=6, fill=skin_col)
    
    comp = Image.alpha_composite(bg, base_img)
    comp = Image.alpha_composite(comp, fg)
    return comp

print("All realistic renderers compiled successfully.")
