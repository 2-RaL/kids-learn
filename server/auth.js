import jwt from 'jsonwebtoken';
import { findUserById, toSafeUser } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-key';
const TOKEN_EXPIRY = '7d';

/**
 * Generate a JWT token for a user.
 */
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

/**
 * Express middleware: verify JWT token and attach user to req.
 */
export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Giriş tələb olunur!' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await findUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'İstifadəçi tapılmadı!' });
    }
    if (!user.is_active) {
      return res.status(403).json({ error: 'Hesabınız deaktiv edilib!' });
    }

    req.user = toSafeUser(user);
    next();
  } catch {
    return res.status(401).json({ error: 'Etibarsız və ya vaxtı bitmiş sessiya!' });
  }
}

/**
 * Express middleware: require admin role.
 */
export function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Bu əməliyyat üçün admin hüquqları tələb olunur!' });
  }
  next();
}
