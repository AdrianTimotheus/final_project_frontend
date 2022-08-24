import { Link, Route, Routes } from 'react-router-dom';
import React from 'react';
import Register from './Register';
import Login from './Login';

function Home() {
  return (
    <>
      <h1>Joplin</h1>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
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
          path="home"
          element={
            <Home />
              }
        />
      </Routes>
    </>
  );
}

export default Home;
