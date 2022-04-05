const API_KEY = '07f6846341d2e7a9559a2a2c6e942cf2';
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

  getMovieList: async (type, genre) => {
    let result = {};

    if (genre) {
      switch (type) {
        case 'movie':
          result = await basicFetch(
            `/discover/movie?with_genres=${genre}&language=pt-BR&api_key=${API_KEY}`
          );
          break;
        case 'tv':
          result = await basicFetch(
            `/discover/tv?with_genres=${genre}&language=pt-BR&api_key=${API_KEY}`
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
