import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { UpdateUser } from './update-user';

export const ProfileView = ({ user, setUser }) => {
  const [Username, setUsernameUpdate] = useState('');
  const [Password, setPasswordUpdate] = useState('');
  const [Email, setEmailUpdate] = useState('');
  const [Birthday, setBirthdayUpdate] = useState('');

  const token = localStorage.getItem('token');
  const clearToken = () => {
    localStorage.removeItem('token');
    window.location.href = '/signup';
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const formatBirthday = (dateString) => {
    const formattedDate = dateString.substring(0, 10);
    const [year, month, day] = formattedDate.split('-');
    return `${month}/${day}/${year}`;
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    const data = {
      Username: Username || undefined,
      Password: Password || undefined,
      Email: Email || undefined,
      Birthday: Birthday || undefined
    };

    fetch(`https://movie-matrix-b7781b74e464.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      console.log(response);
      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser); 
        alert('Profile Update Success!');
        window.location.reload();
      } else {
        alert('Profile Update Failed. Please try again.');
      }
    }).catch(error => {
      console.error('Error: ', error);
    });
  };

  const handleDelete = () => {
    // Send request to delete user
    fetch(`https://movie-matrix-b7781b74e464.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        console.log('User deleted successfully');
        clearToken(token);
        
        // Optionally, perform any additional cleanup or navigation here
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <Container>     
      <Row>
        <Col>
          <Card className='d-flex flex-wrap align-items-center bg-dark text-success border-success mt-5'>
            <h3 className='mt-5 text-warning bg-secondary'>{capitalizeFirstLetter(user.Username)}'s Movie Matrix Profile:</h3>
              <Card.Body>
                <Card.Text>Email: {user.Email}</Card.Text>
                <Card.Text>Birthday: {formatBirthday(user.Birthday)}</Card.Text>
                <Card.Link className='text-success' href={`/topmovies/${user.Username}`}>My Top Movies</Card.Link>
              </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className='mt-5'>
          <UpdateUser
            setUsernameUpdate={setUsernameUpdate} 
            setPasswordUpdate={setPasswordUpdate}
            setEmailUpdate={setEmailUpdate}
            setBirthdayUpdate={setBirthdayUpdate}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </Col>
      </Row>
    </Container>
  );
};
