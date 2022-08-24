import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginSuccess, setIsLoginSuccess] = useState();
  const [errorMessage, setErrorMessage] = useState('');

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
        response.json().then((json) => {
          console.log(json.idToken);
          setIsLoginSuccess(true);
          navigate('/profile', { replace: true, state: { token: json.idToken } });
          console.log(response.status);
          alert(response.status);
        });
      }).catch((err) => {
        alert('Failed');
        console.log(err);
        setErrorMessage(err);
        setIsLoginSuccess(false);
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
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              {isLoginSuccess ? (
                <div>
                  <h1>Register Success</h1>
                  <h1>Please go to login page</h1>
                </div>
              ) : (
                <div>
                  <h1>Register Failed</h1>
                  <h1>{errorMessage}</h1>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
