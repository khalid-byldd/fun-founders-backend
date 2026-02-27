const express = require('express');
const teamsRoutes = require('./teamsRoutes');
const eventsRoutes = require('./eventsRoutes');
const configRoutes = require('./configRoutes');
const authRoutes = require('./authRoutes');
const { getLeaderboard } = require('../controllers/leaderboardController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.use('/auth', authRoutes);

router.use(requireAuth);
router.use('/teams', teamsRoutes);
router.use('/events', eventsRoutes);
router.use('/config', configRoutes);

router.post('/leaderboard', getLeaderboard);

module.exports = router;
