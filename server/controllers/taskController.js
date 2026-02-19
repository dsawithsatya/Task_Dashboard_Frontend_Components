const pool = require('../config/db');

exports.createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const [result] = await pool.query('INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)', [userId, title, description || '', status || 'pending']);
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    const { title, description, status } = req.body;
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
    if (!rows.length) return res.status(404).json({ message: 'Task not found' });
    await pool.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title || rows[0].title, description || rows[0].description, status || rows[0].status, taskId]);
    const [updated] = await pool.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    return res.json(updated[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
    if (!rows.length) return res.status(404).json({ message: 'Task not found' });
    await pool.query('DELETE FROM tasks WHERE id = ?', [taskId]);
    return res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
