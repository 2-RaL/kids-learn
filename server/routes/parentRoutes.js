import { Router } from 'express';
import { getPool, getParentProfile, upsertParentProfile } from '../db.js';
import { authMiddleware, parentMiddleware } from '../auth.js';

const router = Router();

// Protect all parent routes
router.use(authMiddleware, parentMiddleware);

// ── Parent Profile ───────────────────────────────────────────────────

// GET /api/parent/profile
router.get('/profile', async (req, res) => {
  try {
    const profile = await getParentProfile(req.user.id);
    res.json({ profile });
  } catch (err) {
    console.error('Get parent profile error:', err);
    res.status(500).json({ error: err.message || 'Xəta baş verdi' });
  }
});

// PUT /api/parent/profile
router.put('/profile', async (req, res) => {
  try {
    const { childName, childAge, childGender, ageGroupId } = req.body;
    const updated = await upsertParentProfile(req.user.id, {
      childName,
      childAge: childAge ? parseInt(childAge, 10) : null,
      childGender,
      ageGroupId: ageGroupId ? parseInt(ageGroupId, 10) : null,
    });
    res.json({ profile: updated });
  } catch (err) {
    console.error('Update parent profile error:', err);
    res.status(400).json({ error: err.message || 'Xəta baş verdi' });
  }
});

// ── Age Groups ───────────────────────────────────────────────────────

// GET /api/parent/age-groups
router.get('/age-groups', async (_req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT * FROM age_groups WHERE is_active = 1 ORDER BY min_age ASC');
    res.json({ ageGroups: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Stories ──────────────────────────────────────────────────────────

// GET /api/parent/stories
router.get('/stories', async (req, res) => {
  try {
    const db = getPool();
    const { age, isBedtime, categoryId } = req.query;

    let query = `
      SELECT s.*, c.name_az AS category_name, c.icon AS category_icon 
      FROM stories s 
      LEFT JOIN story_categories c ON s.category_id = c.id 
      WHERE (s.is_published = 1 OR s.is_published IS NULL)
    `;
    const params = [];

    if (age && age !== 'all' && age !== 'null' && age !== 'undefined') {
      const childAge = parseInt(age, 10);
      if (!isNaN(childAge)) {
        query += ' AND s.min_age <= ? AND s.max_age >= ?';
        params.push(childAge, childAge);
      }
    }
    if (isBedtime !== undefined) {
      query += ' AND s.is_bedtime = ?';
      params.push(isBedtime === 'true' || isBedtime === '1' ? 1 : 0);
    }
    if (categoryId) {
      query += ' AND s.category_id = ?';
      params.push(parseInt(categoryId, 10));
    }

    query += ' ORDER BY s.created_at DESC';
    const [stories] = await db.query(query, params);

    const [categories] = await db.query('SELECT * FROM story_categories WHERE is_active = 1');

    res.json({ stories, categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/parent/stories/:id
router.get('/stories/:id', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query(
      `SELECT s.*, c.name_az AS category_name, c.icon AS category_icon 
       FROM stories s 
       LEFT JOIN story_categories c ON s.category_id = c.id 
       WHERE s.id = ? AND (s.is_published = 1 OR s.is_published IS NULL) LIMIT 1`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Hekayə tapılmadı' });
    res.json({ story: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Videos ───────────────────────────────────────────────────────────

// GET /api/parent/videos
router.get('/videos', async (req, res) => {
  try {
    const db = getPool();
    const { age, categoryId, difficulty } = req.query;

    let query = `
      SELECT v.*, c.name_az AS category_name, c.icon AS category_icon, c.slug AS category_slug 
      FROM videos v 
      LEFT JOIN video_categories c ON v.category_id = c.id 
      WHERE v.is_published = 1
    `;
    const params = [];

    if (age) {
      const childAge = parseInt(age, 10);
      query += ' AND v.min_age <= ? AND v.max_age >= ?';
      params.push(childAge, childAge);
    }
    if (categoryId) {
      query += ' AND v.category_id = ?';
      params.push(parseInt(categoryId, 10));
    }
    if (difficulty) {
      query += ' AND v.difficulty = ?';
      params.push(difficulty);
    }

    query += ' ORDER BY v.created_at DESC';
    const [videos] = await db.query(query, params);
    const [categories] = await db.query('SELECT * FROM video_categories WHERE is_active = 1');

    res.json({ videos, categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Characters & Movements ───────────────────────────────────────────

// GET /api/parent/characters
router.get('/characters', async (_req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT * FROM parent_characters WHERE is_active = 1 ORDER BY sort_order ASC');
    res.json({ characters: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/parent/movements
router.get('/movements', async (req, res) => {
  try {
    const db = getPool();
    const { age } = req.query;
    let query = 'SELECT * FROM movements WHERE is_active = 1';
    const params = [];

    if (age) {
      const childAge = parseInt(age, 10);
      query += ' AND min_age <= ? AND max_age >= ?';
      params.push(childAge, childAge);
    }

    query += ' ORDER BY sort_order ASC';
    const [rows] = await db.query(query, params);
    res.json({ movements: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Logic Questions ──────────────────────────────────────────────────

// GET /api/parent/logic-questions
router.get('/logic-questions', async (req, res) => {
  try {
    const db = getPool();
    const { age, difficulty } = req.query;
    let query = 'SELECT * FROM logic_questions WHERE is_active = 1';
    const params = [];

    if (age) {
      const childAge = parseInt(age, 10);
      query += ' AND min_age <= ? AND max_age >= ?';
      params.push(childAge, childAge);
    }
    if (difficulty) {
      query += ' AND difficulty = ?';
      params.push(difficulty);
    }

    query += ' ORDER BY id ASC';
    const [questions] = await db.query(query, params);

    // Fetch answers for these questions
    if (questions.length > 0) {
      const qIds = questions.map(q => q.id);
      const [answers] = await db.query(
        `SELECT * FROM logic_answers WHERE question_id IN (${qIds.map(() => '?').join(',')}) ORDER BY sort_order ASC`,
        qIds
      );
      // Map answers to questions
      const ansByQ = {};
      answers.forEach(a => {
        if (!ansByQ[a.question_id]) ansByQ[a.question_id] = [];
        ansByQ[a.question_id].push(a);
      });
      questions.forEach(q => {
        q.answers = ansByQ[q.id] || [];
      });
    }

    res.json({ questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Math Questions ───────────────────────────────────────────────────

// GET /api/parent/math-questions
router.get('/math-questions', async (req, res) => {
  try {
    const db = getPool();
    const { age, difficulty } = req.query;
    let query = 'SELECT * FROM math_questions WHERE is_active = 1';
    const params = [];

    if (age) {
      const childAge = parseInt(age, 10);
      query += ' AND min_age <= ? AND max_age >= ?';
      params.push(childAge, childAge);
    }
    if (difficulty) {
      query += ' AND difficulty = ?';
      params.push(difficulty);
    }

    query += ' ORDER BY id ASC';
    const [questions] = await db.query(query, params);

    if (questions.length > 0) {
      const qIds = questions.map(q => q.id);
      const [answers] = await db.query(
        `SELECT * FROM math_answers WHERE question_id IN (${qIds.map(() => '?').join(',')}) ORDER BY sort_order ASC`,
        qIds
      );
      const ansByQ = {};
      answers.forEach(a => {
        if (!ansByQ[a.question_id]) ansByQ[a.question_id] = [];
        ansByQ[a.question_id].push(a);
      });
      questions.forEach(q => {
        q.answers = ansByQ[q.id] || [];
      });
    }

    res.json({ questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Chess Lessons ────────────────────────────────────────────────────

// GET /api/parent/chess-lessons
router.get('/chess-lessons', async (req, res) => {
  try {
    const db = getPool();
    const { age, difficulty } = req.query;
    let query = 'SELECT * FROM chess_lessons WHERE is_active = 1';
    const params = [];

    if (age) {
      const childAge = parseInt(age, 10);
      query += ' AND min_age <= ? AND max_age >= ?';
      params.push(childAge, childAge);
    }
    if (difficulty) {
      query += ' AND difficulty = ?';
      params.push(difficulty);
    }

    query += ' ORDER BY sort_order ASC';
    const [lessons] = await db.query(query, params);
    res.json({ lessons });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Parent Assigned Homework & Progress ──────────────────────────────

// GET /api/parent/homework
router.get('/homework', async (req, res) => {
  try {
    const db = getPool();
    // Find parent's child profile
    const [profiles] = await db.query('SELECT id FROM parent_profiles WHERE user_id = ? LIMIT 1', [req.user.id]);
    const childId = profiles[0]?.id ? `ch-${profiles[0].id}` : `user-${req.user.id}`;

    const [rows] = await db.query(
      'SELECT * FROM homework_assignments WHERE child_id = ? OR child_id = "ch-1" ORDER BY id DESC',
      [childId]
    );
    res.json({ homework: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/parent/homework/:id/complete
router.put('/homework/:id/complete', async (req, res) => {
  try {
    const db = getPool();
    const { score } = req.body;
    await db.query(
      `UPDATE homework_assignments 
       SET status = 'completed', score = ?, attempts_count = attempts_count + 1, completed_date = CURRENT_DATE 
       WHERE id = ?`,
      [score || 100, req.params.id]
    );
    res.json({ success: true, message: 'Ev tapşırığı tamamlandı' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/parent/offline-activities
router.get('/offline-activities', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT * FROM parent_offline_activities ORDER BY id ASC');
    res.json({ activities: rows });
  } catch (err) {
    res.json({ activities: [] });
  }
});

// GET /api/parent/conversation-prompts
router.get('/conversation-prompts', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT * FROM conversation_prompts ORDER BY id ASC');
    res.json({ prompts: rows });
  } catch (err) {
    res.json({ prompts: [] });
  }
});

export default router;
