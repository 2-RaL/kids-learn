# scripts/write_data_to_src.py
# Writes the expanded modules and translations directly to src/data/

import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRATCH = os.path.join(ROOT, 'scratch')
SRC_DATA = os.path.join(ROOT, 'src', 'data')

modules_path = os.path.join(SCRATCH, 'expanded_modules.json')
translations_path = os.path.join(SCRATCH, 'expanded_translations.json')

with open(modules_path, 'r', encoding='utf-8') as f:
    modules = json.load(f)

with open(translations_path, 'r', encoding='utf-8') as f:
    translations = json.load(f)

print(f"Loaded {len(modules)} modules and {len(translations)} translations.")

# --- 1. Write src/data/learningModulesData.ts ---
header_modules = '''export interface VisualScene {
  type: 'spatial' | 'math' | 'concept' | 'count' | 'tracing' | 'comparison' | 'traffic';
  containerEmoji?: string;
  itemEmoji?: string;
  position?: 'on' | 'under' | 'in' | 'beside';
  startEmoji?: string;
  targetEmoji?: string;
  pathType?: 'straight' | 'zigzag' | 'wave' | 'loop';
  leftItem?: {
    emoji: string;
    labelAz: string;
    labelEn?: string;
    labelRu?: string;
    size?: 'huge' | 'large' | 'medium' | 'small' | 'tiny';
  };
  rightItem?: {
    emoji: string;
    labelAz: string;
    labelEn?: string;
    labelRu?: string;
    size?: 'huge' | 'large' | 'medium' | 'small' | 'tiny';
  };
  activeLight?: 'red' | 'yellow' | 'green';
  mathFormula?: {
    leftCount: number;
    leftEmoji: string;
    operator: '+' | '-';
    rightCount: number;
    rightEmoji: string;
    resultCount?: number;
    resultEmoji?: string;
  };
  customEmojis?: string[];
  captionAz?: string;
  captionEn?: string;
  captionRu?: string;
}

export interface LearningLesson {
  id: string;
  conceptTitleAz: string;
  conceptTitleEn?: string;
  conceptTitleRu?: string;
  explanationAz: string;
  explanationEn?: string;
  explanationRu?: string;
  bigEmojis: string[];
  visualScene?: VisualScene;
  audioTextAz?: string;
  audioTextEn?: string;
  audioTextRu?: string;
}

export interface LearningActivityItem {
  id: string;
  title: string;
  titleEn?: string;
  titleRu?: string;
  lesson?: LearningLesson;
  visualScene?: VisualScene;
  instruction: string;
  instructionEn?: string;
  instructionRu?: string;
  type: 'select' | 'match' | 'sequence' | 'sentence' | 'command' | 'audio-identify' | 'tracing' | 'flashcard';
  question?: string;
  questionEn?: string;
  questionRu?: string;
  targetAudioText?: string;
  targetAudioTextEn?: string;
  targetAudioTextRu?: string;
  options?: Array<{
    id: string;
    text: string;
    textEn?: string;
    textRu?: string;
    emoji?: string;
    isCorrect?: boolean;
    soundUrl?: string;
  }>;
  sequenceSteps?: Array<{
    id: string;
    text: string;
    textEn?: string;
    textRu?: string;
    order: number;
    emoji: string;
  }>;
  sentenceWords?: string[];
  sentenceWordsEn?: string[];
  sentenceWordsRu?: string[];
  correctSentence?: string;
  correctSentenceEn?: string;
  correctSentenceRu?: string;
  explanation?: string;
  explanationEn?: string;
  explanationRu?: string;
}

export interface LearningModuleCategory {
  id: string;
  slug: string;
  titleAz: string;
  titleEn: string;
  titleRu: string;
  descriptionAz: string;
  emoji: string;
  group: 'foundations' | 'commands' | 'speech' | 'social' | 'cognitive';
  minAge: number;
  maxAge: number;
  color: string;
  badge?: string;
  activities: LearningActivityItem[];
}

export const LEARNING_GROUPS = [
  { id: 'all', labelAz: 'Hamısı', labelEn: 'All', labelRu: 'Все', emoji: '🌟' },
  { id: 'foundations', labelAz: 'Əsas Anlayışlar', labelEn: 'Foundations', labelRu: 'Основы', emoji: '🎨' },
  { id: 'commands', labelAz: 'Komandalar & Məkan', labelEn: 'Commands & Space', labelRu: 'Команды и Пространство', emoji: '🧭' },
  { id: 'speech', labelAz: 'Nitq və Dil', labelEn: 'Speech & Language', labelRu: 'Речь и Язык', emoji: '🗣️' },
  { id: 'social', labelAz: 'Emosiyalar & Sosial', labelEn: 'Emotions & Social', labelRu: 'Эмоции и Социум', emoji: '🤝' },
  { id: 'cognitive', labelAz: 'Koqnitiv & Motorika', labelEn: 'Cognitive & Motor', labelRu: 'Когнитивные и Моторика', emoji: '🧠' },
] as const;

export const LEARNING_MODULES: LearningModuleCategory[] = '''

modules_json = json.dumps(modules, ensure_ascii=False, indent=2)

with open(os.path.join(SRC_DATA, 'learningModulesData.ts'), 'w', encoding='utf-8') as f:
    f.write(header_modules)
    f.write(modules_json)
    f.write(';\n')

print("Wrote src/data/learningModulesData.ts")

# --- 2. Write src/data/learningTranslations.ts ---
# Extract existing UI_TRANSLATIONS from original file
orig_translations_file = os.path.join(SRC_DATA, 'learningTranslations.ts')
with open(orig_translations_file, 'r', encoding='utf-8') as f:
    orig_content = f.read()

ui_match = re.search(r'export const UI_TRANSLATIONS = .*?;?\s*$', orig_content, flags=re.DOTALL)
if not ui_match:
    raise ValueError("Could not find UI_TRANSLATIONS in original file!")

ui_translations_block = ui_match.group(0).strip()
if not ui_translations_block.endswith(';'):
    ui_translations_block += ';'

header_trans = '''// src/data/learningTranslations.ts
// Comprehensive trilingual translation map (AZ, EN, RU) for all learning activities and UI.

export interface LocalizedActivityData {
  question: { az: string; en: string; ru: string };
  instruction?: { az: string; en: string; ru: string };
  options?: Record<string, { en: string; ru: string }>;
  explanation?: { az: string; en: string; ru: string };
}

export const ACTIVITY_TRANSLATIONS: Record<string, LocalizedActivityData> = '''

trans_json = json.dumps(translations, ensure_ascii=False, indent=2)

with open(os.path.join(SRC_DATA, 'learningTranslations.ts'), 'w', encoding='utf-8') as f:
    f.write(header_trans)
    f.write(trans_json)
    f.write(';\n\n')
    f.write(ui_translations_block)
    f.write('\n')

print("Wrote src/data/learningTranslations.ts")
