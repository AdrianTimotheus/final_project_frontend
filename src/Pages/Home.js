import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Register from './Register';

function Home() {
  return (
    <Routes>
      <Route
        path="register"
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
    </Routes>
  );
}

export default Home;
