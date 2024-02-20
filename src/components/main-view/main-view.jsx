import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser? storedUser: null);
  const [token, setToken] = useState(storedToken? storedToken: null);
  const [movies, setMovies] = useState([]);
  
  
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
              Name: movie.Genre.Name
            },
            Director: {
              Name: movie.Director.Name
            },
            Featured: movie.Featured
          };
        });
       
        setMovies(moviesFromApi);
      });
  }, [token]);

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
                    <MovieView movies={movies} img='w-100' />
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
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                ) }
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
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

// return (
  //   <Row className='justify-content-md-center'>
  //     {!user ? (
  //       <Col md={5}>
  //         <LoginView 
  //           onLoggedIn={(user, token) => {
  //             setUser(user);
  //             setToken(token);
  //           }} 
  //         />
  //         or
  //         <SignupView />
  //       </Col>
  //     ) : selectedMovie ? (
  //       <Col md={8}>
  //         <MovieView
  //           img='w-100'
  //           movie={selectedMovie}
  //           onBackClick={() => setSelectedMovie(null)}
  //         />
  //       </Col>
  //     ) : movies.length === 0 ? (
  //       <div>The Movie List is Empty!</div>
  //     ) : (
  //       <>
  //         {movies.map((movie) => (
  //           <Col className='mb-4' key={movie.ID} md={3}>
  //             <MovieCard
  //               movie={movie}
  //               onMovieClick={(newSelectedMovie) => {
  //                 setSelectedMovie(newSelectedMovie);
  //               }}
  //             />
  //           </Col>
  //         ))}
  //           <Button
  //             onClick={() => {
  //               setUser(null); setToken(null);
  //               localStorage.clear();
  //             }}
  //           >
  //             Logout
  //           </Button>
  //       </>
  //     )}
  //   </Row>  
       
  // );