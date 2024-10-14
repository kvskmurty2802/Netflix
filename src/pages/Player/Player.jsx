import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { TMDB_Token } from '../../config';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();  

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_Token}`
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results[0]))
      .catch(err => console.error(err));
  }, [id]);  

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="Back" onClick={() => { navigate(-1); }} />
      {apiData.key ? (  
        <iframe
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title='trailer'
          frameBorder='0'
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading...</p>  
      )}
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{location.state ? location.state.name : "No user data"}</p> 
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
