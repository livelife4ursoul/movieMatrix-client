import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { Col, Row } from 'react-bootstrap';

export const TopMovies = ({ movies, user, addTopMovie, removeTopMovie }) => {

  const [topMovies, setTopMovies] = useState([]);
  
  useEffect(() => {
    // Filter movies based on user's favorite movie IDs
    const userTopMovies = movies.filter(movie => user.TopMovies.includes(movie.ID));
    setTopMovies(userTopMovies);
  }, [movies, user]);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  return ( 
    <>
      <Row>
        <Col xs={12} className='text-warning mb-5'>
          <h2 className='mt-5 text-center'>{capitalizeFirstLetter(user.Username)}'s Top Movies</h2>
        </Col>
      </Row>

      {topMovies.map(movie => (  
        
        <Col md={3} key={movie.ID}>
          <MovieCard 
            key={movie.ID}
            movie={movie}
            addTopMovie={addTopMovie}
            removeTopMovie={removeTopMovie}
            user={user}  
          />
        </Col>
      ))}
    </> 
  );
};
