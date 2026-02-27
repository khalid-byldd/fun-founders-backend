const { eq } = require('drizzle-orm');
const { db } = require('../db/client');
const { users } = require('../db/schema');
const { createToken } = require('../utils/token');
const { sendResponse } = require('../utils/response');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return sendResponse(res, 400, 'username and password are required', null);
    }

    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);

    if (!user || user.password !== password) {
      return sendResponse(res, 401, 'Invalid credentials', null);
    }

    const secret = process.env.AUTH_SECRET || 'dev-secret-change-me';
    const token = createToken({ userId: user.id, username: user.username }, secret);

    return sendResponse(res, 200, 'Login successful', {
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
