/**
 * scripts/expand_all_modules.ts
 * Expands all 34 learning modules in Kids Move & Learn so that EVERY module has >= 10 activities.
 * Ensures:
 * 1. Azerbaijani word is strictly "işıqfor" (never "svetofor").
 * 2. VisualScene cards for spatial, comparisons, traffic, tracing, math.
 * 3. Atomic lesson clusters so shuffling in LearningActivityPlayer provides a fresh topic start every time.
 * 4. Full trilingual metadata (AZ, EN, RU) in learningModulesData.ts and learningTranslations.ts.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LEARNING_MODULES, LearningModuleCategory, LearningActivityItem } from '../src/data/learningModulesData';
import { ACTIVITY_TRANSLATIONS, LocalizedActivityData } from '../src/data/learningTranslations';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to sanitize any stray "svetofor" into "işıqfor" in Azerbaijani strings
function sanitizeAz(str: string): string {
  if (!str) return str;
  return str
    .replace(/svetofor/gi, (m) => m[0] === m[0].toUpperCase() ? 'İşıqfor' : 'işıqfor')
    .replace(/svetafor/gi, (m) => m[0] === m[0].toUpperCase() ? 'İşıqfor' : 'işıqfor');
}

console.log('Initial modules count:', LEARNING_MODULES.length);
