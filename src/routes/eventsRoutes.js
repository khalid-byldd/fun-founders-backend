const express = require('express');
const {
  createEvent,
  getEvents,
  getEventById,
  updateEventById,
  deleteEventById,
} = require('../controllers/eventsController');

const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEventById);
router.delete('/:id', deleteEventById);

module.exports = router;
