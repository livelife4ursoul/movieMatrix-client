import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

export const SignupView = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday
    };

    fetch('https://movie-matrix-b7781b74e464.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      if (response.ok) {
        alert('You have been successfully created an account');
        window.location.reload();
      } else {
        alert('Signup has failed. Please try again.');
      }
    });
  };
  return (
    <Card className='d-flex flex-wrap align-items-center bg-dark text-success border-success mt-5'>
      <h3 className='mt-5 text-success'>New Account Signup: </h3>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label className='text-success mt-5'>Username:</Form.Label>
        <Form.Control
          type='text'
          value={Username}
          placeholder='At least 6 characters'
          onChange={(e) => setUsername(e.target.value)}
          minLength='6'
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className='text-success mt-5'>Password:</Form.Label>
        <Form.Control 
          type='password'
          value={Password}
          placeholder='At least 6 characters'
          onChange={(e) => setPassword(e.target.value)}
          minLength='6'
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className='text-success mt-5'>Email:</Form.Label>
        <Form.Control 
          type='email'
          value={Email}
          placeholder='Type email here please'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className='text-success mt-5'>Birthday:</Form.Label> 
        <Form.Control 
          type='date'
          value={Birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button className='mt-5 mb-5' variant='success' type='submit'>Submit</Button>
    </Form>
    </Card>
  );
};