import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/Navbar';
import NavBarAdmin from '../Components/NavbarAdmin';

function Profile() {
  // const {
  //   tokenProps,
  //   roleProps,
  // } = props;
  const location = useLocation();
  const [token, setToken] = useState('');
  const [id, setID] = useState(0);
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [usedCredit, setUsedCredit] = useState(0);
  const [creditLimit, setCreditLimit] = useState(0);
  const [creditHealth, setCreditHealth] = useState('');
  const [contractStatus, setContractStatus] = useState('');

  const confirmContract = () => {
    const patchData = {
      id,
      contractStatus: 'Confirmed',
    };
    fetch('http://localhost:8080/contract', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patchData),
    }).then((response) => {
      console.log(response);
      setContractStatus('Confirmed');
    });
  };

  useEffect(() => {
    setToken(location.state?.token || '');
    fetch('http://localhost:8080/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((json) => {
        setID(json.id);
        setRole(json.role);
        setName(json.name);
        setEmail(json.email);
        setUsedCredit(json.usedCredit);
        setCreditLimit(json.creditLimit);
        setCreditHealth(json.creditHealth);
        setContractStatus(json.contractStatus);
      });
    });
  }, []);
  return (
    <>
      {token === '' ? (
        <h1>
          Please
          <a href="login"> login </a>
          first
        </h1>
      ) : role === 'Admin' ? (
        <>
          <NavBarAdmin token={token} role={role} />
          <h1>Admin Profile</h1>
        </>
      ) : (
        <>
          <NavBar token={token} role={role} />
          <p>
            Name:
            {name}
          </p>
          <p>
            Email:
            {email}
          </p>
          <p>
            Role:
            {role}
          </p>
          <p>
            Used credit:
            {usedCredit}
          </p>
          <p>
            Credit Limit:
            {creditLimit}
          </p>
          <p>
            Credit Health:
            {creditHealth}
          </p>
          <p>
            Contract Status:
            {contractStatus}
          </p>
          {contractStatus === 'Received' && (
          <button onClick={confirmContract} type="button">Confirm</button>
          )}
        </>
      )}
    </>
  );
}

export default Profile;
