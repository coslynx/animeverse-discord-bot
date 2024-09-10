const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  watchlist: [
    {
      type: String,
    },
  ],
  currentQuest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quest',
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community',
    },
  ],
  combatStats: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CombatStats',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;