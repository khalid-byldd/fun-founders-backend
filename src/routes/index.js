const express = require('express');
const usersRoutes = require('./usersRoutes');
const teamsRoutes = require('./teamsRoutes');
const eventsRoutes = require('./eventsRoutes');
const configRoutes = require('./configRoutes');
const { getLeaderboard } = require('../controllers/leaderboardController');

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/teams', teamsRoutes);
router.use('/events', eventsRoutes);
router.use('/config', configRoutes);

router.post('/leaderboard', getLeaderboard);

module.exports = router;
