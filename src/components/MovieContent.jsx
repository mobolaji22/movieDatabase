import React from "react";
// import { MovieProvider } from './MovieContext';
import SearchForm from "./SearchForm";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import { MovieContext } from "./MovieContext";

// function MovieSearch() {
//     return (
//         <MovieProvider>
//             <MovieContent />
//         </MovieProvider>
//     );
// }

const MovieContent = () => {
  const {
    movieDetail,
    handleBackToList,
    imgUrl,
    favorite,
    handleFavoriteClick,
  } = React.useContext(MovieContext);

  return (
    <div>
      {!movieDetail ? (
        <div>
          <SearchForm />
          <br />
          <MovieList />
        </div>
      ) : (
        <>
          <button onClick={handleBackToList}>Back To List</button>
          <MovieDetail
            movie={movieDetail}
            imgUrl={imgUrl}
            onFavoriteClick={handleFavoriteClick}
            favorite={favorite}
          />
        </>
      )}
    </div>
  );
};

export default MovieContent;
// export default MovieSearch;
