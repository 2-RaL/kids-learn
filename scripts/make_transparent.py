#!/usr/bin/env python3
"""
scripts/make_transparent.py
High-performance border floodfill background remover.
Transforms solid white background renders into 100% transparent PNG cutouts.
Preserves white eyes, white teeth, and white clothing details.
"""

import sys
import numpy as np
from PIL import Image
from collections import deque
from scipy.ndimage import binary_dilation

def make_transparent_cutout(src_path: str, dst_path: str, threshold: int = 242):
    img = Image.open(src_path).convert('RGBA')
    data = np.array(img)
    
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    h, w = r.shape
    visited = np.zeros((h, w), dtype=bool)
    
    # Near white condition
    mask = (r >= threshold) & (g >= threshold) & (b >= threshold)
    
    queue = deque()
    # Add border pixels that are white
    for x in range(w):
        if mask[0, x]: queue.append((0, x)); visited[0, x] = True
        if mask[h-1, x]: queue.append((h-1, x)); visited[h-1, x] = True
    for y in range(h):
        if mask[y, 0]: queue.append((y, 0)); visited[y, 0] = True
        if mask[y, w-1]: queue.append((y, w-1)); visited[y, w-1] = True
        
    # Floodfill connected background
    while queue:
        cy, cx = queue.popleft()
        for dy, dx in [(-1,0), (1,0), (0,-1), (0,1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and mask[ny, nx]:
                visited[ny, nx] = True
                queue.append((ny, nx))
                
    alpha = np.where(visited, 0, 255).astype(np.uint8)
    
    # 1-pixel soft boundary anti-aliasing
    dilated = binary_dilation(visited, iterations=1)
    boundary = dilated & (~visited)
    for y, x in zip(*np.where(boundary)):
        brightness = (int(r[y, x]) + int(g[y, x]) + int(b[y, x])) / 3.0
        if brightness > 195:
            alpha[y, x] = int(255 * max(0, min(1, 1 - (brightness - 195) / 60.0)))
            
    data[:,:,3] = alpha
    result = Image.fromarray(data)
    result.save(dst_path, 'PNG')
    print(f"[OK] Saved transparent PNG: {dst_path}")

if __name__ == '__main__':
    if len(sys.argv) > 2:
        make_transparent_cutout(sys.argv[1], sys.argv[2])
    else:
        print("Usage: python make_transparent.py <src_path> <dst_path>")
