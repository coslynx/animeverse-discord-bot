const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Information about Animeverse'),
  async execute(interaction) {
    await interaction.reply(
      'Animeverse is a Discord bot designed to be the ultimate hub for anime enthusiasts, offering a comprehensive anime database, engaging interactive features, and a vibrant community platform. The bot aims to provide a unique and immersive experience for users, fostering a sense of belonging and shared passion for anime.',
    );
  },
};