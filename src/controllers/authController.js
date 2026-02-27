const User = require('../models/User');
const { createToken } = require('../utils/token');
const { sendResponse } = require('../utils/response');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return sendResponse(res, 400, 'username and password are required', null);
    }

    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return sendResponse(res, 401, 'Invalid credentials', null);
    }

    const secret = process.env.AUTH_SECRET || 'dev-secret-change-me';
    const token = createToken({ userId: user._id.toString(), username: user.username }, secret);

    return sendResponse(res, 200, 'Login successful', {
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
