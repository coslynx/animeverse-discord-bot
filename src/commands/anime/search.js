const { SlashCommandBuilder } = require('discord.js');
const { searchAnime } = require('../../services/animeService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('Search for anime by title, genre, character, or voice actor')
    .addStringOption(option =>
      option
        .setName('query')
        .setDescription('Your search query')
        .setRequired(true),
    ),
  async execute(interaction) {
    const query = interaction.options.getString('query');

    try {
      const results = await searchAnime(query);
      if (results.length === 0) {
        return interaction.reply(`No results found for "${query}".`);
      }

      const searchResults = results.map(anime => `- ${anime.title} (${anime.type})`).join('\n');
      return interaction.reply(`Here are some search results for "${query}":\n${searchResults}`);
    } catch (error) {
      console.error('Error searching for anime:', error);
      return interaction.reply('There was an error searching for anime. Please try again later.');
    }
  },
};