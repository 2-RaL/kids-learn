import os

CHARS_DIR = os.path.join('public', 'assets', 'characters')
BASE_POSES = ['standing', 'sitting', 'running', 'jumping', 'waving', 'laugh', 'cry', 'playInstrument']
CHARACTERS = ['leyla', 'amara', 'mei', 'zara', 'tom', 'leo', 'ali', 'murad']

keep_files = set()
for c in CHARACTERS:
    for p in BASE_POSES:
        keep_files.add(f"{c}_{p}.png")

all_files = os.listdir(CHARS_DIR)
deleted_count = 0

for f in all_files:
    if f.endswith('.png') and f not in keep_files:
        fp = os.path.join(CHARS_DIR, f)
        os.remove(fp)
        deleted_count += 1

print(f"Removed {deleted_count} artificial drawing files. Only pristine 3D Pixar poses remain ({len(keep_files)} files).")
