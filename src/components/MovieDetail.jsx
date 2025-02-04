// src/components/MovieDetail.jsx
import { useContext, useRef } from "react";
import { MovieContext } from "./MovieContext";

function MovieDetail() {
  const { movieDetail, imgUrl, handleFavoriteClick, favorite } =
    useContext(MovieContext);
  const audioRef = useRef(null); // Reference for audio

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset sound
      audioRef.current.play(); // Play sound
    }
  };

  return (
    <div key={movieDetail.id} className="movie-detail">
      <audio ref={audioRef} src="click-sound.mp3" /> {/* Sound effect */}
      <img
        src={`${imgUrl}${movieDetail.poster_path}`}
        alt={movieDetail.title}
        className="movie-image" // Add class for styling
      />
      <h3>{movieDetail.title}</h3>
      <p>{movieDetail.overview}</p>
      <p>Vote Average: {movieDetail.vote_average}</p>
      <span
        className={`favorite-icon ${
          favorite.some((fav) => fav.id === movieDetail.id) ? "filled" : ""
        }`}
        onClick={() => {
          handleFavoriteClick(movieDetail);
          playSound(); // Play sound on click
        }}
        style={{ cursor: "pointer" }}
      >
        {favorite.some((fav) => fav.id === movieDetail.id) ? (
          <i className="fas fa-heart"></i> // Use filled heart icon
        ) : (
          <i className="far fa-heart"></i>
        )}
      </span>
    </div>
  );
}

export default MovieDetail;
