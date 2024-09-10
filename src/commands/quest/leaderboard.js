const { SlashCommandBuilder } = require('discord.js');
const { getQuestLeaderboard } = require('../../services/questService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('View the leaderboard for the current quest')
    .addStringOption(option =>
      option
        .setName('quest')
        .setDescription('The quest to view the leaderboard for')
        .setRequired(false),
    ),
  async execute(interaction) {
    const questName = interaction.options.getString('quest');

    try {
      const leaderboard = await getQuestLeaderboard(questName);
      if (!leaderboard) {
        return interaction.reply('There is no active quest with that name.');
      }

      const leaderboardString = leaderboard
        .map((entry, index) => `${index + 1}. ${entry.user} - ${entry.progress}`)
        .join('\n');

      return interaction.reply(`${questName} Leaderboard:\n${leaderboardString}`);
    } catch (error) {
      console.error('Error fetching quest leaderboard:', error);
      return interaction.reply('There was an error fetching the quest leaderboard. Please try again later.');
    }
  },
};