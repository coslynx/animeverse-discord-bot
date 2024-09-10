const { User } = require('../models');

const generateRandomOpponent = async (userId) => {
  try {
    // Exclude the user from the random selection
    const users = await User.find({ discordId: { $ne: userId } }).lean();
    if (users.length === 0) {
      return null; // No other users found
    }
    const randomIndex = Math.floor(Math.random()  users.length);
    return { id: users[randomIndex]._id, name: users[randomIndex].username };
  } catch (error) {
    console.error('Error generating random opponent:', error);
    return null;
  }
};

const generateRandomQuest = async () => {
  try {
    // Replace with actual quest data from your database or API
    const questNames = ['Dragon Ball Quest', 'Naruto Challenge', 'One Piece Adventure'];
    const randomIndex = Math.floor(Math.random()  questNames.length);
    return questNames[randomIndex];
  } catch (error) {
    console.error('Error generating random quest:', error);
    return null;
  }
};

module.exports = {
  generateRandomOpponent,
  generateRandomQuest,
};