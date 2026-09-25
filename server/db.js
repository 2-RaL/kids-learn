import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

let pool = null;

/**
 * Get or create the MySQL connection pool.
 */
export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: 'utf8mb4',
    });
  }
  return pool;
}

/**
 * Initialize database: create tables if not exist, seed default admin.
 */
export async function initDatabase() {
  const db = getPool();

  console.log('📦 Checking database connection...');
  
  // Test connection
  const connection = await db.getConnection();
  console.log('✅ Database connected successfully!');
  connection.release();

  // Create users table
  console.log('📋 Checking tables...');
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      display_name VARCHAR(200) NOT NULL DEFAULT '',
      email VARCHAR(255) DEFAULT NULL,
      role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      last_login_at DATETIME DEFAULT NULL,
      INDEX idx_username (username),
      INDEX idx_role (role),
      INDEX idx_is_active (is_active)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('✅ Users table ready.');

  // Seed default admin if no admin exists
  const [admins] = await db.query(
    "SELECT id FROM users WHERE role = 'admin' LIMIT 1"
  );

  if (admins.length === 0) {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hash = await bcrypt.hash(adminPassword, 10);

    await db.query(
      `INSERT INTO users (username, password_hash, display_name, role, is_active)
       VALUES (?, ?, ?, 'admin', 1)`,
      [adminUsername, hash, 'Sistem Admini']
    );
    console.log(`👤 Default admin created: username="${adminUsername}"`);
  } else {
    console.log('👤 Admin user already exists, skipping seed.');
  }
}

// ── CRUD Operations ──────────────────────────────────────────────────

/**
 * Remove password_hash and convert snake_case fields to camelCase for frontend.
 */
export function toSafeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    displayName: user.display_name,
    email: user.email || null,
    role: user.role,
    isActive: !!user.is_active,
    createdAt: user.created_at ? new Date(user.created_at).toISOString() : null,
    updatedAt: user.updated_at ? new Date(user.updated_at).toISOString() : null,
    lastLoginAt: user.last_login_at ? new Date(user.last_login_at).toISOString() : null,
  };
}

/**
 * Find a user by username (case-insensitive).
 */
export async function findUserByUsername(username) {
  const db = getPool();
  const [rows] = await db.query(
    'SELECT * FROM users WHERE LOWER(username) = LOWER(?) LIMIT 1',
    [username.trim()]
  );
  return rows[0] || null;
}

/**
 * Find a user by ID.
 */
export async function findUserById(id) {
  const db = getPool();
  const [rows] = await db.query(
    'SELECT * FROM users WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0] || null;
}

/**
 * Get all users (safe — no password hashes).
 */
export async function getAllUsers() {
  const db = getPool();
  const [rows] = await db.query(
    'SELECT id, username, display_name, email, role, is_active, created_at, updated_at, last_login_at FROM users ORDER BY created_at DESC'
  );
  return rows;
}

/**
 * Create a new user.
 */
export async function createUser({ username, password, displayName, email, role }) {
  const db = getPool();

  // Check duplicate
  const existing = await findUserByUsername(username);
  if (existing) {
    throw new Error('Bu istifadəçi adı artıq mövcuddur!');
  }

  const hash = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    `INSERT INTO users (username, password_hash, display_name, email, role, is_active)
     VALUES (?, ?, ?, ?, ?, 1)`,
    [
      username.trim().toLowerCase(),
      hash,
      (displayName || username).trim(),
      email || null,
      role || 'user',
    ]
  );

  const newUser = await findUserById(result.insertId);
  return toSafeUser(newUser);
}

/**
 * Update an existing user.
 */
export async function updateUser(id, updates) {
  const db = getPool();

  const user = await findUserById(id);
  if (!user) {
    throw new Error('İstifadəçi tapılmadı!');
  }

  const fields = [];
  const values = [];

  if (updates.password) {
    fields.push('password_hash = ?');
    values.push(await bcrypt.hash(updates.password, 10));
  }
  if (updates.displayName !== undefined) {
    fields.push('display_name = ?');
    values.push(updates.displayName.trim());
  }
  if (updates.email !== undefined) {
    fields.push('email = ?');
    values.push(updates.email || null);
  }
  if (updates.role !== undefined) {
    fields.push('role = ?');
    values.push(updates.role);
  }
  if (updates.isActive !== undefined) {
    fields.push('is_active = ?');
    values.push(updates.isActive ? 1 : 0);
  }
  if (updates.lastLoginAt !== undefined) {
    fields.push('last_login_at = ?');
    values.push(updates.lastLoginAt);
  }

  if (fields.length === 0) {
    return toSafeUser(user);
  }

  values.push(id);
  await db.query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
    values
  );

  const updated = await findUserById(id);
  return toSafeUser(updated);
}

/**
 * Delete a user.
 */
export async function deleteUser(id, currentAdminId) {
  if (String(id) === String(currentAdminId)) {
    throw new Error('Öz hesabınızı silə bilməzsiniz!');
  }

  const db = getPool();
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);

  if (result.affectedRows === 0) {
    throw new Error('İstifadəçi tapılmadı!');
  }
}
