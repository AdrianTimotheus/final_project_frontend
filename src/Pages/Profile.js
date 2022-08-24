import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Profile() {
  // const {
  // } = props;
  const location = useLocation();
  console.log('here');
  const [token, setToken] = useState('');
  useEffect(() => {
    setToken(location.state?.token || '');
  }, []);
  return (
    <>
      {token === '' ? (
        <h1>
          Please
          <a href="login"> login </a>
          first
        </h1>
      ) : (
        <h1>Token available</h1>
      )}
      <h1>hello</h1>
    </>
  );
}

export default Profile;
