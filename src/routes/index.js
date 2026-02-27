const express = require('express');
const User = require('../models/User');
const Team = require('../models/Team');
const Event = require('../models/Event');
const Config = require('../models/Config');
const createCrudController = require('../controllers/crudController');
const createCrudRoutes = require('./crudRoutes');
const { getLeaderboard } = require('../controllers/leaderboardController');

const router = express.Router();

router.use('/users', createCrudRoutes(createCrudController(User)));
router.use('/teams', createCrudRoutes(createCrudController(Team)));
router.use('/events', createCrudRoutes(createCrudController(Event, 'winner scores.team_id')));
router.use('/config', createCrudRoutes(createCrudController(Config)));

router.post('/leaderboard', getLeaderboard);

module.exports = router;
