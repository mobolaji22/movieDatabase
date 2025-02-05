import { useContext, useRef } from "react";
import { MovieContext } from "./MovieContext";
import { useNavigate, useLocation } from "react-router-dom";

function MovieDetail() {
  const {
    movieDetail,
    imgUrl,
    handleFavoriteClick,
    favorite,
    handleBackToList,
  } = useContext(MovieContext);

  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef(null); // Reference for audio

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset sound
      audioRef.current.play(); // Play sound
    }
  };

  if (!movieDetail) {
    return <p>No movie selected.</p>;
  }

  return (
    <>
      {/* Show "Back" button only if navigated from Favorites */}
      {location.state?.fromFavorites ? (
        <button onClick={() => navigate("/favorites")}>Back</button>
      ) : (
        <button onClick={() => handleBackToList(navigate)}>Back To List</button>
      )}

      <div key={movieDetail.id} className="movie-detail">
        <audio ref={audioRef} src="click-sound.wav" /> {/* Sound effect */}
        <img
          src={`${imgUrl}${movieDetail.poster_path}`}
          alt={movieDetail.title}
          className="movie-image"
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
            <i className="fas fa-heart"></i>
          ) : (
            <i className="far fa-heart"></i>
          )}
        </span>
      </div>
    </>
  );
}

export default MovieDetail;
