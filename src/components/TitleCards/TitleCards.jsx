import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';
import {TMDB_Token} from '../../config.js'

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_Token}`,
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${
            category ? category : 'now_playing'
          }?language=en-US&page=1`,
          options
        );

        // Check if response is okay
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Fetched Movies:', data); // Log fetched data
        setApiData(data.results || []); // Set results or empty array
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchMovies();

    const refCurrent = cardsRef.current;
    refCurrent.addEventListener('wheel', handleWheel);

    return () => {
      refCurrent.removeEventListener('wheel', handleWheel);
    };
  }, [category]);

  const dataToPass = { name: 'John Doe', age: 25 }; // Example data

  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((card) =>
            card.backdrop_path && card.original_title ? (
              <Link
                to={`/player/${card.id}`}
                state={dataToPass}
                className="card"
                key={card.id}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                  alt={card.original_title}
                />
                <p>{card.original_title}</p>
              </Link>
            ) : null
          )
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default TitleCards;
