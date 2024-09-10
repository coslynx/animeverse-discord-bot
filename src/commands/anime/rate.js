const { SlashCommandBuilder } = require('discord.js');
const { rateAnime } = require('../../services/animeService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rate')
    .setDescription('Rate an anime')
    .addStringOption(option =>
      option
        .setName('anime')
        .setDescription('The anime title to rate')
        .setRequired(true),
    )
    .addIntegerOption(option =>
      option
        .setName('rating')
        .setDescription('Your rating for the anime (1-10)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(10),
    ),
  async execute(interaction) {
    const animeTitle = interaction.options.getString('anime');
    const rating = interaction.options.getInteger('rating');

    try {
      await rateAnime(interaction.user.id, animeTitle, rating);
      return interaction.reply(`You have rated ${animeTitle} a ${rating}/10.`);
    } catch (error) {
      console.error('Error rating anime:', error);
      return interaction.reply('There was an error rating the anime. Please try again later.');
    }
  },
};