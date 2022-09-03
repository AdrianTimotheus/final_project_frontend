import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBarAdmin from '../Components/NavbarAdmin';

function AdminRequest() {
  const location = useLocation();
  const [requests, setRequests] = useState([]);
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  // const [id, setID] = useState(0);

  useEffect(() => {
    setToken(location.state?.token || '');
    setRole('Admin');
    fetch('http://localhost:8080/pendingloans', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((json) => {
        setRequests([...json]);
      });
    });
  }, []);

  const acceptLoan = (event, index, item) => {
    const patchData = {
      id: item.id,
      loanStatus: 'Accepted',
    };

    const updatedRequests = requests.slice();
    updatedRequests.splice(index, 1);
    setRequests([...updatedRequests]);

    fetch('http://localhost:8080/loan', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patchData),
    }).then((response) => {
      console.log(response);
    });
    event.preventDefault();
  };

  return (
    <>
      <NavBarAdmin token={token} role={role} />
      {token !== '' && (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tenor</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {
              requests.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.tenor}</td>
                  <td>{item.amount}</td>
                  <button
                    type="button"
                    className="btn"
                    onClick={(e) => acceptLoan(e, index, item)}
                  >
                    Accept Loan
                  </button>
                </tr>
              ))
            }
        </tbody>
      </table>
      )}
    </>
  );
}

export default AdminRequest;
