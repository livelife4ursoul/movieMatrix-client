import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const MovieCard = ({ addTopMovie, removeTopMovie, user, movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    setIsFavorite(user.TopMovies.includes(movie.ID));
  }, [movie.ID, user.TopMovies]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeTopMovie(movie.ID);
    } else {
      addTopMovie(movie.ID);
    }
    setIsFavorite(!isFavorite);
  };
 
  return (
    <Card className='h-100' style={{ display: 'flex', cursor: 'pointer' }}>
      <Link to={`/movies/${encodeURIComponent(movie.ID)}`}>
        <Card.Img  variant='top' src={movie.Image} />
      </Link>
        <div>
          <Checkbox 
            icon={<FavoriteBorderIcon />}
            checkedIcon={<FavoriteIcon />}
            checked={isFavorite}
            onClick={toggleFavorite}
          />
        </div>
      <Card.Body>
        {/* <Card.Title>{movie.Title}</Card.Title> */}
        <Card.Title>{movie.Title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    DirectorName: PropTypes.string,
  }).isRequired,
  addTopMovie: PropTypes.func.isRequired,
  removeTopMovie: PropTypes.func.isRequired,
};

{/* <Col className='d-flex flex-wrap justify-content-center mb-4' md={4}></Col> */}