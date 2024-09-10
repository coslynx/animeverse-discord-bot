const { User, CombatStats } = require('../models');
const { generateRandomOpponent } = require('../utils/helper');

const startCombat = async (userId, opponentId) => {
  try {
    const user = await User.findById(userId);
    const opponent = await User.findById(opponentId);

    if (!user || !opponent) {
      return { success: false, message: 'One or both players were not found.' };
    }

    const userCombatStats = await CombatStats.findOne({ userId });
    const opponentCombatStats = await CombatStats.findOne({ userId: opponentId });

    if (!userCombatStats) {
      const newCombatStats = new CombatStats({ userId });
      await newCombatStats.save();
    }

    if (!opponentCombatStats) {
      const newCombatStats = new CombatStats({ userId: opponentId });
      await newCombatStats.save();
    }

    // Implement combat logic here, including attack, defense, damage calculation, and outcome determination.
    // You can utilize user and opponent data, including their chosen characters, abilities, and items.
    // Example:
    const combatResult = { success: true, message: 'The duel has begun! May the best warrior prevail!' };

    // Update combat statistics based on the combat outcome.
    // Example:
    // if (userWins) {
    //   userCombatStats.wins += 1;
    //   opponentCombatStats.losses += 1;
    // } else {
    //   userCombatStats.losses += 1;
    //   opponentCombatStats.wins += 1;
    // }

    await userCombatStats.save();
    await opponentCombatStats.save();

    return combatResult;
  } catch (error) {
    console.error('Error starting combat:', error);
    return { success: false, message: 'An error occurred while starting the combat.' };
  }
};

const getOpponent = async (userId, opponentName) => {
  try {
    if (opponentName) {
      // Check if opponent name exists in the user database
      const opponent = await User.findOne({ name: opponentName });
      if (!opponent) {
        return null;
      }
      return { id: opponent._id, name: opponent.name };
    }

    // Find a random opponent from the user database
    const opponent = await generateRandomOpponent(userId);
    return opponent;
  } catch (error) {
    console.error('Error finding opponent:', error);
    return null;
  }
};

const getUserCombatStats = async (userId) => {
  try {
    const combatStats = await CombatStats.findOne({ userId });
    if (!combatStats) {
      return null;
    }
    return combatStats;
  } catch (error) {
    console.error('Error fetching combat stats:', error);
    return null;
  }
};

module.exports = {
  startCombat,
  getOpponent,
  getUserCombatStats,
};