import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <>
      <Navbar className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Movie Matrix</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Offcanvas placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {!user && (
                  <>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                    <Nav.Link as={Link} to="/signup">
                      Signup
                    </Nav.Link>
                  </>
                )}
                {user && (
                  <>
                    <Nav.Link as={Link} to="/">
                      All Movies
                    </Nav.Link>
                    <Nav.Link>Profile</Nav.Link>
                    <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                    <Form className="d-flex">
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                      />
                      <Button variant="outline-success">Search</Button>
                    </Form>
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