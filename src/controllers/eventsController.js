const Event = require('../models/Event');

const createEvent = async (req, res, next) => {
  try {
    const created = await Event.create(req.body);
    const event = await Event.findById(created._id).populate('winner scores.team_id');
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

const getEvents = async (_req, res, next) => {
  try {
    const events = await Event.find().populate('winner scores.team_id');
    res.json(events);
  } catch (error) {
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('winner scores.team_id');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
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
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
};

const deleteEventById = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
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
