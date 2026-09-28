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
 * Initialize database: create tables if not exist, seed default accounts.
 */
export async function initDatabase() {
  const db = getPool();

  console.log('📦 Checking database connection...');
  const connection = await db.getConnection();
  console.log('✅ Database connected successfully!');
  connection.release();

  console.log('📋 Checking tables...');

  // ── Users table (extended roles) ──────────────────────────────────
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      display_name VARCHAR(200) NOT NULL DEFAULT '',
      email VARCHAR(255) DEFAULT NULL,
      role ENUM('admin', 'therapist', 'parent') NOT NULL DEFAULT 'therapist',
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      last_login_at DATETIME DEFAULT NULL,
      INDEX idx_username (username),
      INDEX idx_role (role),
      INDEX idx_is_active (is_active)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Migrate old 'user' role to 'therapist' if needed
  await db.query(`
    UPDATE users SET role = 'therapist' WHERE role = 'user'
  `).catch(() => {});

  console.log('✅ Users table ready.');

  // ── Age Groups ──────────────────────────────────────────────────────
  await db.query(`
    CREATE TABLE IF NOT EXISTS age_groups (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      min_age INT NOT NULL,
      max_age INT NOT NULL,
      description TEXT DEFAULT NULL,
      color VARCHAR(50) DEFAULT '#6366f1',
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // ── Parent Profiles ─────────────────────────────────────────────────
  await db.query(`
    CREATE TABLE IF NOT EXISTS parent_profiles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL UNIQUE,
      child_name VARCHAR(200) DEFAULT NULL,
      child_age INT DEFAULT NULL,
      child_gender ENUM('boy', 'girl', 'other') DEFAULT NULL,
      age_group_id INT DEFAULT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // ── Story Categories ────────────────────────────────────────────────
  await db.query(`
    CREATE TABLE IF NOT EXISTS story_categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      name_az VARCHAR(100) DEFAULT NULL,
      slug VARCHAR(100) NOT NULL UNIQUE,
      icon VARCHAR(50) DEFAULT '📖',
      color VARCHAR(50) DEFAULT '#6366f1',
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // ── Stories ─────────────────────────────────────────────────────────
  await db.query(`
    CREATE TABLE IF NOT EXISTS stories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(300) NOT NULL,
      short_description TEXT DEFAULT NULL,
      full_story LONGTEXT DEFAULT NULL,
      cover_image VARCHAR(500) DEFAULT NULL,
      category_id INT DEFAULT NULL,
      min_age INT NOT NULL DEFAULT 3,
      max_age INT NOT NULL DEFAULT 12,
      reading_duration_minutes INT DEFAULT 5,
      is_bedtime TINYINT(1) NOT NULL DEFAULT 0,
      audio_url VARCHAR(500) DEFAULT NULL,
      is_published TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES story_categories(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // ── Video Categories ────────────────────────────────────────────────
  await db.query(`
    CREATE TABLE IF NOT EXISTS video_categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      name_az VARCHAR(100) DEFAULT NULL,
      slug VARCHAR(100) NOT NULL UNIQUE,
      icon VARCHAR(50) DEFAULT '🎬',
      color VARCHAR(50) DEFAULT '#0ea5e9',
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // ── Videos ──────────────────────────────────────────────────────────
  await db.query(`
    CREATE TABLE IF NOT EXISTS videos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(300) NOT NULL,
      description TEXT DEFAULT NULL,
      video_url VARCHAR(500) DEFAULT NULL,
      thumbnail_url VARCHAR(500) DEFAULT NULL,
      category_id INT DEFAULT NULL,
      min_age INT NOT NULL DEFAULT 3,
      max_age INT NOT NULL DEFAULT 12,
      difficulty ENUM('easy', 'medium', 'hard') NOT NULL DEFAULT 'easy',
      duration_seconds INT DEFAULT NULL,
      is_published TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES video_categories(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // ── Parent Characters ───────────────────────────────────────────────
  await db.query(`
    CREATE TABLE IF NOT EXISTS parent_characters (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      name_az VARCHAR(100) DEFAULT NULL,
      emoji VARCHAR(20) DEFAULT '🐰',
      image_url VARCHAR(500) DEFAULT NULL,
      description TEXT DEFAULT NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // ── Movements ───────────────────────────────────────────────────────
  await db.query(`
    CREATE TABLE IF NOT EXISTS movements (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      name_az VARCHAR(100) DEFAULT NULL,
      command_key VARCHAR(100) NOT NULL UNIQUE,
      icon VARCHAR(50) DEFAULT '🏃',
      description TEXT DEFAULT NULL,
      animation_class VARCHAR(200) DEFAULT NULL,
      min_age INT NOT NULL DEFAULT 3,
      max_age INT NOT NULL DEFAULT 12,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // ── Logic Questions ─────────────────────────────────────────────────
  await db.query(`
    CREATE TABLE IF NOT EXISTS logic_questions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question_text VARCHAR(500) NOT NULL,
      question_type ENUM('visual', 'color', 'pattern', 'matching', 'classification', 'size', 'shape') NOT NULL DEFAULT 'visual',
      image_url VARCHAR(500) DEFAULT NULL,
      min_age INT NOT NULL DEFAULT 3,
      max_age INT NOT NULL DEFAULT 12,
      difficulty ENUM('easy', 'medium', 'hard') NOT NULL DEFAULT 'easy',
      explanation TEXT DEFAULT NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS logic_answers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question_id INT NOT NULL,
      answer_text VARCHAR(300) NOT NULL,
      image_url VARCHAR(500) DEFAULT NULL,
      is_correct TINYINT(1) NOT NULL DEFAULT 0,
      sort_order INT NOT NULL DEFAULT 0,
      FOREIGN KEY (question_id) REFERENCES logic_questions(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // ── Math Questions ──────────────────────────────────────────────────
  await db.query(`
    CREATE TABLE IF NOT EXISTS math_questions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question_text VARCHAR(500) NOT NULL,
      question_type ENUM('counting', 'addition', 'subtraction', 'recognition', 'comparison', 'quantity') NOT NULL DEFAULT 'counting',
      visual_elements TEXT DEFAULT NULL,
      min_age INT NOT NULL DEFAULT 3,
      max_age INT NOT NULL DEFAULT 12,
      difficulty ENUM('easy', 'medium', 'hard') NOT NULL DEFAULT 'easy',
      explanation TEXT DEFAULT NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS math_answers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question_id INT NOT NULL,
      answer_text VARCHAR(300) NOT NULL,
      is_correct TINYINT(1) NOT NULL DEFAULT 0,
      sort_order INT NOT NULL DEFAULT 0,
      FOREIGN KEY (question_id) REFERENCES math_questions(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // ── Chess Lessons ───────────────────────────────────────────────────
  await db.query(`
    CREATE TABLE IF NOT EXISTS chess_lessons (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(300) NOT NULL,
      description TEXT DEFAULT NULL,
      lesson_type ENUM('piece_intro', 'movement_rule', 'mini_challenge', 'basic_strategy') NOT NULL DEFAULT 'piece_intro',
      image_url VARCHAR(500) DEFAULT NULL,
      content LONGTEXT DEFAULT NULL,
      min_age INT NOT NULL DEFAULT 5,
      max_age INT NOT NULL DEFAULT 12,
      difficulty ENUM('easy', 'medium', 'hard') NOT NULL DEFAULT 'easy',
      sort_order INT NOT NULL DEFAULT 0,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  console.log('✅ All content tables ready.');

  // ── Seed Default Data ──────────────────────────────────────────────

  // Admin
  const [admins] = await db.query("SELECT id FROM users WHERE role = 'admin' LIMIT 1");
  if (admins.length === 0) {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hash = await bcrypt.hash(adminPassword, 10);
    await db.query(
      `INSERT INTO users (username, password_hash, display_name, role, is_active) VALUES (?, ?, ?, 'admin', 1)`,
      [adminUsername, hash, 'Sistem Admini']
    );
    console.log(`👤 Default admin created: username="${adminUsername}"`);
  }

  // Default therapist
  const [therapists] = await db.query("SELECT id FROM users WHERE role = 'therapist' LIMIT 1");
  if (therapists.length === 0) {
    const hash = await bcrypt.hash('logoped123', 10);
    await db.query(
      `INSERT INTO users (username, password_hash, display_name, role, is_active) VALUES (?, ?, ?, 'therapist', 1)`,
      ['logoped', hash, 'Demo Loqoped']
    );
    console.log('👤 Default therapist created: username="logoped"');
  }

  // Default parent
  const [parents] = await db.query("SELECT id FROM users WHERE role = 'parent' LIMIT 1");
  if (parents.length === 0) {
    const hash = await bcrypt.hash('valideyn123', 10);
    const [result] = await db.query(
      `INSERT INTO users (username, password_hash, display_name, role, is_active) VALUES (?, ?, ?, 'parent', 1)`,
      ['valideyn', hash, 'Demo Valideyn']
    );
    // Create parent profile
    await db.query(
      `INSERT INTO parent_profiles (user_id, child_name, child_age) VALUES (?, ?, ?)`,
      [result.insertId, null, null]
    );
    console.log('👤 Default parent created: username="valideyn"');
  }

  // Age groups
  const [ageGroupCount] = await db.query('SELECT COUNT(*) AS cnt FROM age_groups');
  if (ageGroupCount[0].cnt === 0) {
    await db.query(`
      INSERT INTO age_groups (name, min_age, max_age, color) VALUES
      ('3-4 yaş', 3, 4, '#f59e0b'),
      ('5-6 yaş', 5, 6, '#10b981'),
      ('7-8 yaş', 7, 8, '#6366f1'),
      ('9-10 yaş', 9, 10, '#ec4899')
    `);
    console.log('📊 Age groups seeded.');
  }

  // Story categories
  const [storyCatCount] = await db.query('SELECT COUNT(*) AS cnt FROM story_categories');
  if (storyCatCount[0].cnt === 0) {
    await db.query(`
      INSERT INTO story_categories (name, name_az, slug, icon, color) VALUES
      ('Bedtime Stories', 'Gecə hekayələri', 'bedtime', '🌙', '#6366f1'),
      ('Daytime Stories', 'Gündüz hekayələri', 'daytime', '☀️', '#f59e0b')
    `);
    console.log('📚 Story categories seeded.');
  }

  // Video categories
  const [vidCatCount] = await db.query('SELECT COUNT(*) AS cnt FROM video_categories');
  if (vidCatCount[0].cnt === 0) {
    await db.query(`
      INSERT INTO video_categories (name, name_az, slug, icon, color) VALUES
      ('Movements', 'Hərəkətlər', 'movements', '🏃', '#10b981'),
      ('Communication', 'Ünsiyyət', 'communication', '💬', '#6366f1')
    `);
    console.log('🎬 Video categories seeded.');
  }

  // Parent characters
  const [charCount] = await db.query('SELECT COUNT(*) AS cnt FROM parent_characters');
  if (charCount[0].cnt === 0) {
    await db.query(`
      INSERT INTO parent_characters (name, name_az, emoji, is_active, sort_order) VALUES
      ('Rabbit', 'Dovşan', '🐰', 1, 1),
      ('Lion', 'Aslan', '🦁', 1, 2)
    `);
    console.log('🐰 Parent characters seeded.');
  }

  // Movements
  const [movCount] = await db.query('SELECT COUNT(*) AS cnt FROM movements');
  if (movCount[0].cnt === 0) {
    await db.query(`
      INSERT INTO movements (name, name_az, command_key, icon, min_age, max_age, sort_order) VALUES
      ('Sit', 'Otur', 'sit', '🧘', 3, 12, 1),
      ('Stand', 'Qalx', 'stand', '🧍', 3, 12, 2),
      ('Walk Forward', 'İrəli get', 'walkForward', '🚶', 3, 12, 3),
      ('Walk Backward', 'Geri get', 'walkBackward', '🚶', 3, 12, 4),
      ('Move Left', 'Sola get', 'moveLeft', '⬅️', 3, 12, 5),
      ('Move Right', 'Sağa get', 'moveRight', '➡️', 3, 12, 6),
      ('Run', 'Qaç', 'run', '🏃', 3, 12, 7),
      ('Jump', 'Tullan', 'jump', '🦘', 3, 12, 8),
      ('Wave', 'Əlini salla', 'wave', '👋', 3, 12, 9),
      ('Nod', 'Başını salla', 'nod', '🙆', 3, 12, 10),
      ('Spin', 'Yerində dön', 'spin', '🌀', 3, 12, 11),
      ('Stop', 'Dayan', 'stop', '✋', 3, 12, 12)
    `);
    console.log('🏃 Movements seeded.');
  }

  // Sample stories
  const [storyCount] = await db.query('SELECT COUNT(*) AS cnt FROM stories');
  if (storyCount[0].cnt === 0) {
    const [cats] = await db.query('SELECT id, slug FROM story_categories');
    const bedtimeId = cats.find(c => c.slug === 'bedtime')?.id || 1;
    const daytimeId = cats.find(c => c.slug === 'daytime')?.id || 2;
    await db.query(`
      INSERT INTO stories (title, short_description, full_story, category_id, min_age, max_age, reading_duration_minutes, is_bedtime, is_published) VALUES
      ('Kiçik Dovşan', 'Kiçik dovşanın meşədəki macərası', 'Bir zamanlar meşədə kiçik bir dovşan yaşayırdı. Hər gün o, meşənin ən gözəl çiçəklərini tapmağa çalışırdı...', ?, 3, 6, 5, 1, 1),
      ('Günəşli Gün', 'Uşaqların parkdakı əyləncəli günü', 'Bir yay günü, Leyla və onun dostları parka getdilər. Orada yelləncəkdə oynadılar, topu bir-birinə atdılar...', ?, 4, 8, 7, 0, 1)
    `, [bedtimeId, daytimeId]);
    console.log('📖 Sample stories seeded.');
  }

  // Sample logic questions
  const [logicCount] = await db.query('SELECT COUNT(*) AS cnt FROM logic_questions');
  if (logicCount[0].cnt === 0) {
    const [q1] = await db.query(
      `INSERT INTO logic_questions (question_text, question_type, min_age, max_age, difficulty) VALUES (?, ?, ?, ?, ?)`,
      ['Hansı fərqlidir?', 'visual', 3, 6, 'easy']
    );
    await db.query(
      `INSERT INTO logic_answers (question_id, answer_text, is_correct, sort_order) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)`,
      [q1.insertId, '🍎', 0, 1, q1.insertId, '🍊', 0, 2, q1.insertId, '🚗', 1, 3]
    );

    const [q2] = await db.query(
      `INSERT INTO logic_questions (question_text, question_type, min_age, max_age, difficulty) VALUES (?, ?, ?, ?, ?)`,
      ['Qırmızı olanı seç', 'color', 3, 5, 'easy']
    );
    await db.query(
      `INSERT INTO logic_answers (question_id, answer_text, is_correct, sort_order) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)`,
      [q2.insertId, '🍎', 1, 1, q2.insertId, '🍌', 0, 2, q2.insertId, '🫐', 0, 3]
    );
    console.log('🧠 Sample logic questions seeded.');
  }

  // Sample math questions
  const [mathCount] = await db.query('SELECT COUNT(*) AS cnt FROM math_questions');
  if (mathCount[0].cnt === 0) {
    const [mq1] = await db.query(
      `INSERT INTO math_questions (question_text, question_type, visual_elements, min_age, max_age, difficulty) VALUES (?, ?, ?, ?, ?, ?)`,
      ['Neçə alma var?', 'counting', '🍎🍎', 3, 5, 'easy']
    );
    await db.query(
      `INSERT INTO math_answers (question_id, answer_text, is_correct, sort_order) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)`,
      [mq1.insertId, '1', 0, 1, mq1.insertId, '2', 1, 2, mq1.insertId, '3', 0, 3]
    );

    const [mq2] = await db.query(
      `INSERT INTO math_questions (question_text, question_type, visual_elements, min_age, max_age, difficulty) VALUES (?, ?, ?, ?, ?, ?)`,
      ['Neçə dovşan var?', 'counting', '🐰🐰🐰', 4, 6, 'easy']
    );
    await db.query(
      `INSERT INTO math_answers (question_id, answer_text, is_correct, sort_order) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)`,
      [mq2.insertId, '2', 0, 1, mq2.insertId, '3', 1, 2, mq2.insertId, '4', 0, 3]
    );
    console.log('🔢 Sample math questions seeded.');
  }

  // Sample chess lessons
  const [chessCount] = await db.query('SELECT COUNT(*) AS cnt FROM chess_lessons');
  if (chessCount[0].cnt === 0) {
    await db.query(`
      INSERT INTO chess_lessons (title, description, lesson_type, min_age, max_age, difficulty, sort_order, is_active) VALUES
      ('Şah nədir?', 'Şahmat oyununda ən vacib fiqur — Şah haqqında öyrənin', 'piece_intro', 5, 12, 'easy', 1, 1),
      ('Vəzir necə hərəkət edir?', 'Ən güclü fiqur olan Vəzirin hərəkətini öyrənin', 'movement_rule', 6, 12, 'easy', 2, 1),
      ('At necə hərəkət edir?', 'L şəklində hərəkət edən At fiqurunu tanıyın', 'piece_intro', 5, 12, 'medium', 3, 1)
    `);
    console.log('♟️ Sample chess lessons seeded.');
  }

  console.log('\n✅ Database initialization complete!\n');
}

// ── Helper: sanitize user output ──────────────────────────────────────

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

// ── User CRUD ─────────────────────────────────────────────────────────

export async function findUserByUsername(username) {
  const db = getPool();
  const [rows] = await db.query(
    'SELECT * FROM users WHERE LOWER(username) = LOWER(?) LIMIT 1',
    [username.trim()]
  );
  return rows[0] || null;
}

export async function findUserById(id) {
  const db = getPool();
  const [rows] = await db.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

export async function getAllUsers(roleFilter = null) {
  const db = getPool();
  let query = 'SELECT id, username, display_name, email, role, is_active, created_at, updated_at, last_login_at FROM users';
  const params = [];
  if (roleFilter) {
    query += ' WHERE role = ?';
    params.push(roleFilter);
  }
  query += ' ORDER BY created_at DESC';
  const [rows] = await db.query(query, params);
  return rows;
}

export async function createUser({ username, password, displayName, email, role }) {
  const db = getPool();
  const existing = await findUserByUsername(username);
  if (existing) throw new Error('Bu istifadəçi adı artıq mövcuddur!');

  const allowedRoles = ['admin', 'therapist', 'parent'];
  const safeRole = allowedRoles.includes(role) ? role : 'therapist';
  const hash = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    `INSERT INTO users (username, password_hash, display_name, email, role, is_active) VALUES (?, ?, ?, ?, ?, 1)`,
    [username.trim().toLowerCase(), hash, (displayName || username).trim(), email || null, safeRole]
  );

  // Create parent profile if parent role
  if (safeRole === 'parent') {
    await db.query(`INSERT INTO parent_profiles (user_id) VALUES (?)`, [result.insertId]);
  }

  const newUser = await findUserById(result.insertId);
  return toSafeUser(newUser);
}

export async function updateUser(id, updates) {
  const db = getPool();
  const user = await findUserById(id);
  if (!user) throw new Error('İstifadəçi tapılmadı!');

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
    const allowedRoles = ['admin', 'therapist', 'parent'];
    if (allowedRoles.includes(updates.role)) {
      fields.push('role = ?');
      values.push(updates.role);
    }
  }
  if (updates.isActive !== undefined) {
    fields.push('is_active = ?');
    values.push(updates.isActive ? 1 : 0);
  }
  if (updates.lastLoginAt !== undefined) {
    fields.push('last_login_at = ?');
    values.push(updates.lastLoginAt);
  }

  if (fields.length === 0) return toSafeUser(user);

  values.push(id);
  await db.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);

  const updated = await findUserById(id);
  return toSafeUser(updated);
}

export async function deleteUser(id, currentAdminId) {
  if (String(id) === String(currentAdminId)) throw new Error('Öz hesabınızı silə bilməzsiniz!');
  const db = getPool();
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  if (result.affectedRows === 0) throw new Error('İstifadəçi tapılmadı!');
}

// ── Parent Profile ────────────────────────────────────────────────────

export async function getParentProfile(userId) {
  const db = getPool();
  const [rows] = await db.query('SELECT * FROM parent_profiles WHERE user_id = ? LIMIT 1', [userId]);
  return rows[0] || null;
}

export async function upsertParentProfile(userId, { childName, childAge, childGender, ageGroupId }) {
  const db = getPool();
  const existing = await getParentProfile(userId);
  if (existing) {
    await db.query(
      `UPDATE parent_profiles SET child_name = ?, child_age = ?, child_gender = ?, age_group_id = ? WHERE user_id = ?`,
      [childName || null, childAge || null, childGender || null, ageGroupId || null, userId]
    );
  } else {
    await db.query(
      `INSERT INTO parent_profiles (user_id, child_name, child_age, child_gender, age_group_id) VALUES (?, ?, ?, ?, ?)`,
      [userId, childName || null, childAge || null, childGender || null, ageGroupId || null]
    );
  }
  return getParentProfile(userId);
}
