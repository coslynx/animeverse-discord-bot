const mongoose = require('mongoose');

const combatStatsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
  damageDealt: {
    type: Number,
    default: 0,
  },
  damageReceived: {
    type: Number,
    default: 0,
  },
});

const CombatStats = mongoose.model('CombatStats', combatStatsSchema);

module.exports = CombatStats;