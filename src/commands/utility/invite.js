const { SlashCommandBuilder } = require('discord.js');
const { generateInviteLink } = require('../../services/utilityService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Get an invite link for Animeverse'),
  async execute(interaction) {
    try {
      const inviteLink = await generateInviteLink();
      await interaction.reply(`Here's an invite link for Animeverse: ${inviteLink}`);
    } catch (error) {
      console.error('Error generating invite link:', error);
      await interaction.reply('There was an error generating an invite link. Please try again later.');
    }
  },
};