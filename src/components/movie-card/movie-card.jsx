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
    <Card className='h-100 bg-success text-warning' style={{ display: 'flex', cursor: 'pointer' }}>
      <Card.Body>
        <Link to={`/movies/${encodeURIComponent(movie.ID)}`}>
          <Card.Img style={{ }} variant='top' src={movie.Image} />
        </Link>
        <div className='bg-secondary'>
          <Checkbox 
            icon={<FavoriteBorderIcon />}
            checkedIcon={<FavoriteIcon />}
            checked={isFavorite}
            onClick={toggleFavorite}
          />
        </div>  
        <Card.Title className='mt-5'>{movie.Title}</Card.Title>
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
