import { Router } from 'express';
import { getPool } from '../db.js';
import { authMiddleware, therapistMiddleware } from '../auth.js';

const router = Router();

// Protect all therapist endpoints with role check
router.use(authMiddleware, therapistMiddleware);

// GET /api/therapist/parent-users - List all real registered parent users directly from MySQL
router.get('/parent-users', async (_req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query(`
      SELECT 
        u.id, 
        u.username, 
        u.display_name, 
        u.email, 
        u.role, 
        u.portal_access, 
        u.is_active,
        u.created_at,
        p.id AS profile_id,
        p.child_name, 
        p.child_age, 
        p.child_gender
      FROM users u
      LEFT JOIN parent_profiles p ON p.user_id = u.id
      WHERE (u.role IN ('parent', 'user') OR u.portal_access IN ('both', 'parent'))
        AND u.role NOT IN ('admin')
        AND u.is_active = 1
      ORDER BY u.id DESC
    `);

    const parentUsers = rows.map((u) => {
      const childName = (u.child_name && u.child_name.trim()) || u.display_name || u.username;
      const childAge = u.child_age ? Number(u.child_age) : 5;
      const childGender = u.child_gender === 'girl' ? 'girl' : 'boy';
      return {
        id: String(u.id),
        username: u.username,
        parentName: u.display_name || u.username,
        childName,
        childAge,
        childGender,
        avatarEmoji: childGender === 'girl' ? '👧' : '👦',
        childEmoji: childGender === 'girl' ? '👧' : '👦',
        phone: u.email || '',
        email: u.email || '',
        registeredAt: u.created_at ? new Date(u.created_at).toISOString().split('T')[0] : '',
        therapistNotesSummary: '',
        role: u.role,
      };
    });

    res.json({ parentUsers });
  } catch (err) {
    console.error('Error fetching parent users:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/therapist/children - List assigned children with profiles
router.get('/children', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query(`
      SELECT 
        p.*, 
        u.id AS user_id,
        u.username, 
        u.display_name AS parent_display_name, 
        u.email AS parent_email 
      FROM users u
      LEFT JOIN parent_profiles p ON p.user_id = u.id
      WHERE (u.role IN ('parent', 'user') OR u.portal_access IN ('both', 'parent'))
        AND u.role NOT IN ('admin')
        AND u.is_active = 1
      ORDER BY u.id ASC
    `);
    res.json({ children: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/therapist/goals/:childId - Get goals for child
router.get('/goals/:childId', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query(
      'SELECT * FROM therapy_goals WHERE child_id = ? ORDER BY id DESC',
      [req.params.childId]
    );
    res.json({ goals: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/therapist/goals - Create new therapy goal
router.post('/goals', async (req, res) => {
  try {
    const db = getPool();
    const { childId, titleAz, descriptionAz, category, targetPercent, targetDate } = req.body;

    const [result] = await db.query(
      `INSERT INTO therapy_goals (child_id, therapist_id, title_az, description_az, category, target_percent, target_date)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        childId,
        req.user.id,
        titleAz,
        descriptionAz || '',
        category || 'Artikulyasiya',
        targetPercent || 100,
        targetDate || null,
      ]
    );

    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/therapist/goals/:id - Update therapy goal progress
router.put('/goals/:id', async (req, res) => {
  try {
    const db = getPool();
    const { currentPercent, status, notes } = req.body;

    await db.query(
      `UPDATE therapy_goals 
       SET current_percent = COALESCE(?, current_percent), 
           status = COALESCE(?, status), 
           notes = COALESCE(?, notes),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [currentPercent, status, notes, req.params.id]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/therapist/homework - Assign homework to child
router.post('/homework', async (req, res) => {
  try {
    const db = getPool();
    const { childId, activityId, activityTitle, category, instructions, dueDate, targetSkill, parentNote } = req.body;

    const [result] = await db.query(
      `INSERT INTO homework_assignments 
       (child_id, therapist_id, activity_id, activity_title, category, instructions, assigned_date, due_date, target_skill, parent_note, status)
       VALUES (?, ?, ?, ?, ?, ?, CURRENT_DATE, ?, ?, ?, 'assigned')`,
      [
        childId,
        req.user.id,
        activityId,
        activityTitle,
        category || '',
        instructions,
        dueDate,
        targetSkill || null,
        parentNote || null,
      ]
    );

    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/therapist/homework - Get all assigned homework or by childId
router.get('/homework', async (req, res) => {
  try {
    const db = getPool();
    const { childId } = req.query;
    let query = 'SELECT * FROM homework_assignments';
    const params = [];
    if (childId) {
      query += ' WHERE child_id = ?';
      params.push(childId);
    }
    query += ' ORDER BY id DESC';
    const [rows] = await db.query(query, params);
    res.json({ homework: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/therapist/homework/:childId - Get homework history
router.get('/homework/:childId', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query(
      'SELECT * FROM homework_assignments WHERE child_id = ? ORDER BY id DESC',
      [req.params.childId]
    );
    res.json({ homework: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/therapist/notes - Add session note
router.post('/notes', async (req, res) => {
  try {
    const db = getPool();
    const { childId, sessionDate, activityPerformed, observations, progress, difficulties, nextSessionPlan } = req.body;

    const [result] = await db.query(
      `INSERT INTO therapist_session_notes 
       (child_id, therapist_id, therapist_name, session_date, activity_performed, observations, progress, difficulties, next_session_plan)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        childId,
        req.user.id,
        req.user.displayName || 'Loqoped',
        sessionDate || new Date().toISOString().split('T')[0],
        activityPerformed,
        observations || '',
        progress || '',
        difficulties || '',
        nextSessionPlan || '',
      ]
    );

    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/therapist/notes - Get all session notes or by childId
router.get('/notes', async (req, res) => {
  try {
    const db = getPool();
    const { childId } = req.query;
    let query = 'SELECT * FROM therapist_session_notes';
    const params = [];
    if (childId) {
      query += ' WHERE child_id = ?';
      params.push(childId);
    }
    query += ' ORDER BY session_date DESC, id DESC';
    const [rows] = await db.query(query, params);
    res.json({ notes: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/therapist/notes/:childId - Get session notes
router.get('/notes/:childId', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query(
      'SELECT * FROM therapist_session_notes WHERE child_id = ? ORDER BY session_date DESC, id DESC',
      [req.params.childId]
    );
    res.json({ notes: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
