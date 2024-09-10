const { SlashCommandBuilder } = require('discord.js');
const { listCommunities } = require('../../services/communityService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('List all available anime communities'),
  async execute(interaction) {
    try {
      const communities = await listCommunities();
      if (communities.length === 0) {
        return interaction.reply('There are currently no active anime communities.');
      }

      const communityList = communities
        .map(community => `- ${community.name}: ${community.description}`)
        .join('\n');

      return interaction.reply(`Available Anime Communities:\n${communityList}`);
    } catch (error) {
      console.error('Error listing communities:', error);
      return interaction.reply(
        'There was an error listing anime communities. Please try again later.',
      );
    }
  },
};