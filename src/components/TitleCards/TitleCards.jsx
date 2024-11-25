import { useEffect, useState, useRef } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzU2NDc3MzZiM2I3ZWM0Y2I5NGY5ODU4NzgyMjI0MiIsIm5iZiI6MTcyMTI4NDc3NC4xMDQ3NDEsInN1YiI6IjY2OTgwMTdjMDM1YmI2NzZhY2U4MWQ1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.enfEUF5BDKdti-Iv1P9OBDQ19gDv0LeKQMXF2rroPTA",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    console.log("Category: ", category);

    if (category) {
      fetch(
        `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
        options
      )
        .then((response) => response.json())
        .then((response) => setApiData(response.results))
        .catch((err) => console.error(err));

      if (cardsRef.current) {
        cardsRef.current.addEventListener("wheel", handleWheel);
      }

      return () => {
        if (cardsRef.current) {
          cardsRef.current.removeEventListener("wheel", handleWheel);
        }
      };
    }
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
