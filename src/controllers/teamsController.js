const { eq } = require('drizzle-orm');
const { db } = require('../db/client');
const { teams } = require('../db/schema');
const { sendResponse } = require('../utils/response');

const createTeam = async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      captain: req.body.captain,
      season: req.body.season,
      logo: req.body.logo || '',
      members: Array.isArray(req.body.members) ? req.body.members : [],
      updatedAt: new Date(),
    };

    const [team] = await db.insert(teams).values(payload).returning();
    return sendResponse(res, 201, 'Team created successfully', team);
  } catch (error) {
    next(error);
  }
};

const getTeams = async (_req, res, next) => {
  try {
    const list = await db.select().from(teams);
    return sendResponse(res, 200, 'Teams fetched successfully', list);
  } catch (error) {
    next(error);
  }
};

const getTeamById = async (req, res, next) => {
  try {
    const [team] = await db.select().from(teams).where(eq(teams.id, Number(req.params.id))).limit(1);
    if (!team) return sendResponse(res, 404, 'Team not found', null);
    return sendResponse(res, 200, 'Team fetched successfully', team);
  } catch (error) {
    next(error);
  }
};

const updateTeamById = async (req, res, next) => {
  try {
    const [team] = await db
      .update(teams)
      .set({
        ...req.body,
        updatedAt: new Date(),
      })
      .where(eq(teams.id, Number(req.params.id)))
      .returning();

    if (!team) return sendResponse(res, 404, 'Team not found', null);
    return sendResponse(res, 200, 'Team updated successfully', team);
  } catch (error) {
    next(error);
  }
};

const deleteTeamById = async (req, res, next) => {
  try {
    const [team] = await db.delete(teams).where(eq(teams.id, Number(req.params.id))).returning();
    if (!team) return sendResponse(res, 404, 'Team not found', null);
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

    const [existing] = await db.select().from(teams).where(eq(teams.id, Number(req.params.id))).limit(1);
    if (!existing) return sendResponse(res, 404, 'Team not found', null);

    const members = existing.members.includes(member) ? existing.members : [...existing.members, member];

    const [team] = await db
      .update(teams)
      .set({ members, updatedAt: new Date() })
      .where(eq(teams.id, Number(req.params.id)))
      .returning();

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

    const [existing] = await db.select().from(teams).where(eq(teams.id, Number(req.params.id))).limit(1);
    if (!existing) return sendResponse(res, 404, 'Team not found', null);

    const members = existing.members.filter((m) => m !== member);

    const [team] = await db
      .update(teams)
      .set({ members, updatedAt: new Date() })
      .where(eq(teams.id, Number(req.params.id)))
      .returning();

    return sendResponse(res, 200, 'Team member removed successfully', team);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTeam, getTeams, getTeamById, updateTeamById, deleteTeamById, addTeamMember, removeTeamMember };
