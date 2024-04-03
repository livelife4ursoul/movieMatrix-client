import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { TopMovies } from '../top-movies/top-movies';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser? storedUser: null);
  const [token, setToken] = useState(storedToken? storedToken: null);
  const [movies, setMovies ] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  
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
            movie: movie,
            ID: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Image: movie.ImagePath,
            Genre: {
              Name: movie.Genre.Name
            },
            Director: {
              Name: movie.Director.Name
            },
            Featured: movie.Featured,
            
          };
        });
       
        setMovies(moviesFromApi);
      });
  }, [token]);

  //Add Top Movie
  const addTopMovie = (_id) => {

    fetch(`https://movie-matrix-b7781b74e464.herokuapp.com/users/${user.Username}/movies/${_id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      if(response.ok) {
        return response.json();
      } else {
          alert('Failed to add movie to Top Movies');
      }
    }).then((user) => {
      if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      }
    }).catch(error => {
      console.error('Error: ', error);
    });
  };

  //remove Top Movie
  const removeTopMovie = (_id) => {
    fetch(`https://movie-matrix-b7781b74e464.herokuapp.com/users/${user.Username}/TopMovies/${_id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert('Failed to remove movie from Top Movies')
      }
    }).then((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }
    }).catch(error => {
      console.error('Error: ', error);
    });
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        token={token}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className='justify-content-md-center'>
        <Routes>
          <Route 
            path='/signup'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path='/login'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path='/movies/:movieId'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>This list of movies is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView 
                      img='w-75'
                      movies={movies}
                      movie={movies} 
                      user={user} 
                      addTopMovie={addTopMovie}
                      removeTopMovie={removeTopMovie}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path='/'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>This list of movies is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className='mb-4' key={movie.ID} md={3}>
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
                ) }
              </>
            }
          />
          <Route 
            path='/profile/:Username'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <>
                    <ProfileView 
                      token={token}
                      movies={movies}
                      user={user}
                      setUser={setUser}
                      addTopMovie={addTopMovie}
                      removeTopMovie={removeTopMovie}
                    />
                    
                  </>
                )}  
              </>
            }
          />
           <Route 
            path='/topmovies/:Username'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>This list of movies is empty!</Col>
                ) : (
                  <>
                    {movies.length > 0 && (
                      <TopMovies
                        key={topMovies.ID} 
                        movies={movies}
                        user={user}
                        addTopMovie={addTopMovie}
                        removeTopMovie={removeTopMovie}
                        setTopMovies={setTopMovies}
                      />
                    )}        
                  </>
                )}  
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
