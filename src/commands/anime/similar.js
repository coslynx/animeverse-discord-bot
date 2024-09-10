const { SlashCommandBuilder } = require('discord.js');
const { getSimilarAnime } = require('../../services/animeService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('similar')
    .setDescription('Find anime similar to a given title')
    .addStringOption(option =>
      option
        .setName('anime')
        .setDescription('The anime title to find similar anime for')
        .setRequired(true),
    ),
  async execute(interaction) {
    const animeTitle = interaction.options.getString('anime');
    try {
      const similarAnime = await getSimilarAnime(animeTitle);
      if (similarAnime.length === 0) {
        return interaction.reply(`No similar anime found for ${animeTitle}.`);
      }

      const similarAnimeList = similarAnime.map(anime => `- ${anime.title} (${anime.type})`).join('\n');
      return interaction.reply(`Here are some similar anime for ${animeTitle}:\n${similarAnimeList}`);
    } catch (error) {
      console.error('Error finding similar anime:', error);
      return interaction.reply('There was an error finding similar anime. Please try again later.');
    }
  },
};