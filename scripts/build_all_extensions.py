"""
scripts/build_all_extensions.py
Generates full rich extensions for all 32 modules that need expansion to reach >= 10 activities.
Enforces:
- Every module has >= 10 activities.
- Azerbaijani words strictly use "işıqfor" (never "svetofor").
- Trilingual AZ, EN, RU translations for all activities, options, and lessons.
- Proper VisualScenes for spatial, comparison, safety (traffic), tracing (fine motor).
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRATCH = os.path.join(ROOT, 'scratch')

def sanitize_az(text):
    if not isinstance(text, str):
        return text
    res = re.sub(r'svetofor', 'işıqfor', text, flags=re.IGNORECASE)
    res = re.sub(r'svetafor', 'işıqfor', res, flags=re.IGNORECASE)
    res = re.sub(r'Svetofor', 'İşıqfor', res)
    res = re.sub(r'Svetafor', 'İşıqfor', res)
    return res

def deep_clean(obj):
    if isinstance(obj, dict):
        new_d = {}
        for k, v in obj.items():
            if 'az' in k.lower() or k in ('title', 'instruction', 'question', 'text', 'explanation', 'conceptTitle', 'captionAz'):
                new_d[k] = sanitize_az(v) if isinstance(v, str) else deep_clean(v)
            else:
                new_d[k] = deep_clean(v)
        return new_d
    elif isinstance(obj, list):
        return [deep_clean(item) for item in obj]
    else:
        return obj

# Load current modules
with open(os.path.join(SCRATCH, 'current_modules.json'), 'r', encoding='utf-8') as f:
    modules = json.load(f)

with open(os.path.join(SCRATCH, 'current_translations.json'), 'r', encoding='utf-8') as f:
    translations = json.load(f)

modules = deep_clean(modules)
translations = deep_clean(translations)

print("Base loaded. Ready for extensions definitions.")
