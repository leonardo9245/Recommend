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
    const justWatch = () => {
      return (
        <div className="detail--justwatch">
          <a target="_blank" href="https://www.justwatch.com/">
            <img
              src={`https://www.themoviedb.org/assets/2/v4/logos/justwatch-c2e58adf5809b6871db650fb74b43db2b8f3637fe3709262572553fa056d8d0a.svg `}
              alt="justWatch logo"
            />
          </a>
        </div>
      );
    };

    const showProvidersLogo = val => {
      return (
        <div className="detail--logo">
          <a href={`${providers.link}`} target="_blank">
            <img
              src={`https://image.tmdb.org/t/p/original${val.logo_path}`}
              alt={val.provider_name}
            />
          </a>
        </div>
      );
    };

    if (providers !== '') {
      if (providers.free) {
        return (
          <div>
            {justWatch()}
            <div className="detail--logos">
              Assita Grátis:
              {providers.free.map((val, key) => (
                <div key={key}>{showProvidersLogo(val)}</div>
              ))}
            </div>
          </div>
        );
      } else if (providers.flatrate) {
        return (
          <div>
            {justWatch()}
            <div className="detail--logos">
              Disponível em:
              {providers.flatrate.map((val, key) => (
                <div key={key}>{showProvidersLogo(val)}</div>
              ))}
            </div>
          </div>
        );
      } else if (providers.rent) {
        return (
          <div>
            {justWatch()}
            <div className="detail--logos">
              Alugue em:
              {providers.rent.map((val, key) => (
                <div key={key}>{showProvidersLogo(val)}</div>
              ))}
            </div>
          </div>
        );
      } else if (providers.buy) {
        return (
          <div>
            {justWatch()}
            <div className="detail--logos">
              Compre em:
              {providers.buy.map((val, key) => (
                <div key={key}>{showProvidersLogo(val)}</div>
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
                <span style={{ color: '#ffffffdd' }}>Classificação: </span>
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
        <div className="no-movies">Não há nada por aqui ainda...</div>
      )}
    </>
  );
}

export default MovieDetails;
