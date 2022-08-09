import React, { useEffect, useState } from 'react';
import './Movies.css';
import Tmdb from '../Tmdb';
import MovieDetails from './MovieDetails';

function Movies({ list, movieGenres, genresTv }) {
  const [selected, setSelected] = useState('movie');
  const [genreID, setGenreID] = useState('');
  const [id, setId] = useState('');
  const [chosen, setChosen] = useState({});
  const [providers, setProviders] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const gMovies = Array.from(movieGenres);
  const gTv = Array.from(genresTv);

  useEffect(() => {
    const getRecomendation = async () => {
      if (id !== '') {
        let page = Math.floor(Math.random() * pageNumber) + 1;

        let list = await Tmdb.getMovieList(selected, id, page);

        if (list.total_pages >= 60) {
          setPageNumber(60);
        } else {
          setPageNumber(list.total_pages);
        }

        let randomOption = Math.floor(Math.random() * list.results.length);

        let preRecomendation = list.results[randomOption];

        let recomend = await Tmdb.getChosen(selected, preRecomendation.id);
        if (recomend.overview !== '') {
          setChosen(recomend);
        } else {
          setId(id);
          setPageNumber(5);
        }

        let providersList = await Tmdb.getProviders(
          selected,
          preRecomendation.id
        );

        if (providersList.results.BR) {
          setProviders(providersList.results.BR);
        } else {
          setProviders('');
        }
      }
    };

    getRecomendation();

    setId('');
  }, [id]);

  const getMovie = id => {
    setPageNumber(2);
    if (selected === 'movie') {
      for (let i in gMovies) {
        if (gMovies[i].id == id) {
          setGenreID(gMovies[i].id);
        }
      }
    } else if (selected === 'tv') {
      for (let i in gTv) {
        if (gTv[i].id == id) {
          setGenreID(gTv[i].id);
        }
      }
    }
  };

  const getGenres = () => {
    if (selected === 'movie') {
      return (
        <form>
          <select onChange={val => getMovie(val.target.value)}>
            <option value="select--genre">--Selecione um Gênero</option>
            {gMovies.map((val, key) => (
              <option value={val.id} key={key}>
                {val.name}
              </option>
            ))}
          </select>
        </form>
      );
    } else {
      return (
        <form>
          <select onChange={val => getMovie(val.target.value)}>
            <option value="select-genre" selected>
              --Selecione um Gênero
            </option>
            {gTv.map((val, key) => (
              <option value={val.id} key={key}>
                {val.name}
              </option>
            ))}
          </select>
        </form>
      );
    }
  };

  console.log(genreID);

  return (
    <main
      style={
        chosen.backdrop_path
          ? {
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              background: `url(https://image.tmdb.org/t/p/original${chosen.backdrop_path})`
            }
          : { background: 'linear-gradient(45deg, #5d32d0, #04527d )' }
      }
    >
      <div className="movie--container">
        <div className="movie--options">
          {list.map((item, key) => (
            <div className={selected === 'movie' ? 'movie' : 'tv'} key={key}>
              <div
                className="movie--button"
                onClick={e => setSelected(e.target.id)}
                id={item.type}
              >
                {item.title}
              </div>
            </div>
          ))}
        </div>
        <div className="movie--choose--container">
          <div className="movie--choose">
            <div>{getGenres()}</div>
            <div className="button" onClick={() => setId(genreID)}>
              <strong>Buscar</strong>
            </div>
          </div>
        </div>
        <div className="movie--info--container">
          <div className="movie--info">
            <MovieDetails movie={chosen} providers={providers} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Movies;
