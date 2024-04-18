import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import  logoImage  from '../img/matrixLogoBig.png';
import Image from 'react-bootstrap/Image';
import { SearchBar } from '../search-bar/search-bar';

export const NavigationBar = ({ user, onLoggedOut, onSearch, handleSearch }) => {

  return (
    <>
      <Navbar className='bg-warning-body-tertiary bg-dark mb-3 text-success' expand='md' bg='' variant='' style={{ }} >
        <Container fluid>
          <Navbar.Brand href="/"><Image src={logoImage} fluid style={{ width: '75px'}} /></Navbar.Brand>
          <Navbar.Toggle className='bg-success' />
          <Navbar.Offcanvas  placement='end'>
            <Offcanvas.Header className='bg-success' closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 text-success">
                {!user && (
                  <>
                    <Nav.Link className='text-success' as={Link} to="/login">
                      Login
                    </Nav.Link>
                    <Nav.Link className='text-success' as={Link} to="/signup">
                      Signup
                    </Nav.Link>
                  </>
                )}
                {user && (
                  <>
                    <Nav.Link className='text-success' as={Link} to="/">
                      All Movies
                    </Nav.Link>
                    <Nav.Link className='text-success' as={Link} to={`/profile/${user.Username}`}>Profile</Nav.Link>
                    <Nav.Link className='text-success' as={Link} to={`/topmovies/${user.Username}`}>Top Movies</Nav.Link>
                    <Nav.Link className='text-success' onClick={onLoggedOut}>Logout</Nav.Link>
                    <SearchBar handleSearch={handleSearch} onSearch={onSearch} />
                  
                  </>
                )}
              </Nav>
             
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};