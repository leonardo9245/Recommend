import React, { useEffect, useState } from 'react';
import './App.css';
import Movies from './componets/Movies';

import Tmdb from './Tmdb';

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [movieGenres, setMovieGenres] = useState({});
  const [tvGenres, setTvGenres] = useState({});

  useEffect(() => {
    const getAll = async () => {
      let list = await Tmdb.getGenres();
      setMoviesList(list);
      setMovieGenres(list[0].items.genres);
      setTvGenres(list[1].items.genres);
    };

    getAll();
  }, []);

  return (
    <div className="App">
      <section className="container">
        <div className="section--movies">
          <Movies
            list={moviesList}
            movieGenres={movieGenres}
            genresTv={tvGenres}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
