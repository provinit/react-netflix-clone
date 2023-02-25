import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Row.css";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const img_base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              src={`${img_base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              alt={movie.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Row;
