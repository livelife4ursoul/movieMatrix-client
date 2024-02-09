import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('https://movie-matrix-b7781b74e464.herokuapp.com/movies')
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          console.log(movies);
          return {
            ID: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Image: movie.ImagePath,
            Genre: {
              name: movie.Genre.Name
            },
            Director: {
              name: movie.Director.Name
            },
            Featured: movie.Featured
          };
        });
       
        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => 
        setSelectedMovie(null)} />
      );
  }

  if (movies.length === 0) {
    return <div>The Movie List is Empty!</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.ID}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }} 
        />
      ))}
    </div>   
  );
};