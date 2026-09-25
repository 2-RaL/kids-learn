import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { findUserByUsername, updateUser, toSafeUser } from '../db.js';
import { generateToken, authMiddleware } from '../auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'İstifadəçi adı və şifrə daxil edilməlidir!' });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'İstifadəçi adı və ya şifrə yanlışdır!' });
    }

    if (!user.is_active) {
      return res.status(403).json({ error: 'Hesabınız deaktiv edilib. Administrator ilə əlaqə saxlayın.' });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'İstifadəçi adı və ya şifrə yanlışdır!' });
    }

    // Update last login
    const updated = await updateUser(user.id, {
      lastLoginAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    });

    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: user.role,
    });

    res.json({ token, user: updated });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message || 'Daxili server xətası' });
  }
});

// GET /api/auth/me — validate token and return current user
router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;
