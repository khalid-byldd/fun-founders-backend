const mongoose = require('mongoose');
const Event = require('../models/Event');
const { sendResponse } = require('../utils/response');

const getLeaderboard = async (req, res, next) => {
  try {
    const { season } = req.body;

    if (!season || typeof season !== 'string') {
      return sendResponse(res, 400, 'season is required in body.', null);
    }

    const leaderboard = await Event.aggregate([
      { $match: { season } },
      { $unwind: '$scores' },
      {
        $group: {
          _id: '$scores.team_id',
          scores: { $sum: '$scores.score' },
        },
      },
      {
        $lookup: {
          from: 'teams',
          localField: '_id',
          foreignField: '_id',
          as: 'team',
        },
      },
      { $unwind: '$team' },
      {
        $project: {
          _id: 0,
          team_id: '$_id',
          team_name: '$team.name',
          scores: 1,
        },
      },
      { $sort: { scores: -1, team_name: 1 } },
    ]);

    return sendResponse(res, 200, 'Leaderboard fetched successfully', leaderboard);
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return sendResponse(res, 400, error.message, null);
    }

    next(error);
  }
};

module.exports = { getLeaderboard };
