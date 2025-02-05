// src/components/MovieList.jsx
import { useContext, useRef } from "react";
import { MovieContext } from "./MovieContext";
import { useNavigate } from "react-router-dom";

function MovieList() {
  const { movies, handleMovieClick, favorite, handleFavoriteClick, imgUrl } =
    useContext(MovieContext);
  const audioRef = useRef(null); // Reference for audio
  const navigate = useNavigate();

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset sound
      audioRef.current.play(); // Play sound
    }
  };

  const handleViewAll = () => {
    navigate("/favorites"); // Navigate to the favorites page
  };

  return (
    <>
      <audio ref={audioRef} src="click-sound.wav" /> {/* Sound effect */}
      <h1>Favourites</h1>
      <div className="favourite-item">
        {favorite.map((movie) => (
          <div key={movie.id} className="movie-item">
            <h3>{movie.title}</h3>
            <img
              src={`${imgUrl}${movie.poster_path}`}
              alt={movie.title}
              onClick={() => handleMovieClick(movie)}
              className="movie-image" // Add class for styling
            />
            <p>Vote Average: {movie.vote_average}</p>
            <span
              className={`favorite-icon ${
                favorite.some((fav) => fav.id === movie.id) ? "filled" : ""
              }`}
              onClick={() => {
                handleFavoriteClick(movie);
                playSound(); // Play sound on click
              }}
              style={{ cursor: "pointer" }}
            >
              {favorite.some((fav) => fav.id === movie.id) ? (
                <i className="fas fa-heart"></i> // Use filled heart icon
              ) : (
                <i className="far fa-heart"></i>
              )}
            </span>
          </div>
        ))}
        {favorite.length > 10 && ( // Show button only if there are favorites
          <button onClick={handleViewAll} className="view-all-button">
            View All
          </button>
        )}
      </div>
      <h1>Movies</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <h3>{movie.title}</h3>
            <img
              src={`${imgUrl}${movie.poster_path}`}
              alt={movie.title}
              onClick={() => handleMovieClick(movie)}
              className="movie-image" // Add class for styling
            />
            <p>Vote Average: {movie.vote_average}</p>
            <span
              className={`favorite-icon ${
                favorite.some((fav) => fav.id === movie.id) ? "filled" : ""
              }`}
              onClick={() => {
                handleFavoriteClick(movie);
                playSound(); // Play sound on click
              }}
              style={{ cursor: "pointer" }}
            >
              {favorite.some((fav) => fav.id === movie.id) ? (
                <i className="fas fa-heart"></i> // Use filled heart icon
              ) : (
                <i className="far fa-heart"></i>
              )}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieList;
