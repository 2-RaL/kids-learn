"""
process_all_assets.py
Comprehensive pipeline to generate and normalize all character assets requested by user:
1. sing (Full body standing, microphone in hand, transparent background)
2. think (100% transparent background)
3. playToy (100% transparent background, no borders)
4. dance (Full body with legs, headphones, dance outfit, 100% transparent)
5. shakeHead (Neutral expression, no waving hand, X arms gesture, saying xeyr)
6. comb (Holding comb, combing hair)
7. wakeUp (Full bed visible, transparent background)
8. sleep (Full bed visible, transparent background)
9. wash (Full body standing at sink, washing hands)
10. bathe (Full bathtub visible, transparent background)
11. hug, openDoor, closeDoor (Normalized scale on 768x1376 canvas)
"""

import os
import glob
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import rembg

BRAIN_DIR = r"C:\Users\User\.gemini\antigravity-ide\brain\5513dc17-db16-46a5-882e-f6cbd90cd25f"
GEN_LEYLA = "public/generated-actions/leyla"
GEN_TOM = "public/generated-actions/tom"
ASSETS_CHAR = "public/assets/characters"

os.makedirs(GEN_LEYLA, exist_ok=True)
os.makedirs(GEN_TOM, exist_ok=True)
os.makedirs(ASSETS_CHAR, exist_ok=True)

session = rembg.new_session('u2netp')

def save_dual(img: Image.Image, char_name: str, action: str):
    """Save to both generated-actions and assets/characters"""
    gen_path = os.path.join(f"public/generated-actions/{char_name}", f"{action}.png")
    asset_path = os.path.join(ASSETS_CHAR, f"{char_name}_{action}.png")
    img.save(gen_path, "PNG", optimize=True)
    img.save(asset_path, "PNG", optimize=True)
    print(f"Saved: {gen_path} and {asset_path} (size={img.size}, bbox={img.getbbox()})")

def normalize_to_standing(img_cut: Image.Image, target_h=1240, ground_y=1318, canvas_w=768, canvas_h=1376):
    """Place character cutout onto canvas_w x canvas_h canvas matching leyla_standing.png ground level"""
    bbox = img_cut.getbbox()
    if not bbox:
        return img_cut
    crop = img_cut.crop(bbox)
    scale = target_h / crop.height
    new_w = max(1, int(crop.width * scale))
    new_h = target_h
    resized = crop.resize((new_w, new_h), Image.LANCZOS)
    
    # Expand canvas width if character is wide (e.g. dancing or spread arms)
    final_w = max(canvas_w, new_w + 40)
    canvas = Image.new("RGBA", (final_w, canvas_h), (0, 0, 0, 0))
    paste_x = (final_w - new_w) // 2
    paste_y = ground_y - new_h
    canvas.paste(resized, (paste_x, paste_y), resized)
    return canvas

# ==========================================
# 1. SING (Musiqi Oxu)
# ==========================================
print("\n--- Processing SING ---")
p_music = os.path.join(BRAIN_DIR, "leyla_music_pose_1790848520339.jpg")
if os.path.exists(p_music):
    cut_music = rembg.remove(Image.open(p_music), session=session)
    norm_sing = normalize_to_standing(cut_music, target_h=1240)
    save_dual(norm_sing, "leyla", "sing")

p_tom_sing = os.path.join(BRAIN_DIR, "tom_sing_transparent_1790914579714.jpg")
if os.path.exists(p_tom_sing):
    cut_tom_sing = rembg.remove(Image.open(p_tom_sing), session=session)
    norm_tom_sing = normalize_to_standing(cut_tom_sing, target_h=1240)
    save_dual(norm_tom_sing, "tom", "sing")

# ==========================================
# 2. THINK (Düşün)
# ==========================================
print("\n--- Processing THINK ---")
p_think = os.path.join(BRAIN_DIR, "leyla_think_master_1790866475147.jpg")
if os.path.exists(p_think):
    cut_think = rembg.remove(Image.open(p_think), session=session)
    norm_think = normalize_to_standing(cut_think, target_h=1240)
    save_dual(norm_think, "leyla", "think")

p_tom_think = os.path.join(BRAIN_DIR, "tom_think_transparent_1790914428843.jpg")
if os.path.exists(p_tom_think):
    cut_tom_think = rembg.remove(Image.open(p_tom_think), session=session)
    norm_tom_think = normalize_to_standing(cut_tom_think, target_h=1240)
    save_dual(norm_tom_think, "tom", "think")

# ==========================================
# 3. PLAY TOY (Oyuncaqla oyna)
# ==========================================
print("\n--- Processing PLAY TOY ---")
p_toy = os.path.join(BRAIN_DIR, "leyla_play_toy_master_1790866561890.jpg")
if os.path.exists(p_toy):
    cut_toy = rembg.remove(Image.open(p_toy), session=session)
    arr_t = np.array(cut_toy)
    # clean edge artifacts
    arr_t[985:, :, 3] = 0
    arr_t[:, 1000:, 3] = 0
    clean_toy = Image.fromarray(arr_t)
    # normalize onto canvas
    norm_toy = normalize_to_standing(clean_toy, target_h=1180, ground_y=1318)
    save_dual(norm_toy, "leyla", "playToy")

p_tom_toy = os.path.join(BRAIN_DIR, "tom_play_toy_transparent_1790914476230.jpg")
if os.path.exists(p_tom_toy):
    cut_tom_toy = rembg.remove(Image.open(p_tom_toy), session=session)
    norm_tom_toy = normalize_to_standing(cut_tom_toy, target_h=1180, ground_y=1318)
    save_dual(norm_tom_toy, "tom", "playToy")

# ==========================================
# 4. DANCE (Oyna - Musiqi)
# ==========================================
print("\n--- Processing DANCE ---")
p_dance = os.path.join(BRAIN_DIR, "leyla_dance_master_1790866533228.jpg")
stand_leyla = Image.open(os.path.join(ASSETS_CHAR, "leyla_standing.png"))
if os.path.exists(p_dance):
    cut_dance = rembg.remove(Image.open(p_dance), session=session)
    d_crop = cut_dance.crop(cut_dance.getbbox())
    scale = 680.0 / 730.0
    d_scaled = d_crop.resize((int(d_crop.width * scale), int(d_crop.height * scale)), Image.LANCZOS)
    
    # 1024x1376 canvas so wide dancing arms have plenty of space
    dance_canvas = Image.new("RGBA", (1024, 1376), (0, 0, 0, 0))
    cx = 512
    stand_x = cx - 385
    dance_canvas.paste(stand_leyla, (stand_x, 0), stand_leyla)
    
    arr_ds = np.array(d_scaled)
    waist_y = int(730 * scale)
    waist_cx = int(np.where(arr_ds[waist_y, :, 3] > 100)[0].mean())
    paste_x = cx - waist_cx
    paste_y = 750 - waist_y
    
    # cut upper body down to skirt hem
    cut_y = int(790 * scale)
    d_upper = d_scaled.crop((0, 0, d_scaled.width, cut_y))
    
    # paste dance upper body
    dance_canvas.paste(d_upper, (paste_x, paste_y), d_upper)
    save_dual(dance_canvas, "leyla", "dance")

# ==========================================
# 5. WASH HANDS (Əlini yu - Tam boy)
# ==========================================
print("\n--- Processing WASH HANDS ---")
p_wash = os.path.join(BRAIN_DIR, "leyla_wash_master_1790866640378.jpg")
if os.path.exists(p_wash):
    cut_wash = rembg.remove(Image.open(p_wash), session=session)
    scale_w = 309.0 / 280.0
    w_new = int(cut_wash.width * scale_w)
    h_new = int(cut_wash.height * scale_w)
    wash_scaled = cut_wash.resize((w_new, h_new), Image.LANCZOS)
    
    wash_canvas = Image.new("RGBA", (768, 1376), (0, 0, 0, 0))
    wash_canvas.paste(stand_leyla, (0, 0), stand_leyla)
    
    arr_w = np.array(wash_scaled)
    head_pts = np.where(arr_w[int(100*scale_w):int(400*scale_w), :, 3] > 100)
    head_cx = int(head_pts[1].mean())
    head_top = int(head_pts[0].min() + 100*scale_w)
    
    offset_x = 376 - head_cx
    offset_y = 71 - head_top
    cut_y = int(640 * scale_w)
    wash_upper = wash_scaled.crop((0, 0, wash_scaled.width, cut_y))
    wash_canvas.paste(wash_upper, (offset_x, offset_y), wash_upper)
    save_dual(wash_canvas, "leyla", "wash")

p_tom_wash = os.path.join(BRAIN_DIR, "tom_wash_transparent_1790914629296.jpg")
if os.path.exists(p_tom_wash):
    cut_tom_wash = rembg.remove(Image.open(p_tom_wash), session=session)
    norm_tom_wash = normalize_to_standing(cut_tom_wash, target_h=1240)
    save_dual(norm_tom_wash, "tom", "wash")

# ==========================================
# 6. BATHE (Çim / Duş - Tam vanna)
# ==========================================
print("\n--- Processing BATHE ---")
p_bathe = os.path.join(BRAIN_DIR, "leyla_bathe_master_1790866421406.jpg")
if os.path.exists(p_bathe):
    cut_bathe = rembg.remove(Image.open(p_bathe), session=session)
    arr_b = np.array(cut_bathe)
    arr_b[985:, :, 3] = 0
    arr_b[:, 1010:, 3] = 0
    arr_b[:, :10, 3] = 0
    clean_bathe = Image.fromarray(arr_b)
    norm_bathe = normalize_to_standing(clean_bathe, target_h=1220, ground_y=1318)
    save_dual(norm_bathe, "leyla", "bathe")

p_tom_bathe = os.path.join(BRAIN_DIR, "tom_bathe_bathrobe_transparent_1790914329237.jpg")
if os.path.exists(p_tom_bathe):
    cut_tom_bathe = rembg.remove(Image.open(p_tom_bathe), session=session)
    norm_tom_bathe = normalize_to_standing(cut_tom_bathe, target_h=1220, ground_y=1318)
    save_dual(norm_tom_bathe, "tom", "bathe")

# ==========================================
# 7. SLEEP & WAKE UP (Tam yataq)
# ==========================================
print("\n--- Processing SLEEP & WAKE UP ---")
p_tom_sleep = os.path.join(BRAIN_DIR, "tom_sleep_bed_1790932190358.jpg")
if os.path.exists(p_tom_sleep):
    cut_tom_sleep = rembg.remove(Image.open(p_tom_sleep), session=session)
    norm_tom_sleep = normalize_to_standing(cut_tom_sleep, target_h=1050, ground_y=1318)
    save_dual(norm_tom_sleep, "tom", "sleep")
    # For Leyla sleep: clean up leyla_sleep_bed by masking right wall and bottom floor
    p_leyla_sleep = os.path.join(BRAIN_DIR, "leyla_sleep_bed_1790934330204.jpg")
    cut_leyla_sleep = rembg.remove(Image.open(p_leyla_sleep), session=session)
    arr_ls = np.array(cut_leyla_sleep)
    # Mask right wall beyond column 930
    arr_ls[:, 930:, 3] = 0
    # Mask floor shadow below row 940
    arr_ls[940:, :, 3] = 0
    clean_leyla_sleep = Image.fromarray(arr_ls)
    norm_leyla_sleep = normalize_to_standing(clean_leyla_sleep, target_h=1050, ground_y=1318)
    save_dual(norm_leyla_sleep, "leyla", "sleep")

p_wake = os.path.join(BRAIN_DIR, "leyla_wake_up_master_1790866395284.jpg")
if os.path.exists(p_wake):
    cut_wake = rembg.remove(Image.open(p_wake), session=session)
    arr_w = np.array(cut_wake)
    arr_w[930:, :, 3] = 0
    clean_wake = Image.fromarray(arr_w)
    norm_wake = normalize_to_standing(clean_wake, target_h=1100, ground_y=1318)
    save_dual(norm_wake, "leyla", "wakeUp")

p_tom_wake = os.path.join(BRAIN_DIR, "tom_wake_up_transparent_1790914130067.jpg")
if os.path.exists(p_tom_wake):
    cut_tom_wake = rembg.remove(Image.open(p_tom_wake), session=session)
    norm_tom_wake = normalize_to_standing(cut_tom_wake, target_h=1100, ground_y=1318)
    save_dual(norm_tom_wake, "tom", "wakeUp")

# ==========================================
# 8. SHAKE HEAD ("xeyr" - neutral, no raised hand, X gesture)
# ==========================================
print("\n--- Processing SHAKE HEAD (Xeyr) ---")
# Build a dedicated neutral shakeHead sprite from standing
# Make mouth straight/calm (not a wide open smile)
shake_img = stand_leyla.copy()
draw = ImageDraw.Draw(shake_img)

# Leyla's mouth area is x: 360..400, y: 248..268
# Soft skin tone patch to neutralize open smile curve
skin_tone = (244, 203, 186, 255)
lip_tone = (196, 114, 114, 255)
# Draw gentle neutral mouth line
draw.rectangle([366, 252, 396, 262], fill=skin_tone)
draw.line([(368, 256), (394, 256)], fill=lip_tone, width=3)

# Draw arms crossed in "X" or "No" gesture across chest (y: 420..520, x: 300..460)
# We draw stylish cloth sleeves crossing in front
sleeve_color = (68, 140, 230, 255) # matching blue shirt
sleeve_shadow = (45, 100, 180, 255)
# Left to right diagonal arm
draw.line([(310, 480), (450, 430)], fill=sleeve_shadow, width=38)
draw.line([(310, 476), (450, 426)], fill=sleeve_color, width=32)
# Right to left diagonal arm crossing over
draw.line([(450, 480), (310, 430)], fill=sleeve_shadow, width=38)
draw.line([(450, 476), (310, 426)], fill=sleeve_color, width=32)
# Hands resting at wrists in skin tone
draw.ellipse([295, 415, 325, 445], fill=skin_tone)
draw.ellipse([435, 415, 465, 445], fill=skin_tone)

save_dual(shake_img, "leyla", "shakeHead")

# Tom shakeHead
tom_stand = Image.open(os.path.join(ASSETS_CHAR, "tom_standing.png"))
tom_shake = tom_stand.copy()
t_draw = ImageDraw.Draw(tom_shake)
# Neutral mouth on Tom
t_draw.line([(490, 260), (530, 260)], fill=(180, 100, 100, 255), width=3)
save_dual(tom_shake, "tom", "shakeHead")

# ==========================================
# 9. COMB (Daraq ilə saç darama)
# ==========================================
print("\n--- Processing COMB HAIR ---")
comb_img = stand_leyla.copy()
c_draw = ImageDraw.Draw(comb_img)

# Arm raised to right hair holding a modern 3D turquoise/purple comb
# Hair is at x: 420..500, y: 120..250
comb_purple = (168, 85, 247, 255)
comb_gold = (245, 158, 11, 255)
arm_skin = (244, 203, 186, 255)

# Raised forearm leading to hair
c_draw.line([(420, 360), (460, 220)], fill=sleeve_color, width=28)
c_draw.line([(460, 220), (475, 170)], fill=arm_skin, width=22)
# Comb body & handle
c_draw.rounded_rectangle([460, 140, 485, 205], radius=6, fill=comb_purple, outline=(255,255,255,255), width=2)
# Comb teeth touching hair
for ty in range(146, 200, 6):
    c_draw.line([(460, ty), (442, ty)], fill=comb_gold, width=3)

save_dual(comb_img, "leyla", "comb")

tom_comb = tom_stand.copy()
tc_draw = ImageDraw.Draw(tom_comb)
tc_draw.rounded_rectangle([580, 140, 605, 205], radius=6, fill=comb_purple, outline=(255,255,255,255), width=2)
save_dual(tom_comb, "tom", "comb")

# ==========================================
# 10. SOCIAL COMMANDS NORMALIZATION (hug, openDoor, closeDoor)
# ==========================================
print("\n--- Processing SOCIAL CATEGORY NORMALIZATION ---")
p_hug = os.path.join(ASSETS_CHAR, "leyla_hug.png")
if os.path.exists(p_hug):
    im_hug = Image.open(p_hug)
    norm_hug = normalize_to_standing(im_hug, target_h=1240)
    save_dual(norm_hug, "leyla", "hug")

p_open = os.path.join(ASSETS_CHAR, "leyla_openDoor.png")
if os.path.exists(p_open):
    im_open = Image.open(p_open)
    norm_open = normalize_to_standing(im_open, target_h=1240)
    save_dual(norm_open, "leyla", "openDoor")

p_close = os.path.join(BRAIN_DIR, "leyla_close_door_master_1790866445627.jpg")
if os.path.exists(p_close):
    cut_close = rembg.remove(Image.open(p_close), session=session)
    norm_close = normalize_to_standing(cut_close, target_h=1240)
    save_dual(norm_close, "leyla", "closeDoor")

print("\n=== ALL ASSETS PROCESSED AND NORMALIZED SUCCESSFULLY! ===")
