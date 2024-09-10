const { SlashCommandBuilder } = require('discord.js');
const { getAnimeInfo } = require('../../services/animeService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get information about an anime')
    .addStringOption(option =>
      option
        .setName('anime')
        .setDescription('The anime title to get information for')
        .setRequired(true),
    ),
  async execute(interaction) {
    const animeTitle = interaction.options.getString('anime');

    try {
      const animeInfo = await getAnimeInfo(animeTitle);
      if (!animeInfo) {
        return interaction.reply(`No information found for ${animeTitle}.`);
      }

      const infoString = [
        `Title: ${animeInfo.title}`,
        `Type: ${animeInfo.type}`,
        `Episodes: ${animeInfo.episodes}`,
        `Status: ${animeInfo.status}`,
        `Synopsis: ${animeInfo.synopsis}`,
        `Rating: ${animeInfo.rating}`,
        `Genres: ${animeInfo.genres.join(', ')}`,
      ].join('\n');

      return interaction.reply(`Here is the information for ${animeTitle}:\\n${infoString}`);
    } catch (error) {
      console.error('Error getting anime information:', error);
      return interaction.reply('There was an error getting the anime information. Please try again later.');
    }
  },
};