import { Link } from 'react-router-dom';
import React from 'react';

function Home() {
  return (
    <>
      <h1 className="text-center">Joplin</h1>
      <div className="d-flex justify-content-around">
        <button type="button" className="btn btn-primary">
          <Link to="/register" className="text-white" style={{ textDecoration: 'none' }}>Register</Link>
        </button>
        <button type="button" className="btn btn-primary">
          <Link to="/login" className="text-white" style={{ textDecoration: 'none' }}>Login</Link>
        </button>
      </div>

    </>
  );
}

export default Home;
