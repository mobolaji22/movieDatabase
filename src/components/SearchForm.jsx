import { useState, useContext } from "react";
import { MovieContext } from "./MovieContext";

function SearchForm() {
  const [title, setTitle] = useState("");
  const { setSearchQuery } = useContext(MovieContext);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(title);
  };

  return (
    <div className="title-search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Search for a movie..."
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SearchForm;
