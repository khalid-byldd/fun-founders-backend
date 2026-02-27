const { sql } = require('drizzle-orm');
const { db } = require('../db/client');
const { eventScores, events, teams } = require('../db/schema');
const { sendResponse } = require('../utils/response');

const getLeaderboard = async (req, res, next) => {
  try {
    const { season } = req.body;

    if (!season || typeof season !== 'string') {
      return sendResponse(res, 400, 'season is required in body.', null);
    }

    const rows = await db
      .select({
        team_id: teams.id,
        team_name: teams.name,
        scores: sql`sum(${eventScores.score})`.mapWith(Number),
      })
      .from(eventScores)
      .innerJoin(events, sql`${eventScores.eventId} = ${events.id}`)
      .innerJoin(teams, sql`${eventScores.teamId} = ${teams.id}`)
      .where(sql`${events.season} = ${season}`)
      .groupBy(teams.id, teams.name)
      .orderBy(sql`sum(${eventScores.score}) desc`, teams.name);

    return sendResponse(res, 200, 'Leaderboard fetched successfully', rows);
  } catch (error) {
    next(error);
  }
};

module.exports = { getLeaderboard };
