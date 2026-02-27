const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema(
  {
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    season: {
      type: String,
      required: true,
      trim: true,
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    scores: {
      type: [scoreSchema],
      default: [],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
