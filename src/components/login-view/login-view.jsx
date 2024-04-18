import { useState } from 'react';
import { Button, Card, Form }from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';

export const LoginView = ({onLoggedIn}) => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password
    };

    fetch('https://movie-matrix-b7781b74e464.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then((response) => response.json())
    .then((data) => {
      console.log('Login response: ', data);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert('This user does not exist');
      }
    })
    .catch((e) => {
      alert('Something went wrong');
    }); 
  }; 
  
  return (
    
    <Card className='d-flex flex-wrap align-items-center bg-dark mt-5 border-success'>
      <h3 className='mt-5 text-success'>Account Login: </h3>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label className='text-success mt-5'>Username:</Form.Label> 
        <Form.Control 
          type='text'
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className='text-success mt-5'>Password:</Form.Label>
        <Form.Control 
          type='password'
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          required
         /> 
      </Form.Group>
      <Button className='mt-5 mb-5' variant='success' type='submit'>
        Submit
      </Button>
    </Form>
    </Card>
  );
};