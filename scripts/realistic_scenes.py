import math
from PIL import Image, ImageDraw, ImageFilter

def hex_to_rgba(hex_str, alpha=255):
    hex_str = hex_str.lstrip('#')
    if len(hex_str) == 6:
        r = int(hex_str[0:2], 16)
        g = int(hex_str[2:4], 16)
        b = int(hex_str[4:6], 16)
        return (r, g, b, alpha)
    return (255, 255, 255, alpha)

CHAR_COLORS = {
    'leyla': {'skin': '#FDDBB4', 'hair': '#4A2B0A', 'outfit': '#EC4899', 'gender': 'girl'},
    'amara': {'skin': '#8D5524', 'hair': '#1A0A00', 'outfit': '#FCD34D', 'gender': 'girl'},
    'mei':   {'skin': '#FDDBB4', 'hair': '#1A1A1A', 'outfit': '#EF4444', 'gender': 'girl'},
    'zara':  {'skin': '#FDDBB4', 'hair': '#2C1A0E', 'outfit': '#A855F7', 'gender': 'girl'},
    'tom':   {'skin': '#A66A44', 'hair': '#1A1A1A', 'outfit': '#2563EB', 'gender': 'boy'},
    'leo':   {'skin': '#FDDBB4', 'hair': '#4A2B0A', 'outfit': '#16A34A', 'gender': 'boy'},
    'ali':   {'skin': '#D99B65', 'hair': '#1A1A1A', 'outfit': '#E11D48', 'gender': 'boy'},
    'murad': {'skin': '#E8B88A', 'hair': '#382212', 'outfit': '#EAB308', 'gender': 'boy'},
}

def draw_feathered_star(d, cx, cy, r_out, r_in, fill):
    coords = []
    for i in range(10):
        r = r_out if i % 2 == 0 else r_in
        a = -math.pi/2 + i * (math.pi / 5)
        coords.append((cx + int(math.cos(a) * r), cy + int(math.sin(a) * r)))
    d.polygon(coords, fill=fill)

print("Helper loaded.")
