const Event = require('../models/Event');
const { sendResponse } = require('../utils/response');

const createEvent = async (req, res, next) => {
  try {
    const created = await Event.create(req.body);
    const event = await Event.findById(created._id).populate('winner scores.team_id');
    return sendResponse(res, 201, 'Event created successfully', event);
  } catch (error) {
    next(error);
  }
};

const getEvents = async (_req, res, next) => {
  try {
    const events = await Event.find().populate('winner scores.team_id');
    return sendResponse(res, 200, 'Events fetched successfully', events);
  } catch (error) {
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('winner scores.team_id');
    if (!event) {
      return sendResponse(res, 404, 'Event not found', null);
    }

    return sendResponse(res, 200, 'Event fetched successfully', event);
  } catch (error) {
    next(error);
  }
};

const updateEventById = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('winner scores.team_id');

    if (!event) {
      return sendResponse(res, 404, 'Event not found', null);
    }

    return sendResponse(res, 200, 'Event updated successfully', event);
  } catch (error) {
    next(error);
  }
};

const deleteEventById = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return sendResponse(res, 404, 'Event not found', null);
    }

    return sendResponse(res, 200, 'Event deleted successfully', event);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};
