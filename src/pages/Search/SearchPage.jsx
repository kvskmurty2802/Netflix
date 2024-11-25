import React, { useEffect, useState } from 'react';
import './SearchPage.css';
import { Link } from 'react-router-dom';

const SearchPage = ({ searchQuery }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (!searchQuery) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&language=en-US&page=1&api_key=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        if (data.results) {
          setApiData(data.results);
        } else {
          setApiData([]);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, API_KEY]);

  // Commented out search logic
  /*
  const searchQuery = ''; // Remove search functionality

  useEffect(() => {
    if (!searchQuery) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&language=en-US&page=1&api_key=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        if (data.results) {
          setApiData(data.results);
        } else {
          setApiData([]);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, API_KEY]);
  */

  return (
    <div className="search-page">
      <h1>Search Results for "{searchQuery}"</h1>
      <div className="search-results">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && apiData.length === 0 && <p>No results found.</p>}
        {!loading &&
          !error &&
          apiData.map((item) => {
            const title = item.title || item.name;
            const imageUrl = item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Image+Available';

            return (
              <Link to={`/player/${item.id}`} className="search-card" key={item.id}>
                <img src={imageUrl} alt={title} />
                <p>{title}</p>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default SearchPage;
