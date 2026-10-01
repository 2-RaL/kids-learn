import { Router } from 'express';
import { getPool } from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();

// GET /api/learning/categories - List all active learning modules
router.get('/categories', async (req, res) => {
  try {
    const db = getPool();
    const { age, group } = req.query;

    let query = 'SELECT * FROM learning_categories WHERE is_active = 1';
    const params = [];

    if (group && group !== 'all') {
      query += ' AND category_group = ?';
      params.push(group);
    }

    if (age) {
      const childAge = parseInt(age, 10);
      if (!isNaN(childAge)) {
        query += ' AND min_age <= ? AND max_age >= ?';
        params.push(childAge, childAge);
      }
    }

    query += ' ORDER BY min_age ASC, id ASC';
    const [rows] = await db.query(query, params);

    res.json({ categories: rows });
  } catch (err) {
    // If table doesn't exist yet or connection error, return empty gracefully
    console.warn('Learning categories fetch error:', err.message);
    res.json({ categories: [] });
  }
});

// POST /api/learning/progress - Record activity completion
router.post('/progress', authMiddleware, async (req, res) => {
  try {
    const db = getPool();
    const { childId, moduleId, activityId, score } = req.body;
    const userId = req.user.id;

    await db.query(
      `INSERT INTO child_activity_progress (user_id, child_id, module_id, activity_id, score)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, childId || null, moduleId, activityId || null, score || 0]
    );

    res.json({ success: true, message: 'Fəaliyyət qeydə alındı' });
  } catch (err) {
    console.error('Progress record error:', err);
    res.status(500).json({ error: err.message || 'Xəta baş verdi' });
  }
});

export default router;
