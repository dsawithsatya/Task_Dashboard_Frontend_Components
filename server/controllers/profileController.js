const pool = require('../config/db');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [userId]);
    if (!rows.length) return res.status(404).json({ message: 'User not found' });
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Missing fields' });
    await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId]);
    const [rows] = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [userId]);
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
