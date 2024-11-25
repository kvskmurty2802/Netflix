import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${API_KEY}`)
      .then(response => response.json())
      .then(response => {
        if (response.results.length > 0) {
          setApiData(response.results[0]); 
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="back" onClick={() => navigate(-2)} />
      {apiData.key && (
        <iframe 
          src={`https://www.youtube.com/embed/${apiData.key}`} 
          title='trailer' 
          frameBorder='0' 
          allowFullScreen
        ></iframe>
      )}
      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
}

export default Player;
