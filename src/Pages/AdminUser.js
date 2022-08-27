import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import NavBarAdmin from '../Components/NavbarAdmin';

function AdminUser() {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const [id, setID] = useState(0);
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [usedCredit, setUsedCredit] = useState(0);
  const [creditLimit, setCreditLimit] = useState(0);
  const [creditHealth, setCreditHealth] = useState('');
  const [contractStatus, setContractStatus] = useState('');
  const [email, setEmail] = useState('');
  const [idx, setIdx] = useState(0);

  console.log(creditHealth);
  console.log(contractStatus);

  useEffect(() => {
    setToken(location.state?.token || '');
    setRole('Admin');
    fetch('http://localhost:8080/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((json) => {
        setUsers([...json]);
      });
    });
  }, []);

  const setUserStates = (event, user, index) => {
    setName(user.name);
    setEmail(user.email);
    setCreditHealth(user.creditHealth);
    setCreditLimit(user.creditLimit);
    setUsedCredit(user.usedCredit);
    setID(user.id);
    setIdx(index);
    setContractStatus(user.contractStatus);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleCreditHealth = (event) => {
    setCreditHealth(event.target.value);
  };
  const handleCreditLimit = (event) => {
    setCreditLimit(event.target.value);
  };
  const handleUsedCredit = (event) => {
    setUsedCredit(event.target.value);
  };
  const handleContractStatus = (event) => {
    setContractStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    const updatedUserData = {
      id,
      name,
      email,
      usedCredit,
      creditLimit,
      creditHealth,
      contractStatus,
    };

    const updatedUsers = users.slice();
    updatedUsers[idx] = updatedUserData;
    setUsers([...updatedUsers]);

    fetch('http://localhost:8080/user', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    }).then((response) => {
      console.log(response);
    });

    event.preventDefault();
  };

  return (
    <>
      <NavBarAdmin token={token} role={role} />
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
              <form onSubmit={handleSubmit} className="container mx-auto d-block w-100">
                <div className="mb-3 mt-3">
                  <label htmlFor="name">Name</label>
                  <input id="name" type="text" value={name} onChange={handleNameChange} className="form-control" placeholder="Enter full name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Email address</label>
                  <input id="email" type="email" value={email} onChange={handleEmailChange} className="form-control" placeholder="Enter email" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Used credit</label>
                  <input type="number" value={usedCredit} onChange={handleUsedCredit} required min="0" max={creditLimit} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Credit limit</label>
                  <input type="number" value={creditLimit} onChange={handleCreditLimit} required min="0" className="form-control" />
                </div>
                <select onChange={handleCreditHealth} value={creditHealth} className="form-select">
                  <option value="Good">Good</option>
                  <option value="Warning">Warning</option>
                  <option value="Blocked">Blocked</option>
                </select>
                <select onChange={handleContractStatus} value={contractStatus} className="form-select">
                  <option value="NoContract">No contract</option>
                  <option value="Given">Given to expedition partner</option>
                  <option value="Delivered">Contract is being delivered</option>
                  <option value="Received">Contract received by user</option>
                </select>
                <input type="submit" value="Submit" data-bs-dismiss="modal" />
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      {token !== '' && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Used Credit</th>
              <th>Credit Limit</th>
              <th>Credit Health</th>
              <th>Contract Status</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.usedCredit}</td>
                  <td>{user.creditLimit}</td>
                  <td>{user.creditHealth}</td>
                  <td>{user.contractStatus}</td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => setUserStates(e, user, index)}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Edit
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

export default AdminUser;
