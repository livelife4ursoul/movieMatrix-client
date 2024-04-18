import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

export const UpdateUser = ({ handleUpdate, handleDelete, Username, Password, Email, Birthday, setUsernameUpdate, setPasswordUpdate, setEmailUpdate, setBirthdayUpdate }) => {
  return (
    <>
    <Card className='bg-dark mt-5 border-success'>
      <Card.Title className='mb-5 mt-5 text-success'>Update Your Profile:</Card.Title>
      <Card.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId='formUsername'>
              <Form.Label className='text-success'>Username:</Form.Label>
              <Form.Control 
                className='mb-5 text-warning'
                type='text'
                value={Username}
                onChange={(e) => setUsernameUpdate(e.target.value)}
                minLength='6'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className='text-success'>Password:</Form.Label>
              <Form.Control 
                className='mb-5 text-warning'
                type='password'
                value={Password}
                onChange={(e) => setPasswordUpdate(e.target.value)}
                minLength='6'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className='text-success'>Email:</Form.Label>
              <Form.Control
                className='mb-5 text-warning' 
                type='email'
                value={Email}
                onChange={(e) => setEmailUpdate(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className='text-success'>Birthday:</Form.Label> 
              <Form.Control 
                className='mb-5 text-warning'
                type='date'
                value={Birthday}
                onChange={(e) => setBirthdayUpdate(e.target.value)}
              />
            </Form.Group>
          </Form>
          
            <Button type='submit' size='md' className='bg-success text-warning' onClick={handleUpdate} >Update Profile</Button>
            <Button className='bg-danger text-warning' size='md' style={{ float: 'right' }} onClick={handleDelete}>Delete Profile</Button>
            </Card.Body>
            </Card>
    </>
  )
}
