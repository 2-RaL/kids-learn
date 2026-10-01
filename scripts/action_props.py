import os
import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

# Canvas dimensions matching base poses
WIDTH = 768
HEIGHT = 1376

def get_base_pose_name(command):
    # Determine which base pose image to load for each command
    if command in ['sit']:
        return 'sitting'
    elif command in ['stand', 'idle']:
        return 'standing'
    elif command in ['run']:
        return 'running'
    elif command in ['jump']:
        return 'jumping'
    elif command in ['wave']:
        return 'waving'
    elif command in ['laugh']:
        return 'laugh'
    elif command in ['cry']:
        return 'cry'
    elif command in ['playInstrument']:
        return 'playInstrument'
    
    # Movement
    elif command in ['walk', 'walkForward', 'walkBackward', 'moveLeft', 'moveRight', 'stop']:
        return 'standing'
    elif command in ['spin']:
        return 'jumping'
    elif command in ['slide']:
        return 'sitting'
    elif command in ['rideBike']:
        return 'running'
    
    # Fun
    elif command in ['surprised']:
        return 'jumping'
    elif command in ['think']:
        return 'standing'
    elif command in ['clap']:
        return 'laugh'
    elif command in ['dance']:
        return 'jumping'
    elif command in ['sing']:
        return 'playInstrument'
    elif command in ['playToy']:
        return 'sitting'
    elif command in ['nod']:
        return 'waving'
    elif command in ['shakeHead']:
        return 'standing'
    
    # Daily
    elif command in ['wakeUp']:
        return 'jumping'
    elif command in ['sleep']:
        return 'sitting'
    elif command in ['eat', 'drink', 'bathe', 'wash', 'comb', 'dress']:
        return 'standing'
    
    # Learning
    elif command in ['read', 'write', 'draw', 'cut', 'build']:
        return 'sitting'
    elif command in ['paint', 'count', 'stretch']:
        return 'standing'
    elif command in ['talk', 'point']:
        return 'waving'
        
    # Social
    elif command in ['hug', 'holdHands']:
        return 'waving'
    elif command in ['help', 'openDoor', 'closeDoor', 'clean', 'scatter', 'waterPlant', 'lightMatch']:
        return 'standing'
    elif command in ['putAway', 'collect']:
        return 'sitting'
    elif command in ['bring', 'takeAway', 'carry', 'pull']:
        return 'running'
        
    return 'standing'

print("Base pose resolver loaded.")
