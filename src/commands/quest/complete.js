const { SlashCommandBuilder } = require('discord.js');
const { completeQuest } = require('../../services/questService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('complete')
    .setDescription('Complete an active quest')
    .addStringOption(option =>
      option
        .setName('quest')
        .setDescription('The quest to complete')
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName('evidence')
        .setDescription('Proof of completion (optional)')
        .setRequired(false),
    ),
  async execute(interaction) {
    const questName = interaction.options.getString('quest');
    const evidence = interaction.options.getString('evidence');

    try {
      const result = await completeQuest(interaction.user.id, questName, evidence);
      if (result.success) {
        return interaction.reply(`Congratulations! You have successfully completed the ${questName} quest! ${result.message}`);
      } else {
        return interaction.reply(`Oops! It seems there was an issue completing the quest: ${result.message}`);
      }
    } catch (error) {
      console.error('Error completing quest:', error);
      return interaction.reply('There was an error completing the quest. Please try again later.');
    }
  },
};