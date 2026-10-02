import type { CharacterCommand } from '../types';

/**
 * Manifest of available high-res transparent action cuts in /generated-actions/${prefix}/${command}.png
 */
export const GENERATED_ACTIONS: Record<string, Set<string>> = {
  leyla: new Set([
    'bathe',
    'closeDoor',
    'dance',
    'playToy',
    'rideBike',
    'sing',
    'slide',
    'think',
    'wakeUp',
    'wash',
  ]),
  tom: new Set([
    'bathe',
    'closeDoor',
    'drink',
    'eat',
    'playToy',
    'read',
    'rideBike',
    'sing',
    'slide',
    'think',
    'wakeUp',
    'wash',
  ]),
  amara: new Set([]),
  ali: new Set([]),
};

/**
 * Manifest of existing dedicated sprite images in /assets/characters/${prefix}_${action}.png
 */
export const DEDICATED_SPRITES: Record<string, Set<string>> = {
  leyla: new Set([
    'bathe', 'closeDoor', 'cry', 'dance', 'jump', 'jumping', 'laugh',
    'playInstrument', 'playToy', 'rideBike', 'run', 'running', 'sing',
    'sit', 'sitting', 'slide', 'stand', 'standing', 'think', 'wakeUp',
    'wash', 'wave', 'waving',
  ]),
  amara: new Set([
    'cry', 'jump', 'jumping', 'laugh', 'playInstrument', 'run', 'running',
    'sit', 'sitting', 'stand', 'standing', 'wave', 'waving',
  ]),
  tom: new Set([
    'bathe', 'closeDoor', 'cry', 'drink', 'eat', 'jump', 'jumping',
    'laugh', 'playInstrument', 'playToy', 'read', 'rideBike', 'run',
    'running', 'sing', 'sit', 'sitting', 'slide', 'stand', 'standing',
    'think', 'wakeUp', 'wash', 'wave', 'waving',
  ]),
  ali: new Set([
    'cry', 'jump', 'jumping', 'laugh', 'playInstrument', 'run', 'running',
    'sit', 'sitting', 'stand', 'standing', 'wave', 'waving',
  ]),
};

/**
 * Synchronous, zero-404 sprite path resolver.
 * Ensures the browser never sends failed HTTP requests for non-existent image variants.
 */
export function resolveCharacterSprite(
  prefix: string,
  command: CharacterCommand,
  poseType: string
): string {
  // 1. Check generated actions cutouts
  if (GENERATED_ACTIONS[prefix]?.has(command)) {
    return `/generated-actions/${prefix}/${command}.png`;
  }

  // 2. Check dedicated command action sprite in /assets/characters/
  if (DEDICATED_SPRITES[prefix]?.has(command)) {
    return `/assets/characters/${prefix}_${command}.png`;
  }

  // 3. Check base pose sprite (e.g., sitting, running, jumping, waving)
  if (DEDICATED_SPRITES[prefix]?.has(poseType)) {
    return `/assets/characters/${prefix}_${poseType}.png`;
  }

  // 4. Safe standing fallback
  return `/assets/characters/${prefix}_standing.png`;
}
