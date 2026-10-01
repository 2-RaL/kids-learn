import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const CACHE_DIR = path.resolve(__dirname, '..', '..', 'public', 'assets', 'audio', 'cache');
const HELPER_SCRIPT = path.resolve(__dirname, '..', '..', 'scripts', 'tts_helper.py');

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Supported studio-grade Microsoft Neural voices
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

function handleTtsRequest(text, voiceKey, res) {
  const voice = VOICE_MAP[voiceKey] || VOICE_MAP.babek;
  const trimmed = (text || '').trim();

  if (!trimmed) {
    return res.status(400).json({ error: 'Text parameter is required' });
  }

  // Safe maximum length per request (1500 chars)
  const safeText = trimmed.slice(0, 1500);

  // Deterministic MD5 cache key
  const hash = crypto.createHash('md5').update(`${voice}_${safeText}`).digest('hex');
  const filePath = path.join(CACHE_DIR, `${hash}.mp3`);

  // Instant cache hit
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 100) {
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    return res.sendFile(filePath);
  }

  // Generate on-demand via tts_helper.py with UTF-8 stdin
  const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
  const child = spawn(
    pythonCmd,
    [HELPER_SCRIPT, '--voice', voice, '--rate', '-4%', '--output', filePath],
    { stdio: ['pipe', 'ignore', 'pipe'] }
  );

  let stderr = '';
  child.stderr.on('data', (d) => {
    stderr += d.toString();
  });

  child.on('error', (err) => {
    console.error('[TTS] Subprocess spawn error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'TTS subprocess error', details: err.message });
    }
  });

  child.on('close', (code) => {
    if (code === 0 && fs.existsSync(filePath) && fs.statSync(filePath).size > 100) {
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
      return res.sendFile(filePath);
    }

    console.error('[TTS] Synthesis failed. Code:', code, 'Stderr:', stderr);
    if (!res.headersSent) {
      res.status(500).json({ error: 'TTS generation failed', code, details: stderr });
    }
  });

  // Write safeText to stdin using UTF-8 Buffer
  child.stdin.write(Buffer.from(safeText, 'utf-8'));
  child.stdin.end();
}

// GET /api/tts?text=...&voice=...
router.get('/', (req, res) => {
  const text = (req.query.text || '').toString();
  const voiceKey = (req.query.voice || 'babek').toString();
  handleTtsRequest(text, voiceKey, res);
});

// POST /api/tts { text: "...", voice: "..." }
router.post('/', (req, res) => {
  const text = (req.body?.text || '').toString();
  const voiceKey = (req.body?.voice || 'babek').toString();
  handleTtsRequest(text, voiceKey, res);
});

export default router;
