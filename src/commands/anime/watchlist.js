const { SlashCommandBuilder } = require('discord.js');
const { addAnimeToWatchlist, removeAnimeFromWatchlist, getWatchlist } = require('../../services/animeService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('watchlist')
    .setDescription('Manage your anime watchlist')
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Add an anime to your watchlist')
        .addStringOption(option =>
          option
            .setName('anime')
            .setDescription('The anime title to add')
            .setRequired(true),
        ),
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Remove an anime from your watchlist')
        .addStringOption(option =>
          option
            .setName('anime')
            .setDescription('The anime title to remove')
            .setRequired(true),
        ),
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('list')
        .setDescription('View your anime watchlist'),
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const userId = interaction.user.id;

    try {
      switch (subcommand) {
        case 'add': {
          const animeTitle = interaction.options.getString('anime');
          await addAnimeToWatchlist(userId, animeTitle);
          return interaction.reply(`Added ${animeTitle} to your watchlist.`);
        }
        case 'remove': {
          const animeTitle = interaction.options.getString('anime');
          await removeAnimeFromWatchlist(userId, animeTitle);
          return interaction.reply(`Removed ${animeTitle} from your watchlist.`);
        }
        case 'list': {
          const watchlist = await getWatchlist(userId);
          if (watchlist.length === 0) {
            return interaction.reply('Your watchlist is empty.');
          }
          const watchlistString = watchlist.map(anime => `- ${anime.title}`).join('\n');
          return interaction.reply(`Here's your watchlist:\n${watchlistString}`);
        }
        default:
          return interaction.reply('Invalid watchlist subcommand.');
      }
    } catch (error) {
      console.error('Error managing watchlist:', error);
      return interaction.reply('There was an error managing your watchlist. Please try again later.');
    }
  },
};