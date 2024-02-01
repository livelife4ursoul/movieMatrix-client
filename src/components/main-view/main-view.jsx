import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      _id: 1,
      title: 'A Very Long Engagement',
      description: 'French romantic war film.',
      imagePath: 'https://m.media-amazon.com/images/I/51M8gHjJ29L.jpg',
      genre: {
        name: 'Romance'
      },
      director: {
        name: 'Jean-Pierre Jeunet'
      }
    },
    {
      _id: 2,
      title: 'The Hunger Games',
      description: 'Dystopian science fiction action film based on Suzanne Collins novel.',
      imagePath: 'https://m.media-amazon.com/images/I/61lfH12tRJL._AC_.jpg',
      genre: {
        name: 'Sci-Fi'
      },
      director: {
        name: 'Gary Ross'
      }
    },
    {
      _id: 3,
      title: 'Pulp Fiction',
      description: 'Cult classic crime film directed by Quentin Tarantino.',
      imagePath: 'https://m.media-amazon.com/images/I/71wPS3A1EYL._AC_SY741_.jpg',
      genre: {
        name: 'Crime'
      },
      director: {
        name: 'Quentin Tarantino'
      }
    },
    {
      _id: 4,
      title: 'Almost Famous',
      description: 'A high school boy in the early 1970s is given the chance to write a story for Rolling Stone magazine about an up-and-coming rock band as he accompanies them on their concert tour.',
      imagePath: 'https://m.media-amazon.com/images/I/51FYHW5zvBL._AC_.jpg',
      genre: {
        name: 'Drama'
      },
      director: {
        name: 'Cameron Crowe'
      }
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }} 
        />
      ))}
    </div>   
  );
};