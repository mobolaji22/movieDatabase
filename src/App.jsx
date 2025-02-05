import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieContent from "./components/MovieContent";
import Favorites from "./components/Favorites";
import MovieDetail from "./components/MovieDetail";
import { MovieProvider } from "./components/MovieContext";
import "./App.css";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MovieProvider>
      <Router>
        <header>
          <h1 className="header">Movie Database</h1>
        </header>
        <Routes>
          <Route path="/" element={<MovieContent />} />
          <Route path="/movie-detail" element={<MovieDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </MovieProvider>
  );
}

export default App;
