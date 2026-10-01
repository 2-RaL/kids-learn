import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function localTtsPlugin(): Plugin {
  return {
    name: 'local-tts-dev',
    configureServer(server) {
      server.middlewares.use('/api/tts', (req, res, next) => {
        try {
          const urlObj = new URL(req.url || '', 'http://localhost:3000');
          const text = urlObj.searchParams.get('text') || '';
          const voiceKey = urlObj.searchParams.get('voice') || 'az-AZ-BabekNeural';
          const voice = voiceKey.toLowerCase().includes('banu') ? 'az-AZ-BanuNeural' : 'az-AZ-BabekNeural';

          if (!text.trim()) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Text required' }));
            return;
          }

          const safeText = text.trim().slice(0, 1500);
          const hash = crypto.createHash('md5').update(`${voice}_${safeText}`).digest('hex');
          const cacheDir = path.resolve(__dirname, 'public', 'assets', 'audio', 'cache');
          if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
          }
          const filePath = path.join(cacheDir, `${hash}.mp3`);

          if (fs.existsSync(filePath) && fs.statSync(filePath).size > 100) {
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Cache-Control', 'public, max-age=604800');
            fs.createReadStream(filePath).pipe(res);
            return;
          }

          // Generate via tts_helper.py
          const helperScript = path.resolve(__dirname, 'scripts', 'tts_helper.py');
          const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
          const child = spawn(
            pythonCmd,
            [helperScript, '--voice', voice, '--rate', '-4%', '--output', filePath],
            { stdio: ['pipe', 'ignore', 'pipe'] }
          );

          child.on('close', (code) => {
            if (code === 0 && fs.existsSync(filePath) && fs.statSync(filePath).size > 100) {
              res.setHeader('Content-Type', 'audio/mpeg');
              res.setHeader('Cache-Control', 'public, max-age=604800');
              fs.createReadStream(filePath).pipe(res);
            } else {
              next();
            }
          });

          child.on('error', () => {
            next();
          });

          child.stdin.write(Buffer.from(safeText, 'utf-8'));
          child.stdin.end();
        } catch {
          next();
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localTtsPlugin()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});

