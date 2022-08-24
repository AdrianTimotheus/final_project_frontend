import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Home from './Home';
import Contract from './Contract';

function Root() {
  // const [token, setToken] = useState('');
  // const [role, setRole] = useState('');
  return (
    <Routes>
      <Route
        path="/register"
        element={
          <Register />
                  }
      />
      <Route
        path="login"
        element={
          <Login />
                  }
      />
      <Route
        path="contract"
        element={
          <Contract />
            // token={token} role={role}
        }
      />
      <Route
        path="profile"
        element={
          <Profile />
              }
      />
      <Route
        path="/"
        element={
          <Home />
            }
      />
    </Routes>
  );
}

export default Root;
