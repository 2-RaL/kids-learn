import { Router } from 'express';
import { getPool, getAllUsers, createUser, updateUser, deleteUser } from '../db.js';
import { authMiddleware, adminMiddleware } from '../auth.js';

const router = Router();

// Protect all admin routes
router.use(authMiddleware, adminMiddleware);

// ── GET /api/admin/stats — Dashboard summary ──────────────────────────
router.get('/stats', async (_req, res) => {
  try {
    const db = getPool();
    const [[users]] = await db.query('SELECT COUNT(*) as total, SUM(CASE WHEN role="therapist" THEN 1 ELSE 0 END) as therapists, SUM(CASE WHEN role="parent" THEN 1 ELSE 0 END) as parents FROM users');
    const [[stories]] = await db.query('SELECT COUNT(*) as count FROM stories');
    const [[videos]] = await db.query('SELECT COUNT(*) as count FROM videos');
    const [[logic]] = await db.query('SELECT COUNT(*) as count FROM logic_questions');
    const [[math]] = await db.query('SELECT COUNT(*) as count FROM math_questions');
    const [[chess]] = await db.query('SELECT COUNT(*) as count FROM chess_lessons');
    const [[movements]] = await db.query('SELECT COUNT(*) as count FROM movements');

    res.json({
      stats: {
        totalUsers: users.total || 0,
        therapists: users.therapists || 0,
        parents: users.parents || 0,
        stories: stories.count || 0,
        videos: videos.count || 0,
        logicQuestions: logic.count || 0,
        mathQuestions: math.count || 0,
        chessLessons: chess.count || 0,
        movements: movements.count || 0,
      }
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── User Management ───────────────────────────────────────────────────

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const { role } = req.query;
    const users = await getAllUsers(role || null);
    res.json({ users });
  } catch (err) {
    console.error('List users error:', err);
    res.status(500).json({ error: err.message || 'Xəta baş verdi' });
  }
});

// POST /api/admin/users
router.post('/users', async (req, res) => {
  try {
    const { username, password, displayName, email, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'İstifadəçi adı və şifrə mütləqdir!' });
    }
    if (password.length < 4) {
      return res.status(400).json({ error: 'Şifrə ən az 4 simvoldan ibarət olmalıdır!' });
    }

    const newUser = await createUser({
      username,
      password,
      displayName: displayName || username,
      email: email || null,
      role: ['admin', 'therapist', 'parent'].includes(role) ? role : 'therapist',
    });

    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error('Create user error:', err);
    res.status(400).json({ error: err.message || 'Xəta baş verdi' });
  }
});

// PUT /api/admin/users/:id
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { password, displayName, email, role, isActive } = req.body;

    const updated = await updateUser(parseInt(id, 10), {
      ...(password ? { password } : {}),
      ...(displayName !== undefined ? { displayName } : {}),
      ...(email !== undefined ? { email } : {}),
      ...(role !== undefined ? { role } : {}),
      ...(isActive !== undefined ? { isActive } : {}),
    });

    res.json({ user: updated });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(400).json({ error: err.message || 'Xəta baş verdi' });
  }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const currentAdminId = req.user?.id || 0;

    await deleteUser(parseInt(id, 10), currentAdminId);
    res.json({ success: true, message: 'İstifadəçi uğurla silindi' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(400).json({ error: err.message || 'Silinmə zamanı xəta baş verdi' });
  }
});

// ── Age Groups CRUD ───────────────────────────────────────────────────

router.get('/age-groups', async (_req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT * FROM age_groups ORDER BY min_age ASC');
    res.json({ ageGroups: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/age-groups', async (req, res) => {
  try {
    const db = getPool();
    const { name, minAge, maxAge, description, color, isActive } = req.body;
    const [result] = await db.query(
      'INSERT INTO age_groups (name, min_age, max_age, description, color, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [name, parseInt(minAge, 10), parseInt(maxAge, 10), description || null, color || '#6366f1', isActive !== false ? 1 : 0]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/age-groups/:id', async (req, res) => {
  try {
    const db = getPool();
    const { name, minAge, maxAge, description, color, isActive } = req.body;
    await db.query(
      'UPDATE age_groups SET name = ?, min_age = ?, max_age = ?, description = ?, color = ?, is_active = ? WHERE id = ?',
      [name, parseInt(minAge, 10), parseInt(maxAge, 10), description || null, color || '#6366f1', isActive ? 1 : 0, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/age-groups/:id', async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM age_groups WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── Stories CRUD ──────────────────────────────────────────────────────

router.get('/stories', async (_req, res) => {
  try {
    const db = getPool();
    const [stories] = await db.query(`
      SELECT s.*, c.name_az AS category_name 
      FROM stories s 
      LEFT JOIN story_categories c ON s.category_id = c.id 
      ORDER BY s.id DESC
    `);
    const [categories] = await db.query('SELECT * FROM story_categories');
    res.json({ stories, categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/stories', async (req, res) => {
  try {
    const db = getPool();
    const { title, shortDescription, fullStory, coverImage, categoryId, minAge, maxAge, readingDurationMinutes, isBedtime, audioUrl, isPublished } = req.body;
    const [result] = await db.query(
      `INSERT INTO stories (title, short_description, full_story, cover_image, category_id, min_age, max_age, reading_duration_minutes, is_bedtime, audio_url, is_published) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        shortDescription || null,
        fullStory || null,
        coverImage || null,
        categoryId ? parseInt(categoryId, 10) : null,
        parseInt(minAge || 3, 10),
        parseInt(maxAge || 12, 10),
        parseInt(readingDurationMinutes || 5, 10),
        isBedtime ? 1 : 0,
        audioUrl || null,
        isPublished !== false ? 1 : 0,
      ]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/stories/:id', async (req, res) => {
  try {
    const db = getPool();
    const { title, shortDescription, fullStory, coverImage, categoryId, minAge, maxAge, readingDurationMinutes, isBedtime, audioUrl, isPublished } = req.body;
    await db.query(
      `UPDATE stories SET 
        title = ?, short_description = ?, full_story = ?, cover_image = ?, 
        category_id = ?, min_age = ?, max_age = ?, reading_duration_minutes = ?, 
        is_bedtime = ?, audio_url = ?, is_published = ? 
       WHERE id = ?`,
      [
        title,
        shortDescription || null,
        fullStory || null,
        coverImage || null,
        categoryId ? parseInt(categoryId, 10) : null,
        parseInt(minAge || 3, 10),
        parseInt(maxAge || 12, 10),
        parseInt(readingDurationMinutes || 5, 10),
        isBedtime ? 1 : 0,
        audioUrl || null,
        isPublished ? 1 : 0,
        req.params.id,
      ]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/stories/:id', async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM stories WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── Videos CRUD ───────────────────────────────────────────────────────

router.get('/videos', async (_req, res) => {
  try {
    const db = getPool();
    const [videos] = await db.query(`
      SELECT v.*, c.name_az AS category_name 
      FROM videos v 
      LEFT JOIN video_categories c ON v.category_id = c.id 
      ORDER BY v.id DESC
    `);
    const [categories] = await db.query('SELECT * FROM video_categories');
    res.json({ videos, categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/videos', async (req, res) => {
  try {
    const db = getPool();
    const { title, description, videoUrl, thumbnailUrl, categoryId, minAge, maxAge, difficulty, durationSeconds, isPublished } = req.body;
    const [result] = await db.query(
      `INSERT INTO videos (title, description, video_url, thumbnail_url, category_id, min_age, max_age, difficulty, duration_seconds, is_published) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || null,
        videoUrl || null,
        thumbnailUrl || null,
        categoryId ? parseInt(categoryId, 10) : null,
        parseInt(minAge || 3, 10),
        parseInt(maxAge || 12, 10),
        difficulty || 'easy',
        durationSeconds ? parseInt(durationSeconds, 10) : null,
        isPublished !== false ? 1 : 0,
      ]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/videos/:id', async (req, res) => {
  try {
    const db = getPool();
    const { title, description, videoUrl, thumbnailUrl, categoryId, minAge, maxAge, difficulty, durationSeconds, isPublished } = req.body;
    await db.query(
      `UPDATE videos SET 
        title = ?, description = ?, video_url = ?, thumbnail_url = ?, 
        category_id = ?, min_age = ?, max_age = ?, difficulty = ?, 
        duration_seconds = ?, is_published = ? 
       WHERE id = ?`,
      [
        title,
        description || null,
        videoUrl || null,
        thumbnailUrl || null,
        categoryId ? parseInt(categoryId, 10) : null,
        parseInt(minAge || 3, 10),
        parseInt(maxAge || 12, 10),
        difficulty || 'easy',
        durationSeconds ? parseInt(durationSeconds, 10) : null,
        isPublished ? 1 : 0,
        req.params.id,
      ]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/videos/:id', async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM videos WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── Characters & Movements CRUD ───────────────────────────────────────

router.get('/characters', async (_req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT * FROM parent_characters ORDER BY sort_order ASC');
    res.json({ characters: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/characters', async (req, res) => {
  try {
    const db = getPool();
    const { name, nameAz, emoji, imageUrl, description, isActive, sortOrder } = req.body;
    const [result] = await db.query(
      'INSERT INTO parent_characters (name, name_az, emoji, image_url, description, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, nameAz || name, emoji || '🐰', imageUrl || null, description || null, isActive !== false ? 1 : 0, parseInt(sortOrder || 0, 10)]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/characters/:id', async (req, res) => {
  try {
    const db = getPool();
    const { name, nameAz, emoji, imageUrl, description, isActive, sortOrder } = req.body;
    await db.query(
      'UPDATE parent_characters SET name = ?, name_az = ?, emoji = ?, image_url = ?, description = ?, is_active = ?, sort_order = ? WHERE id = ?',
      [name, nameAz || name, emoji || '🐰', imageUrl || null, description || null, isActive ? 1 : 0, parseInt(sortOrder || 0, 10), req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/characters/:id', async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM parent_characters WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/movements', async (_req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT * FROM movements ORDER BY sort_order ASC');
    res.json({ movements: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/movements', async (req, res) => {
  try {
    const db = getPool();
    const { name, nameAz, commandKey, icon, description, minAge, maxAge, isActive, sortOrder } = req.body;
    const [result] = await db.query(
      'INSERT INTO movements (name, name_az, command_key, icon, description, min_age, max_age, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, nameAz || name, commandKey, icon || '🏃', description || null, parseInt(minAge || 3, 10), parseInt(maxAge || 12, 10), isActive !== false ? 1 : 0, parseInt(sortOrder || 0, 10)]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/movements/:id', async (req, res) => {
  try {
    const db = getPool();
    const { name, nameAz, commandKey, icon, description, minAge, maxAge, isActive, sortOrder } = req.body;
    await db.query(
      'UPDATE movements SET name = ?, name_az = ?, command_key = ?, icon = ?, description = ?, min_age = ?, max_age = ?, is_active = ?, sort_order = ? WHERE id = ?',
      [name, nameAz || name, commandKey, icon || '🏃', description || null, parseInt(minAge || 3, 10), parseInt(maxAge || 12, 10), isActive ? 1 : 0, parseInt(sortOrder || 0, 10), req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/movements/:id', async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM movements WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── Logic Questions CRUD ──────────────────────────────────────────────

router.get('/logic-questions', async (_req, res) => {
  try {
    const db = getPool();
    const [questions] = await db.query('SELECT * FROM logic_questions ORDER BY id DESC');
    if (questions.length > 0) {
      const qIds = questions.map(q => q.id);
      const [answers] = await db.query(
        `SELECT * FROM logic_answers WHERE question_id IN (${qIds.map(() => '?').join(',')}) ORDER BY sort_order ASC`,
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

router.post('/logic-questions', async (req, res) => {
  try {
    const db = getPool();
    const { questionText, questionType, imageUrl, minAge, maxAge, difficulty, explanation, isActive, answers } = req.body;
    const [result] = await db.query(
      `INSERT INTO logic_questions (question_text, question_type, image_url, min_age, max_age, difficulty, explanation, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [questionText, questionType || 'visual', imageUrl || null, parseInt(minAge || 3, 10), parseInt(maxAge || 12, 10), difficulty || 'easy', explanation || null, isActive !== false ? 1 : 0]
    );

    const questionId = result.insertId;
    if (answers && Array.isArray(answers)) {
      for (let i = 0; i < answers.length; i++) {
        const a = answers[i];
        await db.query(
          'INSERT INTO logic_answers (question_id, answer_text, image_url, is_correct, sort_order) VALUES (?, ?, ?, ?, ?)',
          [questionId, a.answerText || a.answer_text, a.imageUrl || a.image_url || null, a.isCorrect ? 1 : 0, i + 1]
        );
      }
    }

    res.status(201).json({ id: questionId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/logic-questions/:id', async (req, res) => {
  try {
    const db = getPool();
    const { questionText, questionType, imageUrl, minAge, maxAge, difficulty, explanation, isActive, answers } = req.body;
    const qId = req.params.id;

    await db.query(
      `UPDATE logic_questions SET 
        question_text = ?, question_type = ?, image_url = ?, min_age = ?, 
        max_age = ?, difficulty = ?, explanation = ?, is_active = ? 
       WHERE id = ?`,
      [questionText, questionType || 'visual', imageUrl || null, parseInt(minAge || 3, 10), parseInt(maxAge || 12, 10), difficulty || 'easy', explanation || null, isActive ? 1 : 0, qId]
    );

    if (answers && Array.isArray(answers)) {
      await db.query('DELETE FROM logic_answers WHERE question_id = ?', [qId]);
      for (let i = 0; i < answers.length; i++) {
        const a = answers[i];
        await db.query(
          'INSERT INTO logic_answers (question_id, answer_text, image_url, is_correct, sort_order) VALUES (?, ?, ?, ?, ?)',
          [qId, a.answerText || a.answer_text, a.imageUrl || a.image_url || null, a.isCorrect ? 1 : 0, i + 1]
        );
      }
    }

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/logic-questions/:id', async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM logic_questions WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── Math Questions CRUD ───────────────────────────────────────────────

router.get('/math-questions', async (_req, res) => {
  try {
    const db = getPool();
    const [questions] = await db.query('SELECT * FROM math_questions ORDER BY id DESC');
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

router.post('/math-questions', async (req, res) => {
  try {
    const db = getPool();
    const { questionText, questionType, visualElements, minAge, maxAge, difficulty, explanation, isActive, answers } = req.body;
    const [result] = await db.query(
      `INSERT INTO math_questions (question_text, question_type, visual_elements, min_age, max_age, difficulty, explanation, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [questionText, questionType || 'counting', visualElements || null, parseInt(minAge || 3, 10), parseInt(maxAge || 12, 10), difficulty || 'easy', explanation || null, isActive !== false ? 1 : 0]
    );

    const questionId = result.insertId;
    if (answers && Array.isArray(answers)) {
      for (let i = 0; i < answers.length; i++) {
        const a = answers[i];
        await db.query(
          'INSERT INTO math_answers (question_id, answer_text, is_correct, sort_order) VALUES (?, ?, ?, ?)',
          [questionId, a.answerText || a.answer_text, a.isCorrect ? 1 : 0, i + 1]
        );
      }
    }

    res.status(201).json({ id: questionId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/math-questions/:id', async (req, res) => {
  try {
    const db = getPool();
    const { questionText, questionType, visualElements, minAge, maxAge, difficulty, explanation, isActive, answers } = req.body;
    const qId = req.params.id;

    await db.query(
      `UPDATE math_questions SET 
        question_text = ?, question_type = ?, visual_elements = ?, min_age = ?, 
        max_age = ?, difficulty = ?, explanation = ?, is_active = ? 
       WHERE id = ?`,
      [questionText, questionType || 'counting', visualElements || null, parseInt(minAge || 3, 10), parseInt(maxAge || 12, 10), difficulty || 'easy', explanation || null, isActive ? 1 : 0, qId]
    );

    if (answers && Array.isArray(answers)) {
      await db.query('DELETE FROM math_answers WHERE question_id = ?', [qId]);
      for (let i = 0; i < answers.length; i++) {
        const a = answers[i];
        await db.query(
          'INSERT INTO math_answers (question_id, answer_text, is_correct, sort_order) VALUES (?, ?, ?, ?)',
          [qId, a.answerText || a.answer_text, a.isCorrect ? 1 : 0, i + 1]
        );
      }
    }

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/math-questions/:id', async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM math_questions WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── Chess Lessons CRUD ────────────────────────────────────────────────

router.get('/chess-lessons', async (_req, res) => {
  try {
    const db = getPool();
    const [lessons] = await db.query('SELECT * FROM chess_lessons ORDER BY sort_order ASC');
    res.json({ lessons });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/chess-lessons', async (req, res) => {
  try {
    const db = getPool();
    const { title, description, lessonType, imageUrl, content, minAge, maxAge, difficulty, sortOrder, isActive } = req.body;
    const [result] = await db.query(
      `INSERT INTO chess_lessons (title, description, lesson_type, image_url, content, min_age, max_age, difficulty, sort_order, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description || null, lessonType || 'piece_intro', imageUrl || null, content || null, parseInt(minAge || 5, 10), parseInt(maxAge || 12, 10), difficulty || 'easy', parseInt(sortOrder || 0, 10), isActive !== false ? 1 : 0]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/chess-lessons/:id', async (req, res) => {
  try {
    const db = getPool();
    const { title, description, lessonType, imageUrl, content, minAge, maxAge, difficulty, sortOrder, isActive } = req.body;
    await db.query(
      `UPDATE chess_lessons SET 
        title = ?, description = ?, lesson_type = ?, image_url = ?, 
        content = ?, min_age = ?, max_age = ?, difficulty = ?, 
        sort_order = ?, is_active = ? 
       WHERE id = ?`,
      [title, description || null, lessonType || 'piece_intro', imageUrl || null, content || null, parseInt(minAge || 5, 10), parseInt(maxAge || 12, 10), difficulty || 'easy', parseInt(sortOrder || 0, 10), isActive ? 1 : 0, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/chess-lessons/:id', async (req, res) => {
  try {
    const db = getPool();
    await db.query('DELETE FROM chess_lessons WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
