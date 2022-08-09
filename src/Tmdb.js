const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async endpoint => {
  let req = await fetch(`${API_BASE}${endpoint}`);
  let json = await req.json();

  return json;
};

export default {
  getGenres: async () => {
    return [
      {
        type: 'movie',
        title: 'Filmes',
        items: await basicFetch(
          `/genre/movie/list?language=pt-BR&api_key=${API_KEY}`
        )
      },
      {
        type: 'tv',
        title: 'Séries',
        items: await basicFetch(
          `/genre/tv/list?language=pt-BR&api_key=${API_KEY}`
        )
      }
    ];
  },

  getMovieList: async (type, genre, page) => {
    let result = {};

    if (genre) {
      switch (type) {
        case 'movie':
          result = await basicFetch(
            `/discover/movie?with_genres=${genre}&language=pt-BR&api_key=${API_KEY}&page=${page}&with_watch_monetization_types=flatrate`
          );
          break;
        case 'tv':
          result = await basicFetch(
            `/discover/tv?with_genres=${genre}&language=pt-BR&api_key=${API_KEY}&page=${page}&with_watch_monetization_types=flatrate`
          );
          break;
      }
    }

    return result;
  },

  getChosen: async (type, movieId) => {
    let chosen = {};
    if (movieId) {
      switch (type) {
        case 'movie':
          chosen = await basicFetch(
            `/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`
          );
          break;
        case 'tv':
          chosen = await basicFetch(
            `/tv/${movieId}?api_key=${API_KEY}&language=pt-BR`
          );
      }
    }

    return chosen;
  },

  getProviders: async (type, id) => {
    let providers = {};
    if (id) {
      switch (type) {
        case 'movie':
          providers = await basicFetch(
            `/movie/${id}/watch/providers?api_key=${API_KEY}`
          );
          break;
        case 'tv':
          providers = await basicFetch(
            `/tv/${id}/watch/providers?api_key=${API_KEY}`
          );
      }
    }

    return providers;
  }
};
