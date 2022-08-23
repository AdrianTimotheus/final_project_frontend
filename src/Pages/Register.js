import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterSuccess, setIsRegisterSuccess] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

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

    fetch('http://localhost:8080/wallets/9009090/transactions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(() => {
        setIsRegisterSuccess(true);
        history.push('/home');
      }).catch((err) => {
        setErrorMessage(err);
        setIsRegisterSuccess(false);
      });
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleRegister} className="container mx-auto d-block w-100">
        <div className="mb-3 mt-3">
          <label htmlFor="name">Name</label>
          <input id="name" type="email" value={name} onChange={handleNameChange} className="form-control" placeholder="Enter full name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" value={email} onChange={handleEmailChange} className="form-control" placeholder="Enter email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={handlePasswordChange} className="form-control" placeholder="Password" />
          <small className="form-text text-muted">We will never share your password with anyone else.</small>
        </div>
        <div className="mb-3">
          <input type="submit" value="Submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" />
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
              {isRegisterSuccess ? (
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

export default Register;
