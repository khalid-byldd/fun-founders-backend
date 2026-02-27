const User = require('../models/User');
const { createToken } = require('../utils/token');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'username and password are required' });
    }

    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const secret = process.env.AUTH_SECRET || 'dev-secret-change-me';
    const token = createToken({ userId: user._id.toString(), username: user.username }, secret);

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
