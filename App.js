import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        let timeOut = setTimeout(() => {
          fetchMoviesHandler();
        }, 5000);
        cancelReq(timeOut);
        throw new Error(`some thing went wrong...re-trying`);
      }

      const data = await response.json();
      const transFormedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });
      setMovies(transFormedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function cancelReq(cancel) {
    clearTimeout(cancel);
    setIsLoading(false);
    setError(null);
  }

  function movieAddHandler(movie){
    console.log(movie);
  }
  return (
    <React.Fragment>
      <AddMovie onAddMovie={movieAddHandler}/>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && !error && movies.length === 0 && <p>No movies found</p>}
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...</p>}
        {error && (
          <p>
            {error}
            <button onClick={cancelReq}>cancel</button>
          </p>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
