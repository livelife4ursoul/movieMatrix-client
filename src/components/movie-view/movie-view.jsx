import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types';

export const MovieView = ({ user, movies, addTopMovie, removeTopMovie, topMovies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.ID === movieId);

  return (
    <>
      <Row>
        <MovieCard 
          key={movie.ID}
          movie={movie}
          addTopMovie={addTopMovie}
          removeTopMovie={removeTopMovie}
          user={user}
          topMovies={topMovies}
            
        />
        <Card>
         <Card.Body>
            <Card.Title>Director:</Card.Title>
            <Card.Text>{movie.Director.Name}</Card.Text>
            <Card.Title>Plot:</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Card.Title>Genre:</Card.Title>
            <Card.Text>{movie.Genre.Name}</Card.Text>  
            <Card.Title>{movie.Featured ? 'Featured Film' : 'Null'}</Card.Title>
            <Card.Link href={`/`}>Back To All Movies</Card.Link>
            <Card.Link href={`/topmovies/${user.Username}`}>Go To My Top Movies</Card.Link>
          </Card.Body>
        </Card> 
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