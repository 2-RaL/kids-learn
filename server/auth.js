import jwt from 'jsonwebtoken';
import { findUserById, toSafeUser } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-key';
const TOKEN_EXPIRY = '7d';

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Giriş tələb olunur!' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await findUserById(decoded.userId);

    if (!user) return res.status(401).json({ error: 'İstifadəçi tapılmadı!' });
    if (!user.is_active) return res.status(403).json({ error: 'Hesabınız deaktiv edilib!' });

    req.user = toSafeUser(user);
    next();
  } catch {
    return res.status(401).json({ error: 'Etibarsız və ya vaxtı bitmiş sessiya!' });
  }
}

export function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Bu əməliyyat üçün admin hüquqları tələb olunur!' });
  }
  next();
}

export function therapistMiddleware(req, res, next) {
  if (!req.user || (req.user.role !== 'therapist' && req.user.role !== 'admin')) {
    return res.status(403).json({ error: 'Bu əməliyyat üçün loqoped hüquqları tələb olunur!' });
  }
  next();
}

export function parentMiddleware(req, res, next) {
  if (!req.user || (req.user.role !== 'parent' && req.user.role !== 'admin')) {
    return res.status(403).json({ error: 'Bu əməliyyat üçün valideyn hüquqları tələb olunur!' });
  }
  next();
}
