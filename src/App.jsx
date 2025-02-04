// src/App.jsx
import "./App.css";
import MovieSearch from "./components/MovieSearch";

// Function to wrap each character in a span
const animateText = (text) => {
  return text.split("").map((char, index) => (
    <span
      key={index}
      className="header-char"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {char}
    </span>
  ));
};

function App() {
  return (
    <div className="app">
      {/* <h1 className="header">{animateText("Movie Database")}</h1> */}
      <h1 className="header">Movie Database</h1>
      <MovieSearch />
    </div>
  );
}

export default App;
