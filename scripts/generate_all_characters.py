import os
import shutil
from PIL import Image
from action_props import get_base_pose_name
from props_factory import create_props

CHARACTERS = ['leyla', 'amara', 'mei', 'zara', 'tom', 'leo', 'ali', 'murad']
OUTPUT_DIR = os.path.join('public', 'assets', 'characters')

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

print(f"Generating sprites for {len(CHARACTERS)} characters x {len(COMMANDS)} commands = {len(CHARACTERS) * len(COMMANDS)} total sprites...")

for char in CHARACTERS:
    print(f"\n--- Processing Character: {char.upper()} ---")
    for cmd in COMMANDS:
        dest_path = os.path.join(OUTPUT_DIR, f"{char}_{cmd}.png")
        
        # Check if exact pose already exists natively
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
            if os.path.exists(src_path) and src_path != dest_path:
                shutil.copyfile(src_path, dest_path)
                continue
            elif os.path.exists(dest_path):
                continue
                
        # For other commands, load matching base pose and composite props
        base_pose = get_base_pose_name(cmd)
        base_path = os.path.join(OUTPUT_DIR, f"{char}_{base_pose}.png")
        if not os.path.exists(base_path):
            base_path = os.path.join(OUTPUT_DIR, f"{char}_standing.png")
            
        base_img = Image.open(base_path).convert('RGBA')
        w, h = base_img.size
        
        bg_prop, fg_prop = create_props(cmd, w, h)
        
        # Composite: background prop -> character -> foreground prop
        comp = Image.alpha_composite(bg_prop, base_img)
        comp = Image.alpha_composite(comp, fg_prop)
        
        # Quantize to 256 colors FASTOCTREE for great quality + small size (~120-150KB)
        q_img = comp.quantize(colors=256, method=Image.Quantize.FASTOCTREE)
        q_img.save(dest_path, optimize=True)

print("\nSUCCESS: All characters and commands generated successfully!")
