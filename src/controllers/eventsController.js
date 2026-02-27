const { eq } = require('drizzle-orm');
const { db } = require('../db/client');
const { events, eventScores } = require('../db/schema');
const { sendResponse } = require('../utils/response');

const toApiEvent = async (event) => {
  const scores = await db.select().from(eventScores).where(eq(eventScores.eventId, event.id));
  return {
    ...event,
    winner: event.winner,
    scores: scores.map((s) => ({ team_id: s.teamId, score: s.score })),
  };
};

const createEvent = async (req, res, next) => {
  try {
    const { scores = [], ...rest } = req.body;
    const [event] = await db
      .insert(events)
      .values({ ...rest, winner: Number(rest.winner), updatedAt: new Date() })
      .returning();

    if (scores.length) {
      await db.insert(eventScores).values(
        scores.map((s) => ({ eventId: event.id, teamId: Number(s.team_id), score: Number(s.score) }))
      );
    }

    return sendResponse(res, 201, 'Event created successfully', await toApiEvent(event));
  } catch (error) {
    next(error);
  }
};

const getEvents = async (_req, res, next) => {
  try {
    const list = await db.select().from(events);
    const withScores = await Promise.all(list.map(toApiEvent));
    return sendResponse(res, 200, 'Events fetched successfully', withScores);
  } catch (error) {
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const [event] = await db.select().from(events).where(eq(events.id, Number(req.params.id))).limit(1);
    if (!event) return sendResponse(res, 404, 'Event not found', null);
    return sendResponse(res, 200, 'Event fetched successfully', await toApiEvent(event));
  } catch (error) {
    next(error);
  }
};

const updateEventById = async (req, res, next) => {
  try {
    const { scores, ...rest } = req.body;
    const setPayload = { ...rest, updatedAt: new Date() };
    if (rest.winner !== undefined) setPayload.winner = Number(rest.winner);

    const [event] = await db
      .update(events)
      .set(setPayload)
      .where(eq(events.id, Number(req.params.id)))
      .returning();

    if (!event) return sendResponse(res, 404, 'Event not found', null);

    if (Array.isArray(scores)) {
      await db.delete(eventScores).where(eq(eventScores.eventId, event.id));
      if (scores.length) {
        await db.insert(eventScores).values(
          scores.map((s) => ({ eventId: event.id, teamId: Number(s.team_id), score: Number(s.score) }))
        );
      }
    }

    return sendResponse(res, 200, 'Event updated successfully', await toApiEvent(event));
  } catch (error) {
    next(error);
  }
};

const deleteEventById = async (req, res, next) => {
  try {
    const [event] = await db.delete(events).where(eq(events.id, Number(req.params.id))).returning();
    if (!event) return sendResponse(res, 404, 'Event not found', null);
    return sendResponse(res, 200, 'Event deleted successfully', event);
  } catch (error) {
    next(error);
  }
};

module.exports = { createEvent, getEvents, getEventById, updateEventById, deleteEventById };
