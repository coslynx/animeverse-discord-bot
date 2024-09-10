const { SlashCommandBuilder } = require('discord.js');
const { leaveCommunity } = require('../../services/communityService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leave a community')
    .addStringOption(option =>
      option
        .setName('community')
        .setDescription('The name of the community to leave')
        .setRequired(true),
    ),
  async execute(interaction) {
    const communityName = interaction.options.getString('community');

    try {
      const result = await leaveCommunity(interaction.user.id, communityName);
      if (result.success) {
        return interaction.reply(`You have successfully left the ${communityName} community! ${result.message}`);
      } else {
        return interaction.reply(`Oops! It seems there was an issue leaving the community: ${result.message}`);
      }
    } catch (error) {
      console.error('Error leaving community:', error);
      return interaction.reply('There was an error leaving the community. Please try again later.');
    }
  },
};