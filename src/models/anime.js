const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
  },
  episodes: {
    type: Number,
  },
  status: {
    type: String,
  },
  rating: {
    type: Number,
  },
  genres: [
    {
      type: String,
    },
  ],
  // Add more anime-specific properties as needed
});

const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;