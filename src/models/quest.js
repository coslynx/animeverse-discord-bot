const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  rewards: [
    {
      type: String,
    },
  ],
  // Add more quest-specific properties as needed
});

const Quest = mongoose.model('Quest', questSchema);

module.exports = Quest;