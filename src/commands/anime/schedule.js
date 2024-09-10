const { SlashCommandBuilder } = require('discord.js');
const { getAnimeSchedule } = require('../../services/animeService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('Get the broadcast schedule for an anime')
    .addStringOption(option =>
      option
        .setName('anime')
        .setDescription('The anime title to get the schedule for')
        .setRequired(true),
    ),
  async execute(interaction) {
    const animeTitle = interaction.options.getString('anime');

    try {
      const schedule = await getAnimeSchedule(animeTitle);
      if (!schedule) {
        return interaction.reply(`No broadcast schedule found for ${animeTitle}.`);
      }

      const scheduleString = schedule
        .map(episode => `- Episode ${episode.episodeNumber}: ${episode.airDate}`)
        .join('\n');

      return interaction.reply(`Here is the broadcast schedule for ${animeTitle}:\n${scheduleString}`);
    } catch (error) {
      console.error('Error getting anime schedule:', error);
      return interaction.reply('There was an error getting the anime schedule. Please try again later.');
    }
  },
};