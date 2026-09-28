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
      role VARCHAR(50) NOT NULL DEFAULT 'user',
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      last_login_at DATETIME DEFAULT NULL,
      INDEX idx_username (username),
      INDEX idx_role (role),
      INDEX idx_is_active (is_active)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Ensure role column supports admin, editor, therapist, parent, user
  await db.query(`
    ALTER TABLE users MODIFY COLUMN role VARCHAR(50) NOT NULL DEFAULT 'user'
  `).catch(() => {});

  // ── Editor Audit Logs (Fəaliyyət Tarixçəsi və Rollback) ─────────────
  await db.query(`
    CREATE TABLE IF NOT EXISTS editor_audit_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      user_name VARCHAR(100) NOT NULL,
      user_display_name VARCHAR(200) NOT NULL,
      user_role VARCHAR(50) NOT NULL DEFAULT 'editor',
      action_type ENUM('create', 'update', 'delete') NOT NULL,
      entity_type VARCHAR(50) NOT NULL,
      entity_id INT NOT NULL,
      entity_title VARCHAR(300) DEFAULT NULL,
      previous_state LONGTEXT DEFAULT NULL,
      new_state LONGTEXT DEFAULT NULL,
      is_reverted TINYINT(1) NOT NULL DEFAULT 0,
      reverted_at DATETIME DEFAULT NULL,
      reverted_by_name VARCHAR(100) DEFAULT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_user_id (user_id),
      INDEX idx_created_at (created_at),
      INDEX idx_is_reverted (is_reverted)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  console.log('✅ Users & audit tables ready.');

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

  // ── Seed Default Data (100% Idempotent) ──────────────────────────

  // 1. Default admin account
  try {
    const adminUsername = (process.env.ADMIN_USERNAME || 'admin').trim();
    const [existingAdmin] = await db.query(
      'SELECT id FROM users WHERE LOWER(username) = LOWER(?) LIMIT 1',
      [adminUsername]
    );
    if (existingAdmin.length === 0) {
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const hash = await bcrypt.hash(adminPassword, 10);
      await db.query(
        `INSERT INTO users (username, password_hash, display_name, role, is_active)
         VALUES (?, ?, ?, 'admin', 1)
         ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP`,
        [adminUsername.toLowerCase(), hash, 'Sistem Admini']
      );
      console.log(`👤 Default admin created: username="${adminUsername}"`);
    }
  } catch (err) {
    console.warn('⚠️ Admin seed warning:', err.message);
  }

  // 2. Default therapist account ('logoped')
  try {
    const [existingTherapist] = await db.query(
      'SELECT id FROM users WHERE LOWER(username) = ? LIMIT 1',
      ['logoped']
    );
    if (existingTherapist.length === 0) {
      const hash = await bcrypt.hash('logoped123', 10);
      await db.query(
        `INSERT INTO users (username, password_hash, display_name, role, is_active)
         VALUES (?, ?, ?, 'therapist', 1)
         ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP`,
        ['logoped', hash, 'Demo Loqoped']
      );
      console.log('👤 Default therapist created: username="logoped"');
    }
  } catch (err) {
    console.warn('⚠️ Therapist seed warning:', err.message);
  }

  // 3. Default parent account ('valideyn')
  try {
    const [existingParent] = await db.query(
      'SELECT id FROM users WHERE LOWER(username) = ? LIMIT 1',
      ['valideyn']
    );
    let parentUserId = null;
    if (existingParent.length === 0) {
      const hash = await bcrypt.hash('valideyn123', 10);
      const [res] = await db.query(
        `INSERT INTO users (username, password_hash, display_name, role, is_active)
         VALUES (?, ?, ?, 'parent', 1)
         ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP`,
        ['valideyn', hash, 'Demo Valideyn']
      );
      parentUserId = res.insertId;
      console.log('👤 Default parent created: username="valideyn"');
    } else {
      parentUserId = existingParent[0].id;
    }

    if (parentUserId) {
      await db.query(
        `INSERT INTO parent_profiles (user_id, child_name, child_age)
         VALUES (?, NULL, NULL)
         ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP`,
        [parentUserId]
      );
    }
  } catch (err) {
    console.warn('⚠️ Parent seed warning:', err.message);
  }

  // 4. Default editor account ('redaktor')
  try {
    const [existingEditor] = await db.query(
      'SELECT id FROM users WHERE LOWER(username) = ? LIMIT 1',
      ['redaktor']
    );
    if (existingEditor.length === 0) {
      const hash = await bcrypt.hash('redaktor123', 10);
      await db.query(
        `INSERT INTO users (username, password_hash, display_name, role, is_active)
         VALUES (?, ?, ?, 'editor', 1)
         ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP`,
        ['redaktor', hash, 'Məzmun Redaktoru']
      );
      console.log('👤 Default editor created: username="redaktor"');
    }
  } catch (err) {
    console.warn('⚠️ Editor seed warning:', err.message);
  }

  // 4. Age groups
  try {
    const defaultAgeGroups = [
      { name: '3-4 yaş', min_age: 3, max_age: 4, color: '#f59e0b' },
      { name: '5-6 yaş', min_age: 5, max_age: 6, color: '#10b981' },
      { name: '7-8 yaş', min_age: 7, max_age: 8, color: '#6366f1' },
      { name: '9-10 yaş', min_age: 9, max_age: 10, color: '#ec4899' },
    ];
    for (const ag of defaultAgeGroups) {
      const [existing] = await db.query('SELECT id FROM age_groups WHERE name = ? LIMIT 1', [ag.name]);
      if (existing.length === 0) {
        await db.query(
          'INSERT INTO age_groups (name, min_age, max_age, color) VALUES (?, ?, ?, ?)',
          [ag.name, ag.min_age, ag.max_age, ag.color]
        );
      }
    }
  } catch (err) {
    console.warn('⚠️ Age groups seed warning:', err.message);
  }

  // 5. Story categories
  try {
    const defaultStoryCategories = [
      { name: 'Bedtime Stories', name_az: 'Gecə hekayələri', slug: 'bedtime', icon: '🌙', color: '#6366f1' },
      { name: 'Daytime Stories', name_az: 'Gündüz hekayələri', slug: 'daytime', icon: '☀️', color: '#f59e0b' },
    ];
    for (const sc of defaultStoryCategories) {
      await db.query(
        `INSERT INTO story_categories (name, name_az, slug, icon, color)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name_az = VALUES(name_az)`,
        [sc.name, sc.name_az, sc.slug, sc.icon, sc.color]
      );
    }
  } catch (err) {
    console.warn('⚠️ Story categories seed warning:', err.message);
  }

  // 6. Video categories
  try {
    const defaultVideoCategories = [
      { name: 'Movements', name_az: 'Hərəkətlər', slug: 'movements', icon: '🏃', color: '#10b981' },
      { name: 'Communication', name_az: 'Ünsiyyət', slug: 'communication', icon: '💬', color: '#6366f1' },
    ];
    for (const vc of defaultVideoCategories) {
      await db.query(
        `INSERT INTO video_categories (name, name_az, slug, icon, color)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name_az = VALUES(name_az)`,
        [vc.name, vc.name_az, vc.slug, vc.icon, vc.color]
      );
    }
  } catch (err) {
    console.warn('⚠️ Video categories seed warning:', err.message);
  }

  // 7. Parent characters
  try {
    const defaultCharacters = [
      { name: 'Rabbit', name_az: 'Dovşan', emoji: '🐰', is_active: 1, sort_order: 1 },
      { name: 'Lion', name_az: 'Aslan', emoji: '🦁', is_active: 1, sort_order: 2 },
      { name: 'Bear', name_az: 'Ayı', emoji: '🐻', is_active: 1, sort_order: 3 },
      { name: 'Fox', name_az: 'Tülkü', emoji: '🦊', is_active: 1, sort_order: 4 },
    ];
    for (const ch of defaultCharacters) {
      const [existing] = await db.query('SELECT id FROM parent_characters WHERE name = ? LIMIT 1', [ch.name]);
      if (existing.length === 0) {
        await db.query(
          'INSERT INTO parent_characters (name, name_az, emoji, is_active, sort_order) VALUES (?, ?, ?, ?, ?)',
          [ch.name, ch.name_az, ch.emoji, ch.is_active, ch.sort_order]
        );
      }
    }
  } catch (err) {
    console.warn('⚠️ Parent characters seed warning:', err.message);
  }

  // 8. Movements
  try {
    const defaultMovements = [
      { name: 'Sit', name_az: 'Otur', command_key: 'sit', icon: '🧘', min_age: 3, max_age: 12, sort_order: 1 },
      { name: 'Stand', name_az: 'Qalx', command_key: 'stand', icon: '🧍', min_age: 3, max_age: 12, sort_order: 2 },
      { name: 'Walk Forward', name_az: 'İrəli get', command_key: 'walkForward', icon: '🚶', min_age: 3, max_age: 12, sort_order: 3 },
      { name: 'Walk Backward', name_az: 'Geri get', command_key: 'walkBackward', icon: '🚶', min_age: 3, max_age: 12, sort_order: 4 },
      { name: 'Move Left', name_az: 'Sola get', command_key: 'moveLeft', icon: '⬅️', min_age: 3, max_age: 12, sort_order: 5 },
      { name: 'Move Right', name_az: 'Sağa get', command_key: 'moveRight', icon: '➡️', min_age: 3, max_age: 12, sort_order: 6 },
      { name: 'Run', name_az: 'Qaç', command_key: 'run', icon: '🏃', min_age: 3, max_age: 12, sort_order: 7 },
      { name: 'Jump', name_az: 'Tullan', command_key: 'jump', icon: '🦘', min_age: 3, max_age: 12, sort_order: 8 },
      { name: 'Wave', name_az: 'Əlini salla', command_key: 'wave', icon: '👋', min_age: 3, max_age: 12, sort_order: 9 },
      { name: 'Nod', name_az: 'Başını salla', command_key: 'nod', icon: '🙆', min_age: 3, max_age: 12, sort_order: 10 },
      { name: 'Spin', name_az: 'Yerində dön', command_key: 'spin', icon: '🌀', min_age: 3, max_age: 12, sort_order: 11 },
      { name: 'Stop', name_az: 'Dayan', command_key: 'stop', icon: '✋', min_age: 3, max_age: 12, sort_order: 12 },
    ];
    for (const m of defaultMovements) {
      await db.query(
        `INSERT INTO movements (name, name_az, command_key, icon, min_age, max_age, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name_az = VALUES(name_az)`,
        [m.name, m.name_az, m.command_key, m.icon, m.min_age, m.max_age, m.sort_order]
      );
    }
  } catch (err) {
    console.warn('⚠️ Movements seed warning:', err.message);
  }

  // 9. Sample stories
  try {
    const defaultStories = [
      {
        title: 'Kiçik Dovşan',
        short_description: 'Kiçik dovşanın meşədəki macərası',
        full_story: 'Bir zamanlar meşədə kiçik bir dovşan yaşayırdı. Hər gün o, meşənin ən gözəl çiçəklərini tapmağa çalışırdı...',
        category_slug: 'bedtime',
        min_age: 3,
        max_age: 6,
        reading_duration_minutes: 5,
        is_bedtime: 1,
      },
      {
        title: 'Günəşli Gün',
        short_description: 'Uşaqların parkdakı əyləncəli günü',
        full_story: 'Bir yay günü, Leyla və onun dostları parka getdilər. Orada yelləncəkdə oynadılar, topu bir-birinə atdılar...',
        category_slug: 'daytime',
        min_age: 4,
        max_age: 8,
        reading_duration_minutes: 7,
        is_bedtime: 0,
      },
    ];
    for (const st of defaultStories) {
      const [existing] = await db.query('SELECT id FROM stories WHERE title = ? LIMIT 1', [st.title]);
      if (existing.length === 0) {
        const [cats] = await db.query('SELECT id FROM story_categories WHERE slug = ? LIMIT 1', [st.category_slug]);
        const catId = cats[0]?.id || null;
        await db.query(
          `INSERT INTO stories (title, short_description, full_story, category_id, min_age, max_age, reading_duration_minutes, is_bedtime, is_published)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
          [st.title, st.short_description, st.full_story, catId, st.min_age, st.max_age, st.reading_duration_minutes, st.is_bedtime]
        );
      }
    }
  } catch (err) {
    console.warn('⚠️ Stories seed warning:', err.message);
  }

  // 10. Sample logic questions
  try {
    const defaultLogic = [
      {
        question_text: 'Hansı fərqlidir?',
        question_type: 'visual',
        min_age: 3,
        max_age: 6,
        difficulty: 'easy',
        answers: [
          { text: '🍎', correct: 0 },
          { text: '🍊', correct: 0 },
          { text: '🚗', correct: 1 },
        ],
      },
      {
        question_text: 'Qırmızı olanı seç',
        question_type: 'color',
        min_age: 3,
        max_age: 5,
        difficulty: 'easy',
        answers: [
          { text: '🍎', correct: 1 },
          { text: '🍌', correct: 0 },
          { text: '🫐', correct: 0 },
        ],
      },
    ];
    for (const lq of defaultLogic) {
      const [existing] = await db.query('SELECT id FROM logic_questions WHERE question_text = ? LIMIT 1', [lq.question_text]);
      if (existing.length === 0) {
        const [inserted] = await db.query(
          `INSERT INTO logic_questions (question_text, question_type, min_age, max_age, difficulty) VALUES (?, ?, ?, ?, ?)`,
          [lq.question_text, lq.question_type, lq.min_age, lq.max_age, lq.difficulty]
        );
        const qId = inserted.insertId;
        for (let i = 0; i < lq.answers.length; i++) {
          const a = lq.answers[i];
          await db.query(
            `INSERT INTO logic_answers (question_id, answer_text, is_correct, sort_order) VALUES (?, ?, ?, ?)`,
            [qId, a.text, a.correct, i + 1]
          );
        }
      }
    }
  } catch (err) {
    console.warn('⚠️ Logic questions seed warning:', err.message);
  }

  // 11. Sample math questions
  try {
    const defaultMath = [
      {
        question_text: 'Neçə alma var?',
        question_type: 'counting',
        visual_elements: '🍎🍎',
        min_age: 3,
        max_age: 5,
        difficulty: 'easy',
        answers: [
          { text: '1', correct: 0 },
          { text: '2', correct: 1 },
          { text: '3', correct: 0 },
        ],
      },
      {
        question_text: 'Neçə dovşan var?',
        question_type: 'counting',
        visual_elements: '🐰🐰🐰',
        min_age: 4,
        max_age: 6,
        difficulty: 'easy',
        answers: [
          { text: '2', correct: 0 },
          { text: '3', correct: 1 },
          { text: '4', correct: 0 },
        ],
      },
    ];
    for (const mq of defaultMath) {
      const [existing] = await db.query('SELECT id FROM math_questions WHERE question_text = ? LIMIT 1', [mq.question_text]);
      if (existing.length === 0) {
        const [inserted] = await db.query(
          `INSERT INTO math_questions (question_text, question_type, visual_elements, min_age, max_age, difficulty) VALUES (?, ?, ?, ?, ?, ?)`,
          [mq.question_text, mq.question_type, mq.visual_elements, mq.min_age, mq.max_age, mq.difficulty]
        );
        const qId = inserted.insertId;
        for (let i = 0; i < mq.answers.length; i++) {
          const a = mq.answers[i];
          await db.query(
            `INSERT INTO math_answers (question_id, answer_text, is_correct, sort_order) VALUES (?, ?, ?, ?)`,
            [qId, a.text, a.correct, i + 1]
          );
        }
      }
    }
  } catch (err) {
    console.warn('⚠️ Math questions seed warning:', err.message);
  }

  // 12. Sample chess lessons
  try {
    const defaultChess = [
      {
        title: 'Şah nədir?',
        description: 'Şahmat oyununda ən vacib fiqur — Şah haqqında öyrənin',
        lesson_type: 'piece_intro',
        min_age: 5,
        max_age: 12,
        difficulty: 'easy',
        sort_order: 1,
      },
      {
        title: 'Vəzir necə hərəkət edir?',
        description: 'Ən güclü fiqur olan Vəzirin hərəkətini öyrənin',
        lesson_type: 'movement_rule',
        min_age: 6,
        max_age: 12,
        difficulty: 'easy',
        sort_order: 2,
      },
      {
        title: 'At necə hərəkət edir?',
        description: 'L şəklində hərəkət edən At fiqurunu tanıyın',
        lesson_type: 'piece_intro',
        min_age: 5,
        max_age: 12,
        difficulty: 'medium',
        sort_order: 3,
      },
    ];
    for (const cl of defaultChess) {
      const [existing] = await db.query('SELECT id FROM chess_lessons WHERE title = ? LIMIT 1', [cl.title]);
      if (existing.length === 0) {
        await db.query(
          `INSERT INTO chess_lessons (title, description, lesson_type, min_age, max_age, difficulty, sort_order, is_active)
           VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
          [cl.title, cl.description, cl.lesson_type, cl.min_age, cl.max_age, cl.difficulty, cl.sort_order]
        );
      }
    }
  } catch (err) {
    console.warn('⚠️ Chess lessons seed warning:', err.message);
  }

  console.log('✅ Database initialization complete!\n');
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
  return rows.map(toSafeUser);
}

export async function createUser({ username, password, displayName, email, role }) {
  const db = getPool();
  const existing = await findUserByUsername(username);
  if (existing) throw new Error('Bu istifadəçi adı artıq mövcuddur!');

  const allowedRoles = ['admin', 'editor', 'therapist', 'parent', 'user'];
  const safeRole = allowedRoles.includes(role) ? role : 'user';
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

  if (updates.username !== undefined && updates.username.trim() !== '') {
    const cleanUsername = updates.username.trim().toLowerCase();
    const existing = await findUserByUsername(cleanUsername);
    if (existing && String(existing.id) !== String(id)) {
      throw new Error('Bu istifadəçi adı artıq başqa istifadəçi tərəfindən istifadə olunur!');
    }
    fields.push('username = ?');
    values.push(cleanUsername);
  }
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
    const allowedRoles = ['admin', 'editor', 'therapist', 'parent', 'user'];
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

// ── Editor Audit Logs & Rollback System ────────────────────────────────

export async function createAuditLog({
  userId,
  userName,
  userDisplayName,
  userRole,
  actionType,
  entityType,
  entityId,
  entityTitle,
  previousState = null,
  newState = null,
}) {
  const db = getPool();
  const [result] = await db.query(
    `INSERT INTO editor_audit_logs 
     (user_id, user_name, user_display_name, user_role, action_type, entity_type, entity_id, entity_title, previous_state, new_state) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      userName,
      userDisplayName,
      userRole || 'editor',
      actionType,
      entityType,
      entityId,
      entityTitle || null,
      previousState ? JSON.stringify(previousState) : null,
      newState ? JSON.stringify(newState) : null,
    ]
  );
  return result.insertId;
}

export async function getAuditLogs(limit = 100) {
  const db = getPool();
  const [rows] = await db.query(
    'SELECT * FROM editor_audit_logs ORDER BY created_at DESC LIMIT ?',
    [parseInt(limit, 10)]
  );
  return rows;
}

export async function getAuditLogById(id) {
  const db = getPool();
  const [rows] = await db.query('SELECT * FROM editor_audit_logs WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

export async function markAuditLogReverted(id, adminName) {
  const db = getPool();
  await db.query(
    'UPDATE editor_audit_logs SET is_reverted = 1, reverted_at = NOW(), reverted_by_name = ? WHERE id = ?',
    [adminName, id]
  );
}

export async function revertAuditLog(auditLogId, adminUser) {
  const db = getPool();
  const log = await getAuditLogById(auditLogId);
  if (!log) throw new Error('Fəaliyyət qeydi tapılmadı!');
  if (log.is_reverted) throw new Error('Bu fəaliyyət artıq əvvəllər ləğv edilib / geri qaytarılıb!');

  const prev = log.previous_state ? JSON.parse(log.previous_state) : null;

  switch (log.entity_type) {
    case 'logic': {
      if (log.action_type === 'delete' && prev) {
        const q = prev.question || prev;
        const [res] = await db.query(
          `INSERT INTO logic_questions (question_text, question_type, image_url, min_age, max_age, difficulty, explanation, is_active)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [q.question_text, q.question_type || 'visual', q.image_url || null, q.min_age || 3, q.max_age || 12, q.difficulty || 'easy', q.explanation || null, q.is_active !== undefined ? q.is_active : 1]
        );
        const newQId = res.insertId;
        const answers = prev.answers || [];
        for (let i = 0; i < answers.length; i++) {
          const a = answers[i];
          await db.query(
            `INSERT INTO logic_answers (question_id, answer_text, image_url, is_correct, sort_order) VALUES (?, ?, ?, ?, ?)`,
            [newQId, a.answer_text, a.image_url || null, a.is_correct ? 1 : 0, a.sort_order || i + 1]
          );
        }
      } else if (log.action_type === 'update' && prev) {
        const q = prev.question || prev;
        await db.query(
          `UPDATE logic_questions SET question_text = ?, question_type = ?, image_url = ?, min_age = ?, max_age = ?, difficulty = ?, explanation = ?, is_active = ? WHERE id = ?`,
          [q.question_text, q.question_type || 'visual', q.image_url || null, q.min_age || 3, q.max_age || 12, q.difficulty || 'easy', q.explanation || null, q.is_active !== undefined ? q.is_active : 1, log.entity_id]
        );
        if (Array.isArray(prev.answers)) {
          await db.query('DELETE FROM logic_answers WHERE question_id = ?', [log.entity_id]);
          for (let i = 0; i < prev.answers.length; i++) {
            const a = prev.answers[i];
            await db.query(
              `INSERT INTO logic_answers (question_id, answer_text, image_url, is_correct, sort_order) VALUES (?, ?, ?, ?, ?)`,
              [log.entity_id, a.answer_text, a.image_url || null, a.is_correct ? 1 : 0, a.sort_order || i + 1]
            );
          }
        }
      } else if (log.action_type === 'create') {
        await db.query('DELETE FROM logic_questions WHERE id = ?', [log.entity_id]);
      }
      break;
    }

    case 'math': {
      if (log.action_type === 'delete' && prev) {
        const q = prev.question || prev;
        const [res] = await db.query(
          `INSERT INTO math_questions (question_text, question_type, visual_elements, min_age, max_age, difficulty, explanation, is_active)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [q.question_text, q.question_type || 'counting', q.visual_elements || null, q.min_age || 3, q.max_age || 12, q.difficulty || 'easy', q.explanation || null, q.is_active !== undefined ? q.is_active : 1]
        );
        const newQId = res.insertId;
        const answers = prev.answers || [];
        for (let i = 0; i < answers.length; i++) {
          const a = answers[i];
          await db.query(
            `INSERT INTO math_answers (question_id, answer_text, is_correct, sort_order) VALUES (?, ?, ?, ?)`,
            [newQId, a.answer_text, a.is_correct ? 1 : 0, a.sort_order || i + 1]
          );
        }
      } else if (log.action_type === 'update' && prev) {
        const q = prev.question || prev;
        await db.query(
          `UPDATE math_questions SET question_text = ?, question_type = ?, visual_elements = ?, min_age = ?, max_age = ?, difficulty = ?, explanation = ?, is_active = ? WHERE id = ?`,
          [q.question_text, q.question_type || 'counting', q.visual_elements || null, q.min_age || 3, q.max_age || 12, q.difficulty || 'easy', q.explanation || null, q.is_active !== undefined ? q.is_active : 1, log.entity_id]
        );
        if (Array.isArray(prev.answers)) {
          await db.query('DELETE FROM math_answers WHERE question_id = ?', [log.entity_id]);
          for (let i = 0; i < prev.answers.length; i++) {
            const a = prev.answers[i];
            await db.query(
              `INSERT INTO math_answers (question_id, answer_text, is_correct, sort_order) VALUES (?, ?, ?, ?)`,
              [log.entity_id, a.answer_text, a.is_correct ? 1 : 0, a.sort_order || i + 1]
            );
          }
        }
      } else if (log.action_type === 'create') {
        await db.query('DELETE FROM math_questions WHERE id = ?', [log.entity_id]);
      }
      break;
    }

    case 'story': {
      if (log.action_type === 'delete' && prev) {
        await db.query(
          `INSERT INTO stories (title, short_description, full_story, cover_image, category_id, min_age, max_age, reading_duration_minutes, is_bedtime, audio_url, is_published)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [prev.title, prev.short_description || null, prev.full_story || null, prev.cover_image || null, prev.category_id || null, prev.min_age || 3, prev.max_age || 12, prev.reading_duration_minutes || 5, prev.is_bedtime ? 1 : 0, prev.audio_url || null, prev.is_published !== undefined ? prev.is_published : 1]
        );
      } else if (log.action_type === 'update' && prev) {
        await db.query(
          `UPDATE stories SET title = ?, short_description = ?, full_story = ?, cover_image = ?, category_id = ?, min_age = ?, max_age = ?, reading_duration_minutes = ?, is_bedtime = ?, audio_url = ?, is_published = ? WHERE id = ?`,
          [prev.title, prev.short_description || null, prev.full_story || null, prev.cover_image || null, prev.category_id || null, prev.min_age || 3, prev.max_age || 12, prev.reading_duration_minutes || 5, prev.is_bedtime ? 1 : 0, prev.audio_url || null, prev.is_published ? 1 : 0, log.entity_id]
        );
      } else if (log.action_type === 'create') {
        await db.query('DELETE FROM stories WHERE id = ?', [log.entity_id]);
      }
      break;
    }

    case 'video': {
      if (log.action_type === 'delete' && prev) {
        await db.query(
          `INSERT INTO videos (title, description, video_url, thumbnail_url, category_id, min_age, max_age, difficulty, duration_seconds, is_published)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [prev.title, prev.description || null, prev.video_url || null, prev.thumbnail_url || null, prev.category_id || null, prev.min_age || 3, prev.max_age || 12, prev.difficulty || 'easy', prev.duration_seconds || null, prev.is_published !== undefined ? prev.is_published : 1]
        );
      } else if (log.action_type === 'update' && prev) {
        await db.query(
          `UPDATE videos SET title = ?, description = ?, video_url = ?, thumbnail_url = ?, category_id = ?, min_age = ?, max_age = ?, difficulty = ?, duration_seconds = ?, is_published = ? WHERE id = ?`,
          [prev.title, prev.description || null, prev.video_url || null, prev.thumbnail_url || null, prev.category_id || null, prev.min_age || 3, prev.max_age || 12, prev.difficulty || 'easy', prev.duration_seconds || null, prev.is_published ? 1 : 0, log.entity_id]
        );
      } else if (log.action_type === 'create') {
        await db.query('DELETE FROM videos WHERE id = ?', [log.entity_id]);
      }
      break;
    }

    case 'chess': {
      if (log.action_type === 'delete' && prev) {
        await db.query(
          `INSERT INTO chess_lessons (title, description, lesson_type, image_url, min_age, max_age, difficulty, sort_order, is_active)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [prev.title, prev.description || null, prev.lesson_type || 'piece_intro', prev.image_url || null, prev.min_age || 5, prev.max_age || 12, prev.difficulty || 'easy', prev.sort_order || 0, prev.is_active !== undefined ? prev.is_active : 1]
        );
      } else if (log.action_type === 'update' && prev) {
        await db.query(
          `UPDATE chess_lessons SET title = ?, description = ?, lesson_type = ?, image_url = ?, min_age = ?, max_age = ?, difficulty = ?, sort_order = ?, is_active = ? WHERE id = ?`,
          [prev.title, prev.description || null, prev.lesson_type || 'piece_intro', prev.image_url || null, prev.min_age || 5, prev.max_age || 12, prev.difficulty || 'easy', prev.sort_order || 0, prev.is_active ? 1 : 0, log.entity_id]
        );
      } else if (log.action_type === 'create') {
        await db.query('DELETE FROM chess_lessons WHERE id = ?', [log.entity_id]);
      }
      break;
    }

    case 'age_group': {
      if (log.action_type === 'delete' && prev) {
        await db.query(
          `INSERT INTO age_groups (name, min_age, max_age, description, color, is_active) VALUES (?, ?, ?, ?, ?, ?)`,
          [prev.name, prev.min_age, prev.max_age, prev.description || null, prev.color || '#6366f1', prev.is_active !== undefined ? prev.is_active : 1]
        );
      } else if (log.action_type === 'update' && prev) {
        await db.query(
          `UPDATE age_groups SET name = ?, min_age = ?, max_age = ?, description = ?, color = ?, is_active = ? WHERE id = ?`,
          [prev.name, prev.min_age, prev.max_age, prev.description || null, prev.color || '#6366f1', prev.is_active ? 1 : 0, log.entity_id]
        );
      } else if (log.action_type === 'create') {
        await db.query('DELETE FROM age_groups WHERE id = ?', [log.entity_id]);
      }
      break;
    }

    default:
      throw new Error(`Bilinməyən kateqoriya: ${log.entity_type}`);
  }

  const adminName = adminUser?.displayName || adminUser?.username || 'Admin';
  await markAuditLogReverted(auditLogId, adminName);
  return { success: true, message: 'Fəaliyyət uğurla ləğv edildi və məlumat bərpa olundu!' };
}
