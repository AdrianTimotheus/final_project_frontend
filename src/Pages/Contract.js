import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/Navbar';

function Contract() {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const location = useLocation();
  useEffect(() => {
    setToken(location.state?.token || '');
    setRole(location.state?.role || '');
  }, []);
  console.log(location);
  return (
    <>
      {token === '' ? (
        <h1>
          Please
          <a href="login"> login </a>
          first
        </h1>
      ) : (
        <>
          <NavBar />
          <h1>{role}</h1>
        </>
      )}
    </>
  );
}

export default Contract;
