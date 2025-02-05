import { createContext, useState, useEffect } from "react";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [movieDetail, setMovieDetail] = useState(null);
  const [favorite, setFavorite] = useState([]);

  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const apiKey = "c7cba54e8036127f06f9792f9781dbad";
  const baseUrl = "https://api.themoviedb.org/3";
  const apiUrl = `${baseUrl}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
  const searchUrl = `${baseUrl}/search/movie?api_key=${apiKey}&query=`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [apiUrl]);

  useEffect(() => {
    if (searchQuery) {
      fetch(searchUrl + searchQuery)
        .then((response) => response.json())
        .then((data) => setMovies(data.results))
        .catch((error) => console.error("Error searching movies:", error));
    }
  }, [searchQuery, searchUrl]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorite(storedFavorites);
    }
  }, []);

  useEffect(() => {
    if (favorite.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorite));
    } else {
      localStorage.removeItem("favorites");
    }
  }, [favorite]);

  const handleMovieClick = (movie, navigate, state = {}) => {
    setMovieDetail(movie);
    navigate("/movie-detail", { state }); // Pass state
  };

  const handleBackToList = (navigate) => {
    setMovieDetail(null);
    navigate(-1); // Go back to the previous page
  };

  const handleFavoriteClick = (movie) => {
    // Logic for adding/removing favorites
    setFavorite((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === movie.id)) {
        return prevFavorites.filter((fav) => fav.id !== movie.id); // Remove from favorites
      } else {
        return [...prevFavorites, movie]; // Add to favorites
      }
    });
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setSearchQuery,
        movieDetail,
        handleMovieClick,
        handleBackToList,
        favorite,
        handleFavoriteClick,
        imgUrl,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext, MovieProvider };
