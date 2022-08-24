import { Link } from 'react-router-dom';
import React from 'react';

function Home() {
  return (
    <>
      <h1>Joplin</h1>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </>
  );
}

export default Home;
