// src/services/imagePromptEngine.ts
// Professional Dynamic Image Generation Prompt Engine for Gemini AI.
// Follows Sections 1, 2, 4, 5, 6, 7, 8, 10, 15, and 16 of the High-Quality Gemini Image Generation System.

import { CHARACTER_PROFILES, type CharacterVisualProfile } from '../config/characterProfiles';
import { COMMAND_SCENES, type CommandSceneSpec } from '../config/commandScenes';

export const GLOBAL_STYLE_PROMPT = `
Masterpiece frame from a premium modern 3D animated children's blockbuster movie (Pixar / Walt Disney Animation Studios quality).
Professional educational children's illustration with cinematic global illumination, soft realistic ray-traced contact shadows,
volumetric atmosphere, rich subsurface scattering on stylized skin, expressive detailed eyes with multi-layer reflections,
physically accurate cloth and material textures, vibrant harmonious palette, polished 3D CGI character design.
`.trim();

export const QUALITY_PROMPT = `
Highest production value 3D render, pristine clean composition, 8k resolution, razor sharp details on face and hands,
masterful color grading, child-friendly, warm, playful, inviting, visually crystal clear for young children.
`.trim();

export const NEGATIVE_CONSTRAINTS = `
ABSOLUTELY AVOID AND EXCLUDE:
flat 2D illustration, crude vector art, clip-art, amateur drawing, extra fingers, missing fingers, fused digits,
malformed hands, distorted face, asymmetrical eyes, changed character identity, random text, gibberish letters,
watermarks, UI cards, rectangular banners, website interface, buttons, floating emojis, clip-on stickers,
blurry faces, messy limbs, intersecting geometry, floating characters without shadows, muddy low-detail backgrounds,
excessive bloom, oversaturation, cheap cartoon render.
`.trim();

export interface CompiledPrompt {
  characterId: string;
  command: string;
  referenceImagePath: string;
  portraitReferencePath: string;
  fullPrompt: string;
  targetFilename: string;
  actionDirectoryPath: string;
  qualityReviewPrompt: string;
}

export function compileGeminiPrompt(characterId: string, command: string): CompiledPrompt {
  const profile: CharacterVisualProfile = CHARACTER_PROFILES[characterId] || CHARACTER_PROFILES['girl-1'];
  const scene: CommandSceneSpec = COMMAND_SCENES[command] || COMMAND_SCENES['stand'];

  // Check if scene allows specific outfit
  let outfitDesc = profile.defaultClothes;
  if (command === 'wakeUp' || command === 'sleep') {
    outfitDesc = profile.allowedOutfits.sleep;
  } else if (command === 'bathe') {
    outfitDesc = profile.allowedOutfits.bathe;
  } else if (command === 'paint') {
    outfitDesc = profile.allowedOutfits.paint;
  } else if (command === 'rideBike') {
    outfitDesc = profile.allowedOutfits.rideBike;
  }

  const characterPromptSection = `
PRIMARY CHARACTER IDENTITY TO PRESERVE (CRITICAL LOCK):
The character is ${profile.name} (${profile.age}, ${profile.gender}).
Face: ${profile.faceDescription}.
Hair: ${profile.hair}.
Eyes: ${profile.eyes}.
Skin: ${profile.skin}.
Proportions: ${profile.bodyProportions}.
Clothing: ${outfitDesc}.
Footwear: ${profile.shoeStyle}.
Do NOT change the face, hairstyle, facial proportions, skin tone, or identity.
The generated character MUST match the visual reference image provided in the ImagePaths.
`.trim();

  const scenePromptSection = `
ACTION & ENVIRONMENT SPECIFICATION:
Environment: ${scene.environment}.
Action: ${scene.scenePrompt}
Camera & Framing: ${scene.cameraPrompt}.
Lighting & Atmosphere: ${scene.lightingPrompt}.
`.trim();

  const fullPrompt = [
    GLOBAL_STYLE_PROMPT,
    characterPromptSection,
    scenePromptSection,
    QUALITY_PROMPT,
    NEGATIVE_CONSTRAINTS,
  ].join('\n\n');

  const qualityReviewPrompt = `
Inspect this image as a senior 3D art director.
Check:
1. character identity preserved (${profile.name}: hair, skin, face)?
2. requested action executed accurately (${command})?
3. anatomy correct (proportions, head, limbs)?
4. hands correct (5 digits each, natural grip, no extra fingers)?
5. feet & shoes correct?
6. facial consistency and natural expression?
7. composition (centered, 55-70% height, clear framing)?
8. environment relevance (${scene.environment})?
9. object geometry (clean props, no weird intersecting meshes)?
10. image sharpness (crisp focus, no blur on subject)?
11. unwanted text (NO random gibberish or labels)?
12. unwanted UI (NO web buttons, floating panels, or smilies)?
13. child safety (wholesome, appropriate)?
14. professional visual quality (Pixar blockbuster standard)?

Return JSON:
{
  "identity": 0-100,
  "actionAccuracy": 0-100,
  "anatomy": 0-100,
  "composition": 0-100,
  "quality": 0-100,
  "problems": [],
  "regenerate": true/false
}
`.trim();

  return {
    characterId,
    command,
    referenceImagePath: profile.primaryReferencePath,
    portraitReferencePath: profile.portraitReferencePath,
    fullPrompt,
    targetFilename: scene.filename,
    actionDirectoryPath: `public/generated-actions/${profile.prefix}/${command}.png`,
    qualityReviewPrompt,
  };
}
