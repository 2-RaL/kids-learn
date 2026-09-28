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
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'editor')) {
    return res.status(403).json({ error: 'Bu əməliyyat üçün admin və ya redaktor hüquqları tələb olunur!' });
  }
  next();
}

export function superAdminOnlyMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Bu əməliyyat yalnız Super Admin üçün icazəlidir!' });
  }
  next();
}

export function therapistMiddleware(req, res, next) {
  if (!req.user || !['therapist', 'admin', 'editor', 'user'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Bu əməliyyat üçün giriş hüququ tələb olunur!' });
  }
  next();
}

export function parentMiddleware(req, res, next) {
  if (!req.user || !['parent', 'admin', 'editor', 'user'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Bu əməliyyat üçün valideyn hüquqları tələb olunur!' });
  }
  next();
}
