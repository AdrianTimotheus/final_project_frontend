import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/Navbar';

function Request() {
  const location = useLocation();
  const [token, setToken] = useState('');
  const [tenor, setTenor] = useState('1');
  const [amount, setAmount] = useState(0);
  const [id, setID] = useState(0);
  const [role, setRole] = useState('');
  const [usedCredit, setUsedCredit] = useState(0);
  const [creditLimit, setCreditLimit] = useState(0);
  const [creditHealth, setCreditHealth] = useState('');
  const [requestData, setRequestData] = useState([]);
  const [contractStatus, setContractStatus] = useState('');

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
        setUsedCredit(json.usedCredit);
        setCreditLimit(json.creditLimit);
        setCreditHealth(json.creditHealth);
        setContractStatus(json.contractStatus);
      });
    });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/pendingloans/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((json) => {
        setRequestData([...json]);
      });
    });
  }, [id]);

  const handleTenor = (event) => {
    setTenor(event.target.value);
  };

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    const reqData = {
      tenor: Number(tenor),
      amount: Number(amount),
      loanStatus: 'Pending',
    };

    console.log(amount);
    console.log(tenor);
    console.log(reqData);

    fetch('http://localhost:8080/loan', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    })
      .then((response) => {
        response.json().then((json) => {
          setRequestData([...requestData, json]);
        });
      }).catch((err) => {
        alert('Failed');
        console.log(err);
      });
    event.preventDefault();
  };

  return (
    <>
      {token === '' ? (
        <h1>
          Please
          <a href="login"> login </a>
          first
        </h1>
      ) : contractStatus === 'Confirmed' ? (
        <h1>Please confirm your contract first</h1>
      ) : usedCredit === creditLimit ? (
        <h1>You have used up your credit</h1>
      ) : (creditHealth === 'Blocked' ? (
        <h1>Please pay your debt first</h1>
      ) : usedCredit > 0.8 * creditLimit && creditHealth === 'Warning' ? (
        <p>Credit: warning, you can still request loan if you pay your debt first</p>
      ) : (
        <>
          <NavBar token={token} role={role} />
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
                    <div className="mb-3">
                      <label className="form-label">Amount</label>
                      <br />
                      <input type="number" value={amount} onChange={handleAmount} required min="10000" max={creditHealth === 'Warning' ? creditLimit * 0.8 - usedCredit : creditLimit - usedCredit} className="form-control" />
                      <br />
                    </div>
                    <select onChange={handleTenor} value={tenor} className="form-select">
                      <option value="1">1 month (no interest)</option>
                      <option value="3">3 months (5% interest)</option>
                      <option value="6">6 months (10% interest)</option>
                      <option value="12">12 months (20% interest)</option>
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
          <div className="position-absolute bottom-0 end-0">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Loan Request</button>
          </div>
        </>
      ))}
      {token !== '' && (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Tenor</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {
              requestData.map((item) => (
                <tr key={item.id}>
                  <td>{item.tenor}</td>
                  <td>{item.amount}</td>
                </tr>
              ))
            }
        </tbody>
      </table>
      )}
    </>
  );
}

export default Request;
