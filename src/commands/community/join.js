const { SlashCommandBuilder } = require('discord.js');
const { joinCommunity } = require('../../services/communityService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join an anime community')
    .addStringOption(option =>
      option
        .setName('community')
        .setDescription('The name of the community to join')
        .setRequired(true),
    ),
  async execute(interaction) {
    const communityName = interaction.options.getString('community');

    try {
      const result = await joinCommunity(interaction.user.id, communityName);
      if (result.success) {
        return interaction.reply(`You have successfully joined the ${communityName} community! ${result.message}`);
      } else {
        return interaction.reply(`Oops! It seems there was an issue joining the community: ${result.message}`);
      }
    } catch (error) {
      console.error('Error joining community:', error);
      return interaction.reply('There was an error joining the community. Please try again later.');
    }
  },
};