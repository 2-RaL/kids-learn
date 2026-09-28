import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { findUserByUsername, updateUser, toSafeUser, getParentProfile } from '../db.js';
import { generateToken, authMiddleware } from '../auth.js';

const router = Router();

// POST /api/auth/login — unified login, returns role in response
router.post('/login', async (req, res) => {
  try {
    const { username, password, portalType } = req.body;
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

    // Role-based portal access enforcement
    if (portalType === 'therapist' && !['therapist', 'admin'].includes(user.role)) {
      return res.status(403).json({ error: 'Bu portal yalnız loqopedlər üçündür!' });
    }
    if (portalType === 'parent' && !['parent', 'admin'].includes(user.role)) {
      return res.status(403).json({ error: 'Bu portal yalnız valideynlər üçündür!' });
    }
    if (portalType === 'admin' && user.role !== 'admin') {
      return res.status(403).json({ error: 'Bu panel yalnız adminlər üçündür!' });
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

    // Include parent profile if applicable
    let parentProfile = null;
    if (user.role === 'parent') {
      parentProfile = await getParentProfile(user.id);
    }

    res.json({ token, user: updated, parentProfile });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message || 'Daxili server xətası' });
  }
});

// GET /api/auth/me — validate token and return current user
router.get('/me', authMiddleware, async (req, res) => {
  let parentProfile = null;
  if (req.user.role === 'parent') {
    parentProfile = await getParentProfile(req.user.id);
  }
  res.json({ user: req.user, parentProfile });
});

export default router;
