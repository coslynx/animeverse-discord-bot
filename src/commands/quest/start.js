const { SlashCommandBuilder } = require('discord.js');
const { startQuest } = require('../../services/questService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Start a new quest')
    .addStringOption(option =>
      option
        .setName('quest')
        .setDescription('The quest to start')
        .setRequired(true),
    ),
  async execute(interaction) {
    const questName = interaction.options.getString('quest');

    try {
      const result = await startQuest(questName);
      if (result.success) {
        return interaction.reply(`The ${questName} quest has begun! ${result.message}`);
      } else {
        return interaction.reply(`Oops! It seems there was an issue starting the quest: ${result.message}`);
      }
    } catch (error) {
      console.error('Error starting quest:', error);
      return interaction.reply('There was an error starting the quest. Please try again later.');
    }
  },
};