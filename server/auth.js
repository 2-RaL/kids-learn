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
  if (!req.user) {
    return res.status(401).json({ error: 'Giriş tələb olunur!' });
  }
  // Admin and editor have full access to both portals
  if (['admin', 'editor'].includes(req.user.role)) {
    return next();
  }
  const access = req.user.portalAccess || req.user.portal_access || 'both';
  if (['therapist', 'both'].includes(access) && ['therapist', 'user'].includes(req.user.role)) {
    return next();
  }
  return res.status(403).json({ error: 'Bu portala (Loqoped) giriş hüququnuz yoxdur!' });
}

export function parentMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Giriş tələb olunur!' });
  }
  // Admin and editor have full access to both portals
  if (['admin', 'editor'].includes(req.user.role)) {
    return next();
  }
  const access = req.user.portalAccess || req.user.portal_access || 'both';
  if (['parent', 'both'].includes(access) && ['parent', 'user'].includes(req.user.role)) {
    return next();
  }
  return res.status(403).json({ error: 'Bu portala (Valideyn) giriş hüququnuz yoxdur!' });
}
