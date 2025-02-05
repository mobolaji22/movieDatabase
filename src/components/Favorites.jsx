import { useState, useEffect, useContext, useRef } from "react";
import { MovieContext } from "./MovieContext";
import { useNavigate } from "react-router-dom";
import "../assets/css/Favorites.css";

function Favorites() {
  const { favorite, handleMovieClick, imgUrl, handleFavoriteClick } =
    useContext(MovieContext);
  const [sortOption, setSortOption] = useState("dateAdded");
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const sortFavorites = (option) => {
    setSortOption(option);
  };

  const sortedFavorites = [...favorite].sort((a, b) => {
    if (sortOption === "dateAdded") {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    } else if (sortOption === "rating") {
      return b.vote_average - a.vote_average;
    }
    return 0;
  });

  return (
    <div className="favorites-page">
      <audio ref={audioRef} src="click-sound.wav" />
      <h1 className="header">My Favorites</h1>
      <div>
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => sortFavorites(e.target.value)}
        >
          <option value="dateAdded">Date Added</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      {sortedFavorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <>
          {/* Fix: Remove undefined 'movie' and just navigate back */}
          <button onClick={() => navigate("/")}>Back To List</button>
          <div className="favourite-page-item">
            {sortedFavorites.map((movie) => (
              <div key={movie.id} className="favorite-movie-item">
                <h3>{movie.title}</h3>
                <img
                  src={`${imgUrl}${movie.poster_path}`}
                  alt={movie.title}
                  onClick={() =>
                    handleMovieClick(movie, navigate, { fromFavorites: true })
                  }
                  className="movie-image"
                />
                <p>Vote Average: {movie.vote_average}</p>
                <span
                  className={`favorite-icon ${
                    favorite.some((fav) => fav.id === movie.id) ? "filled" : ""
                  }`}
                  onClick={() => {
                    handleFavoriteClick(movie);
                    playSound();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {favorite.some((fav) => fav.id === movie.id) ? (
                    <i className="fas fa-heart"></i>
                  ) : (
                    <i className="far fa-heart"></i>
                  )}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;
