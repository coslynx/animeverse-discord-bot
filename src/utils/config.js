require('dotenv').config();

const {
  DISCORD_TOKEN,
  MONGO_URI,
  JIKAN_API_KEY,
  MYANIMELIST_API_KEY,
  OPENAI_API_KEY,
  GOOGLE_CLOUD_VISION_API_KEY,
  REDIS_URL,
  WELCOME_MESSAGE,
} = process.env;

const commands = [
  // Anime Commands
  require('./commands/anime/search'),
  require('./commands/anime/info'),
  require('./commands/anime/schedule'),
  require('./commands/anime/watchlist'),
  require('./commands/anime/rate'),
  require('./commands/anime/similar'),

  // Quest Commands
  require('./commands/quest/start'),
  require('./commands/quest/list'),
  require('./commands/quest/join'),
  require('./commands/quest/complete'),
  require('./commands/quest/leaderboard'),

  // Combat Commands
  require('./commands/combat/fight'),
  require('./commands/combat/stats'),

  // Community Commands
  require('./commands/community/create'),
  require('./commands/community/join'),
  require('./commands/community/leave'),
  require('./commands/community/info'),
  require('./commands/community/list'),

  // Utility Commands
  require('./commands/utility/help'),
  require('./commands/utility/about'),
  require('./commands/utility/ping'),
  require('./commands/utility/invite'),
];

module.exports = {
  token: DISCORD_TOKEN,
  MONGO_URI,
  JIKAN_API_KEY,
  MYANIMELIST_API_KEY,
  OPENAI_API_KEY,
  GOOGLE_CLOUD_VISION_API_KEY,
  REDIS_URL,
  welcomeMessage: WELCOME_MESSAGE || 'Welcome to the Animeverse, ',
  commands,
};