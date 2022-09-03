import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    const postData = {
      email,
      password,
    };

    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          alert('Invalid email or password');
        } else {
          response.json().then((json) => {
            navigate('/profile', { replace: true, state: { token: json.idToken } });
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleLogin} className="container mx-auto d-block w-100">
        <div className="mb-3 mt-3">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" value={email} onChange={handleEmailChange} className="form-control" placeholder="Enter email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={handlePasswordChange} className="form-control" placeholder="Password" required />
        </div>
        <div className="mb-3">
          <input type="submit" value="Submit" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" />
        </div>
      </form>
    </>
  );
}

export default Login;
