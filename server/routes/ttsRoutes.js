import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { execFile } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const CACHE_DIR = path.resolve(__dirname, '..', '..', 'public', 'assets', 'audio', 'cache');

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Supported high-quality Microsoft Neural studio voices
const VOICE_MAP = {
  'banu': 'az-AZ-BanuNeural',
  'az-AZ-BanuNeural': 'az-AZ-BanuNeural',
  'babek': 'az-AZ-BabekNeural',
  'az-AZ-BabekNeural': 'az-AZ-BabekNeural',
  'ana': 'en-US-AnaNeural',
  'en-US-AnaNeural': 'en-US-AnaNeural',
  'svetlana': 'ru-RU-SvetlanaNeural',
  'ru-RU-SvetlanaNeural': 'ru-RU-SvetlanaNeural',
  'dmitry': 'ru-RU-DmitryNeural',
  'ru-RU-DmitryNeural': 'ru-RU-DmitryNeural'
};

// GET /api/tts?text=...&voice=...
router.get('/', (req, res) => {
  const text = (req.query.text || '').toString().trim();
  const voiceKey = (req.query.voice || 'banu').toString().trim();
  const voice = VOICE_MAP[voiceKey] || VOICE_MAP.banu;

  if (!text) {
    return res.status(400).json({ error: 'Text parameter is required' });
  }

  // Truncate to safe length if needed
  const safeText = text.slice(0, 1000);

  // Deterministic cache key based on voice and text content
  const hash = crypto.createHash('md5').update(`${voice}_${safeText}`).digest('hex');
  const filePath = path.join(CACHE_DIR, `${hash}.mp3`);

  // Fast cache hit
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    return res.sendFile(filePath);
  }

  // Generate on-demand via edge-tts
  const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
  const args = [
    '-m',
    'edge_tts',
    '--voice', voice,
    '--rate', '-4%',
    '--text', safeText,
    '--write-media', filePath
  ];

  execFile(pythonCmd, args, { timeout: 15000 }, (error, _stdout, stderr) => {
    if (error || !fs.existsSync(filePath)) {
      console.error('Edge-tts generation error:', error?.message || stderr);
      return res.status(500).json({ error: 'TTS generation failed' });
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    return res.sendFile(filePath);
  });
});

export default router;
