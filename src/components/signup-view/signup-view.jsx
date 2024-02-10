import { useState } from 'react';

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

    fetch('https://movie-matrix-b7781b74e464.herokuapp.com', {
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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input 
          type='text'
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          minLength='6'
          required
        />
      </label>
      <label>
        Password:
        <input 
          type='password'
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          minLength='6'
          required
        />
      </label>
      <label>
        Email:
        <input 
          type='email'
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday: 
        <input 
          type='date'
          value={Birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type='submit'>Submit</button>
    </form>
  );
};