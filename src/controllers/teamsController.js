const Team = require('../models/Team');

const createTeam = async (req, res, next) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
};

const getTeams = async (_req, res, next) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    next(error);
  }
};

const getTeamById = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json(team);
  } catch (error) {
    next(error);
  }
};

const updateTeamById = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json(team);
  } catch (error) {
    next(error);
  }
};

const deleteTeamById = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const addTeamMember = async (req, res, next) => {
  try {
    const { member } = req.body;

    if (!member || typeof member !== 'string') {
      return res.status(400).json({ message: 'member (string) is required in body' });
    }

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: member } },
      { new: true, runValidators: true }
    );

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json(team);
  } catch (error) {
    next(error);
  }
};

const removeTeamMember = async (req, res, next) => {
  try {
    const { member } = req.body;

    if (!member || typeof member !== 'string') {
      return res.status(400).json({ message: 'member (string) is required in body' });
    }

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: member } },
      { new: true, runValidators: true }
    );

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json(team);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTeam,
  getTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
  addTeamMember,
  removeTeamMember,
};
