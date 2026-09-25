import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDatabase, getPool } from './db.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Validate required environment variables ──────────────────────────
const REQUIRED_ENV = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error('\n╔══════════════════════════════════════════════════════╗');
  console.error('║  ❌  MISSING REQUIRED ENVIRONMENT VARIABLES          ║');
  console.error('╠══════════════════════════════════════════════════════╣');
  missing.forEach((key) => {
    console.error(`║  • ${key.padEnd(48)}║`);
  });
  console.error('╚══════════════════════════════════════════════════════╝\n');
  console.error('Please set these variables in your Hostinger dashboard or .env file.\n');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));

// ── API Routes ───────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', async (_req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT 1 AS ok');
    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      error: err.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// ── Production: serve Vite-built frontend ────────────────────────────
const distPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Serve public assets (character sprites, portraits, etc.)
app.use('/assets', express.static(path.resolve(__dirname, '..', 'public', 'assets')));

// SPA fallback — any non-API route returns index.html (Express v5 wildcard syntax)
app.get('{*path}', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ── Start Server ─────────────────────────────────────────────────────
async function startServer() {
  try {
    console.log('\n🚀 Kids Move & Learn — Starting server...\n');

    // Initialize database (create tables + default admin)
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`\n✅ Server is running on port ${PORT}`);
      console.log(`   Frontend: http://localhost:${PORT}`);
      console.log(`   Health:   http://localhost:${PORT}/api/health\n`);
    });
  } catch (err) {
    console.error('\n❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

startServer();
