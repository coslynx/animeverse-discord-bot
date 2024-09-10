const axios = require('axios');
const { JikanAPI_KEY, MyAnimeListAPI_KEY } = require('../config');
const { Anime } = require('../models');

const jikan = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
  headers: {
    'X-MAL-Client-ID': JikanAPI_KEY,
  },
});

const myAnimeList = axios.create({
  baseURL: 'https://api.myanimelist.net/v2',
  headers: {
    'X-MAL-Client-ID': MyAnimeListAPI_KEY,
  },
});

const searchAnime = async (query) => {
  try {
    const response = await jikan.get('/anime', {
      params: {
        q: query,
      },
    });

    return response.data.data.map((anime) => ({
      title: anime.title,
      type: anime.type,
      url: anime.url,
    }));
  } catch (error) {
    console.error('Error searching for anime:', error);
    return [];
  }
};

const getAnimeInfo = async (animeTitle) => {
  try {
    const response = await jikan.get('/anime', {
      params: {
        q: animeTitle,
      },
    });

    const anime = response.data.data.find((a) => a.title === animeTitle);
    if (!anime) {
      return null;
    }

    return {
      title: anime.title,
      type: anime.type,
      episodes: anime.episodes,
      status: anime.status,
      synopsis: anime.synopsis,
      rating: anime.rating,
      genres: anime.genres.map((genre) => genre.name),
    };
  } catch (error) {
    console.error('Error getting anime information:', error);
    return null;
  }
};

const getAnimeSchedule = async (animeTitle) => {
  try {
    const response = await jikan.get('/anime', {
      params: {
        q: animeTitle,
      },
    });

    const anime = response.data.data.find((a) => a.title === animeTitle);
    if (!anime) {
      return null;
    }

    return anime.episodes.map((episode) => ({
      episodeNumber: episode.episode_id,
      airDate: episode.air_date,
    }));
  } catch (error) {
    console.error('Error getting anime schedule:', error);
    return null;
  }
};

const addAnimeToWatchlist = async (userId, animeTitle) => {
  try {
    const response = await jikan.get('/anime', {
      params: {
        q: animeTitle,
      },
    });

    const anime = response.data.data.find((a) => a.title === animeTitle);
    if (!anime) {
      return { success: false, message: 'Anime not found.' };
    }

    const existingAnime = await Anime.findOne({ title: animeTitle });
    if (!existingAnime) {
      const newAnime = new Anime({
        title: animeTitle,
        type: anime.type,
        url: anime.url,
      });
      await newAnime.save();
    }

    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: 'User not found.' };
    }

    if (user.watchlist.includes(animeTitle)) {
      return { success: false, message: 'Anime already in watchlist.' };
    }

    user.watchlist.push(animeTitle);
    await user.save();

    return { success: true, message: 'Anime added to watchlist.' };
  } catch (error) {
    console.error('Error adding anime to watchlist:', error);
    return { success: false, message: 'An error occurred while adding anime to watchlist.' };
  }
};

const removeAnimeFromWatchlist = async (userId, animeTitle) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: 'User not found.' };
    }

    if (!user.watchlist.includes(animeTitle)) {
      return { success: false, message: 'Anime not in watchlist.' };
    }

    user.watchlist = user.watchlist.filter((title) => title !== animeTitle);
    await user.save();

    return { success: true, message: 'Anime removed from watchlist.' };
  } catch (error) {
    console.error('Error removing anime from watchlist:', error);
    return { success: false, message: 'An error occurred while removing anime from watchlist.' };
  }
};

const getWatchlist = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: 'User not found.' };
    }

    return user.watchlist;
  } catch (error) {
    console.error('Error getting watchlist:', error);
    return [];
  }
};

const rateAnime = async (userId, animeTitle, rating) => {
  try {
    const response = await myAnimeList.put('/anime/:anime_id/my_list_status', {
      params: {
        anime_id: animeId, // Get anime_id from Jikan API or MyAnimeList API
      },
      data: {
        status: 'completed', // Update status as needed
        score: rating,
      },
    });

    return { success: true, message: 'Anime rated successfully.' };
  } catch (error) {
    console.error('Error rating anime:', error);
    return { success: false, message: 'An error occurred while rating anime.' };
  }
};

const getSimilarAnime = async (animeTitle) => {
  try {
    const response = await jikan.get('/anime', {
      params: {
        q: animeTitle,
      },
    });

    const anime = response.data.data.find((a) => a.title === animeTitle);
    if (!anime) {
      return [];
    }

    const similarAnimeIds = anime.related.recommendations.map(
      (recommendation) => recommendation.entry.mal_id,
    );

    const similarAnimePromises = similarAnimeIds.map((id) =>
      jikan.get(`/anime/${id}`),
    );

    const similarAnimeResponses = await Promise.all(similarAnimePromises);

    return similarAnimeResponses.map((response) => ({
      title: response.data.data.title,
      type: response.data.data.type,
      url: response.data.data.url,
    }));
  } catch (error) {
    console.error('Error finding similar anime:', error);
    return [];
  }
};

module.exports = {
  searchAnime,
  getAnimeInfo,
  getAnimeSchedule,
  addAnimeToWatchlist,
  removeAnimeFromWatchlist,
  getWatchlist,
  rateAnime,
  getSimilarAnime,
};