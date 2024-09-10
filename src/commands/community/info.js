const { SlashCommandBuilder } = require('discord.js');
const { getCommunityInfo } = require('../../services/communityService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get information about a community')
    .addStringOption(option =>
      option
        .setName('community')
        .setDescription('The name of the community to get information for')
        .setRequired(true),
    ),
  async execute(interaction) {
    const communityName = interaction.options.getString('community');

    try {
      const communityInfo = await getCommunityInfo(communityName);
      if (!communityInfo) {
        return interaction.reply(`No information found for the community "${communityName}".`);
      }

      const infoString = [
        `Name: ${communityInfo.name}`,
        `Description: ${communityInfo.description}`,
        `Member Count: ${communityInfo.memberCount}`,
        `Server Link: ${communityInfo.serverLink}`,
      ].join('\n');

      return interaction.reply(`Here is the information for the community "${communityName}":\n${infoString}`);
    } catch (error) {
      console.error('Error getting community information:', error);
      return interaction.reply('There was an error getting the community information. Please try again later.');
    }
  },
};