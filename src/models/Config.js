const mongoose = require('mongoose');

const configSchema = new mongoose.Schema(
  {
    current_season: {
      type: String,
      required: true,
      trim: true,
    },
    seasons: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Config', configSchema);
