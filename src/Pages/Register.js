import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = (event) => {
    const postData = {
      name,
      email,
      password,
    };

    fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          alert('Email already used');
        } else {
          alert('Register success');
          navigate('/', { replace: true });
        }
      }).catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleRegister} className="container mx-auto d-block w-100">
        <div className="mb-3 mt-3">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={name} onChange={handleNameChange} className="form-control" placeholder="Enter full name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" value={email} onChange={handleEmailChange} className="form-control" placeholder="Enter email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={handlePasswordChange} className="form-control" placeholder="Password" required />
          <small className="form-text text-muted">We will never share your password with anyone else.</small>
        </div>
        <div className="mb-3">
          <input type="submit" value="Submit" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" />
        </div>
      </form>
    </>
  );
}

export default Register;
