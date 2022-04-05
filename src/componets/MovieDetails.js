import React, { useState } from 'react';

import './MovieDetails.css';

function MovieDetails({ movie, providers }) {
  let color;
  let description = movie.overview;
  if (movie.vote_average < 5) {
    color = 'red';
  } else if (movie.vote_average < 7) {
    color = 'orange';
  } else if (movie.vote_average <= 10) {
    color = 'green';
  }

  if (movie.overview) {
    if (description.length > 220) {
      description = description.substring(0, 220) + '...';
    }
  }

  const getTime = () => {
    let seconds = movie.runtime * 60,
      minutes = (seconds % 3600) / 60,
      hours = Math.floor(seconds / 3600);

    return (
      <div>
        <span>{hours}h </span>
        <span>{minutes}m</span>
      </div>
    );
  };

  const getDate = () => {
    let year;

    if (movie.release_date) {
      year = new Date(movie.release_date).getFullYear();
    } else {
      year = new Date(movie.first_air_date).getFullYear();
    }

    return year;
  };

  const getSeasons = () => {
    return (
      <div style={{ display: 'inline-block' }}>
        {movie.number_of_seasons} Temporada
        {movie.number_of_seasons > 1 ? 's' : ''}
      </div>
    );
  };

  const watch = () => {
    if (providers !== '') {
      if (providers.flatrate) {
        return (
          <div>
            <div className="detail--justwatch">
              <a target="_blank" href="https://www.justwatch.com/">
                <img
                  src={`https://www.themoviedb.org/assets/2/v4/logos/justwatch-c2e58adf5809b6871db650fb74b43db2b8f3637fe3709262572553fa056d8d0a.svg `}
                />
              </a>
            </div>
            <div className="detail--logos">
              Disponível em:
              {providers.flatrate.map((val, key) => (
                <div className="detail--logo" key={key}>
                  <a href={`${providers.link}`} target="_blank">
                    <img
                      src={`https://image.tmdb.org/t/p/original${val.logo_path}`}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
      } else if (providers.buy) {
        return (
          <div>
            <div className="detail--justwatch">
              <a target="_blank" href="https://www.justwatch.com/">
                <img
                  src={`https://www.themoviedb.org/assets/2/v4/logos/justwatch-c2e58adf5809b6871db650fb74b43db2b8f3637fe3709262572553fa056d8d0a.svg `}
                />
              </a>
            </div>
            <div className="detail--logos">
              Disponível em:
              {providers.buy.map((val, key) => (
                <div className="detail--logo" key={key}>
                  <a target="_blank" href={`${providers.link}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${val.logo_path}`}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
      }
    } else {
      return <div></div>;
    }
  };

  return (
    <>
      {movie.id ? (
        <div className="movieDetail--container">
          <div className="detail--image">
            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
          </div>
          <div className="detail--info">
            <div className="detail--title">
              {movie.title ? movie.title : movie.name}
            </div>
            <div className="detail--details">
              <div className="detail--points" style={{ color: `${color}` }}>
                {movie.vote_average}
              </div>
              <div className="detail--year">{getDate()}</div>
              <div className="detail--time">
                {movie.runtime ? getTime() : getSeasons()}
              </div>
            </div>
            <div className="detail--overview">{description}</div>
            <div className="detail--watch">{watch()}</div>
          </div>
        </div>
      ) : (
        <div style={{ color: '#ffffff22' }}>Não há nada por aqui ainda...</div>
      )}
    </>
  );
}

export default MovieDetails;
