const { verifyToken } = require('../utils/token');

const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid Authorization header' });
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
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { requireAuth };
