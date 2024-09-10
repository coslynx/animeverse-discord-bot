const { SlashCommandBuilder } = require('discord.js');
const { createCommunity } = require('../../services/communityService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create')
    .setDescription('Create a new anime community')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('The name of the community')
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName('description')
        .setDescription('A brief description of the community')
        .setRequired(true),
    ),
  async execute(interaction) {
    const communityName = interaction.options.getString('name');
    const description = interaction.options.getString('description');

    try {
      const result = await createCommunity(communityName, description);
      if (result.success) {
        return interaction.reply(`The ${communityName} community has been created! ${result.message}`);
      } else {
        return interaction.reply(`Oops! It seems there was an issue creating the community: ${result.message}`);
      }
    } catch (error) {
      console.error('Error creating community:', error);
      return interaction.reply('There was an error creating the community. Please try again later.');
    }
  },
};