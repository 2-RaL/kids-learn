import { Router } from 'express';
import { getPool } from '../db.js';
import { authMiddleware, therapistMiddleware } from '../auth.js';

const router = Router();

// Protect all therapist endpoints with role check
router.use(authMiddleware, therapistMiddleware);

// GET /api/therapist/children - List assigned children with profiles
router.get('/children', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query(`
      SELECT p.*, u.username, u.display_name AS parent_display_name, u.email AS parent_email 
      FROM parent_profiles p 
      JOIN users u ON p.user_id = u.id 
      ORDER BY p.id ASC
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
