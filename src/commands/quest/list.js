const { SlashCommandBuilder } = require('discord.js');
const { listQuests } = require('../../services/questService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('List all available quests'),
  async execute(interaction) {
    try {
      const quests = await listQuests();
      if (quests.length === 0) {
        return interaction.reply('There are currently no active quests.');
      }

      const questList = quests.map(quest => `- ${quest.name}: ${quest.description}`).join('\n');
      return interaction.reply(`Available Quests:\n${questList}`);
    } catch (error) {
      console.error('Error listing quests:', error);
      return interaction.reply('There was an error listing quests. Please try again later.');
    }
  },
};