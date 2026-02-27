const { verifyToken } = require('../utils/token');
const { sendResponse } = require('../utils/response');

const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendResponse(res, 401, 'Missing or invalid Authorization header', null);
    }

    const token = authHeader.replace('Bearer ', '').trim();
    const secret = process.env.AUTH_SECRET || 'dev-secret-change-me';
    const payload = verifyToken(token, secret);

    req.user = {
      id: payload.userId,
      username: payload.username,
    };

    return next();
  } catch (_error) {
    return sendResponse(res, 401, 'Unauthorized', null);
  }
};

module.exports = { requireAuth };
