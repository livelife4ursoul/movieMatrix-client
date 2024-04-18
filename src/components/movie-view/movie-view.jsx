import React from 'react';
import { useParams } from 'react-router';
import { Card, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types';
import './movie-view.scss';

export const MovieView = ({ user, movies, addTopMovie, removeTopMovie, topMovies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.ID === movieId);

  return (
    <>
      <Row className='mb-5 mt-5'>
        <Col xs={12} sm={4}>
        
        <MovieCard 
          key={movie.ID}
          movie={movie}
          addTopMovie={addTopMovie}
          removeTopMovie={removeTopMovie}
          user={user}
          topMovies={topMovies}
            
        />
        </Col>
        <Col xs={12} sm={6}>
        
        <Card className='h-100 text-warning'>
         <Card.Body className=''>
            <Card.Title>Director:</Card.Title>
            <Card.Text>{movie.Director.Name}</Card.Text>
            <Card.Title>Plot:</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Card.Title>Genre:</Card.Title>
            <Card.Text>{movie.Genre.Name}</Card.Text>  
            <Card.Title>{movie.Featured ? 'Featured Film' : 'Not a Featured Film'}</Card.Title>
            <Card.Footer className='footer position-absolute w-100 mb-5'>
            <Card.Link href={`/`}>All Movies</Card.Link>
            <Card.Link style={{ float: 'right' }} href={`/topmovies/${user.Username}`}>My Top Movies</Card.Link>
            </Card.Footer>
          </Card.Body>
        </Card> 
        </Col>
      </Row>
    </>
  );
};

MovieView.propTypes = {
  user: PropTypes.object.isRequired,
  movie: PropTypes.array.isRequired,
  addTopMovie: PropTypes.func.isRequired,
  removeTopMovie: PropTypes.func.isRequired
};