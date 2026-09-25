import { Router } from 'express';
import { getAllUsers, createUser, updateUser, deleteUser } from '../db.js';
import { authMiddleware, adminMiddleware } from '../auth.js';

const router = Router();

// Protect all admin routes
router.use(authMiddleware, adminMiddleware);

// GET /api/admin/users — List all users
router.get('/users', async (_req, res) => {
  try {
    const users = await getAllUsers();
    res.json({ users });
  } catch (err) {
    console.error('List users error:', err);
    res.status(500).json({ error: err.message || 'Xəta baş verdi' });
  }
});

// POST /api/admin/users — Create a new user
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
      role: role === 'admin' ? 'admin' : 'user',
    });

    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error('Create user error:', err);
    res.status(400).json({ error: err.message || 'Xəta baş verdi' });
  }
});

// PUT /api/admin/users/:id — Update user
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

// DELETE /api/admin/users/:id — Delete a user
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

export default router;
