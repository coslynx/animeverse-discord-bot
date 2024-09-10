const { SlashCommandBuilder } = require('discord.js');
const { joinQuest } = require('../../services/questService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join an active quest')
    .addStringOption(option =>
      option
        .setName('quest')
        .setDescription('The quest to join')
        .setRequired(true),
    ),
  async execute(interaction) {
    const questName = interaction.options.getString('quest');

    try {
      const result = await joinQuest(interaction.user.id, questName);
      if (result.success) {
        return interaction.reply(`You have successfully joined the ${questName} quest! ${result.message}`);
      } else {
        return interaction.reply(`Oops! It seems there was an issue joining the quest: ${result.message}`);
      }
    } catch (error) {
      console.error('Error joining quest:', error);
      return interaction.reply('There was an error joining the quest. Please try again later.');
    }
  },
};