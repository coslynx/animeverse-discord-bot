const { Quest, User } = require('../models');
const { generateRandomQuest } = require('../utils/helper');

const startQuest = async (questName) => {
  try {
    const existingQuest = await Quest.findOne({ name: questName });
    if (existingQuest) {
      return { success: false, message: 'A quest with that name already exists.' };
    }

    const newQuest = new Quest({
      name: questName,
      description: 'A new quest description.', // Replace with a proper description
      active: true,
    });

    await newQuest.save();

    return { success: true, message: 'Quest successfully started!' };
  } catch (error) {
    console.error('Error starting quest:', error);
    return { success: false, message: 'An error occurred while starting the quest.' };
  }
};

const joinQuest = async (userId, questName) => {
  try {
    const quest = await Quest.findOne({ name: questName, active: true });
    if (!quest) {
      return { success: false, message: 'No active quest with that name exists.' };
    }

    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: 'User not found.' };
    }

    if (user.currentQuest) {
      return { success: false, message: 'You are already participating in a quest.' };
    }

    user.currentQuest = quest._id;
    await user.save();

    return { success: true, message: 'You have successfully joined the quest!' };
  } catch (error) {
    console.error('Error joining quest:', error);
    return { success: false, message: 'An error occurred while joining the quest.' };
  }
};

const completeQuest = async (userId, questName, evidence) => {
  try {
    const quest = await Quest.findOne({ name: questName, active: true });
    if (!quest) {
      return { success: false, message: 'No active quest with that name exists.' };
    }

    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: 'User not found.' };
    }

    if (user.currentQuest !== quest._id) {
      return { success: false, message: 'You are not participating in this quest.' };
    }

    // Implement logic to validate evidence if required
    // If evidence is valid:
    user.currentQuest = null;
    await user.save();

    // Update quest progress and potentially other relevant data
    // ...

    return { success: true, message: 'You have successfully completed the quest!' };
  } catch (error) {
    console.error('Error completing quest:', error);
    return { success: false, message: 'An error occurred while completing the quest.' };
  }
};

const listQuests = async () => {
  try {
    const quests = await Quest.find({ active: true });
    return quests;
  } catch (error) {
    console.error('Error listing quests:', error);
    return [];
  }
};

const getQuestLeaderboard = async (questName) => {
  try {
    const quest = await Quest.findOne({ name: questName, active: true });
    if (!quest) {
      return null;
    }

    const users = await User.find({ currentQuest: quest._id })
      .populate('currentQuest')
      .sort({ 'currentQuest.progress': -1 });

    return users.map(user => ({
      user: user.username,
      progress: user.currentQuest.progress,
    }));
  } catch (error) {
    console.error('Error fetching quest leaderboard:', error);
    return null;
  }
};

module.exports = {
  startQuest,
  joinQuest,
  completeQuest,
  listQuests,
  getQuestLeaderboard,
};