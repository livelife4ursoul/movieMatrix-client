import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser? storedUser: null);
  const [token, setToken] = useState(storedToken? storedToken: null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://movie-matrix-b7781b74e464.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log(movies);
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
  }, [token]);

  return (
    <Row className='justify-content-md-center'>
      {!user ? (
        <Col md={5}>
          <LoginView 
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} 
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            img='w-100'
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The Movie List is Empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className='mb-4' key={movie.ID} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
            <Button
              onClick={() => {
                setUser(null); setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </Button>
        </>
      )}
    </Row>  
       
  );
  
};

// if (!user) {
//   return (
//     <>
//       <LoginView
//         onLoggedIn={(user, token) => {
//           setUser(user);
//           setToken(token);
//         }}
//       />
//       or
//       <SignupView />
//     </>
//   );
// }

// if (selectedMovie) {
//   return (
//     <MovieView movie={selectedMovie} onBackClick={() => 
//       setSelectedMovie(null)} />
//     );
// }

// if (movies.length === 0) {
//   return <div>The Movie List is Empty!</div>;
// }
// return (
//   <div>
//     {movies.map((movie) => (
//       <MovieCard 
//         key={movie.ID}
//         movie={movie}
//         onMovieClick={(newSelectedMovie) => {
//           setSelectedMovie(newSelectedMovie);
//         }} 
//       />
//     ))}