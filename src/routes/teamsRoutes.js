const express = require('express');
const {
  createTeam,
  getTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
  addTeamMember,
  removeTeamMember,
} = require('../controllers/teamsController');

const router = express.Router();

router.post('/', createTeam);
router.get('/', getTeams);
router.get('/:id', getTeamById);
router.put('/:id', updateTeamById);
router.delete('/:id', deleteTeamById);

router.post('/:id/members', addTeamMember);
router.delete('/:id/members', removeTeamMember);

module.exports = router;
