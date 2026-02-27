const Team = require('../models/Team');
const { sendResponse } = require('../utils/response');

const createTeam = async (req, res, next) => {
  try {
    const team = await Team.create(req.body);
    return sendResponse(res, 201, 'Team created successfully', team);
  } catch (error) {
    next(error);
  }
};

const getTeams = async (_req, res, next) => {
  try {
    const teams = await Team.find();
    return sendResponse(res, 200, 'Teams fetched successfully', teams);
  } catch (error) {
    next(error);
  }
};

const getTeamById = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return sendResponse(res, 404, 'Team not found', null);
    }

    return sendResponse(res, 200, 'Team fetched successfully', team);
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
      return sendResponse(res, 404, 'Team not found', null);
    }

    return sendResponse(res, 200, 'Team updated successfully', team);
  } catch (error) {
    next(error);
  }
};

const deleteTeamById = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team) {
      return sendResponse(res, 404, 'Team not found', null);
    }

    return sendResponse(res, 200, 'Team deleted successfully', team);
  } catch (error) {
    next(error);
  }
};

const addTeamMember = async (req, res, next) => {
  try {
    const { member } = req.body;

    if (!member || typeof member !== 'string') {
      return sendResponse(res, 400, 'member (string) is required in body', null);
    }

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: member } },
      { new: true, runValidators: true }
    );

    if (!team) {
      return sendResponse(res, 404, 'Team not found', null);
    }

    return sendResponse(res, 200, 'Team member added successfully', team);
  } catch (error) {
    next(error);
  }
};

const removeTeamMember = async (req, res, next) => {
  try {
    const { member } = req.body;

    if (!member || typeof member !== 'string') {
      return sendResponse(res, 400, 'member (string) is required in body', null);
    }

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: member } },
      { new: true, runValidators: true }
    );

    if (!team) {
      return sendResponse(res, 404, 'Team not found', null);
    }

    return sendResponse(res, 200, 'Team member removed successfully', team);
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
