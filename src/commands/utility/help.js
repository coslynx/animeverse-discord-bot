const { SlashCommandBuilder } = require('discord.js');
const { commands } = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get help with using Animeverse'),
  async execute(interaction) {
    const helpMessage = [
      'Available Commands:',
      ...commands.map(command => `- \`/ ${command.name} \`: ${command.description}`),
      '\nNeed more assistance?',
      'Join our support server:',
      'https://discord.gg/animeverse',
    ].join('\n');

    await interaction.reply({ content: helpMessage, ephemeral: true });
  },
};