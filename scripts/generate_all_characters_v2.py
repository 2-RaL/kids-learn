import os
import shutil
import sys
from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
from realistic_scenes import CHAR_COLORS
import realistic_renderers as rr
from action_props import get_base_pose_name
from props_factory import create_props

CHARACTERS = ['leyla', 'amara', 'mei', 'zara', 'tom', 'leo', 'ali', 'murad']
OUTPUT_DIR = os.path.join('public', 'assets', 'characters')

SPECIAL_COMMANDS = {
    'think': rr.render_think,
    'dance': rr.render_dance,
    'sing': rr.render_sing,
    'playToy': rr.render_playtoy,
    'walk': rr.render_walk,
    'walkForward': rr.render_walk,
    'walkBackward': rr.render_walk,
    'moveLeft': rr.render_walk,
    'moveRight': rr.render_walk,
    'slide': rr.render_slide,
    'rideBike': rr.render_ridebike,
    'wakeUp': rr.render_wakeup,
    'bathe': rr.render_bathe,
    'wash': rr.render_wash,
    'comb': rr.render_comb,
    'eat': rr.render_eat,
    'drink': rr.render_drink,
    'dress': rr.render_dress,
}

COMMANDS = [
    # Hərəkətlər (13)
    'sit', 'stand', 'run', 'jump', 'stop', 'walk', 'walkForward', 'walkBackward', 'moveLeft', 'moveRight', 'spin', 'slide', 'rideBike',
    # Əyləncə & Emosiyalar (12)
    'laugh', 'cry', 'surprised', 'think', 'wave', 'clap', 'dance', 'sing', 'playInstrument', 'playToy', 'nod', 'shakeHead',
    # Gündəlik qulluq (8)
    'wakeUp', 'sleep', 'eat', 'drink', 'bathe', 'wash', 'comb', 'dress',
    # Öyrənmə & Yaradıcılıq (10)
    'read', 'write', 'draw', 'paint', 'cut', 'count', 'talk', 'build', 'point', 'stretch',
    # Sosial & Fəaliyyətlər (15)
    'hug', 'holdHands', 'help', 'openDoor', 'closeDoor', 'putAway', 'collect', 'clean', 'bring', 'takeAway', 'carry', 'pull', 'scatter', 'waterPlant', 'lightMatch'
]

print(f"Starting V2 Realistic Generation for {len(CHARACTERS)} characters x {len(COMMANDS)} commands = {len(CHARACTERS) * len(COMMANDS)} total sprites...")

for char in CHARACTERS:
    print(f"\nProcessing {char.upper()}...")
    for cmd in COMMANDS:
        dest_path = os.path.join(OUTPUT_DIR, f"{char}_{cmd}.png")
        
        # 1. Native core poses (laugh, cry, playInstrument, jump, run, sit, stand, wave)
        if cmd in ['laugh', 'cry', 'playInstrument', 'jump', 'run', 'sit', 'stand', 'wave']:
            source_name = f"{char}_{cmd}.png"
            if cmd == 'stand':
                source_name = f"{char}_standing.png"
            elif cmd == 'sit':
                source_name = f"{char}_sitting.png"
            elif cmd == 'run':
                source_name = f"{char}_running.png"
            elif cmd == 'jump':
                source_name = f"{char}_jumping.png"
            elif cmd == 'wave':
                source_name = f"{char}_waving.png"
                
            src_path = os.path.join(OUTPUT_DIR, source_name)
            if os.path.exists(src_path):
                img = Image.open(src_path).convert('RGBA')
                # Quantize FASTOCTREE transparent PNG
                q = img.quantize(colors=256, method=Image.Quantize.FASTOCTREE)
                q.save(dest_path, optimize=True)
                continue
                
        # 2. Special user-requested detailed scenes
        if cmd in SPECIAL_COMMANDS:
            base_pose = get_base_pose_name(cmd)
            base_path = os.path.join(OUTPUT_DIR, f"{char}_{base_pose}.png")
            if not os.path.exists(base_path):
                base_path = os.path.join(OUTPUT_DIR, f"{char}_standing.png")
            base_img = Image.open(base_path).convert('RGBA')
            
            # Call custom realistic renderer
            rendered = SPECIAL_COMMANDS[cmd](base_img, char)
            q = rendered.quantize(colors=256, method=Image.Quantize.FASTOCTREE)
            q.save(dest_path, optimize=True)
            continue
            
        # 3. Other actions (clean, read, write, draw, paint, cut, sleep, waterPlant, etc.)
        base_pose = get_base_pose_name(cmd)
        base_path = os.path.join(OUTPUT_DIR, f"{char}_{base_pose}.png")
        if not os.path.exists(base_path):
            base_path = os.path.join(OUTPUT_DIR, f"{char}_standing.png")
        base_img = Image.open(base_path).convert('RGBA')
        w, h = base_img.size
        
        bg_prop, fg_prop = create_props(cmd, w, h)
        comp = Image.alpha_composite(bg_prop, base_img)
        comp = Image.alpha_composite(comp, fg_prop)
        
        q = comp.quantize(colors=256, method=Image.Quantize.FASTOCTREE)
        q.save(dest_path, optimize=True)

print("\nV2 REALISTIC SCENE GENERATION COMPLETE FOR ALL CHARACTERS!")
