import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

export const UpdateUser = ({ handleUpdate, handleDelete, Username, Password, Email, Birthday, setUsernameUpdate, setPasswordUpdate, setEmailUpdate, setBirthdayUpdate }) => {
  return (
    <>
      <Card.Title>Update User Profile</Card.Title>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId='formUsername'>
              <Form.Label>Username:</Form.Label>
              <Form.Control 
                className='mb-3'
                type='text'
                value={Username}
                onChange={(e) => setUsernameUpdate(e.target.value)}
                minLength='6'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control 
                type='password'
                value={Password}
                onChange={(e) => setPasswordUpdate(e.target.value)}
                minLength='6'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control 
                type='email'
                value={Email}
                onChange={(e) => setEmailUpdate(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthday:</Form.Label> 
              <Form.Control 
                type='date'
                value={Birthday}
                onChange={(e) => setBirthdayUpdate(e.target.value)}
              />
            </Form.Group>
          </Form>
            <Button type='submit' size='lg' onClick={handleUpdate} >Update Profile</Button>
            <Button className='bg-danger' size='lg' onClick={handleDelete}>Delete Profile</Button>
    </>
  )
}
