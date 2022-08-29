import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/Navbar';

function AdminTransaction() {
  const location = useLocation();
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [transactionType, setTransactionType] = useState('Loans');
  const [loans, setLoans] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [payments, setPayments] = useState([]);

  const handleTransactionType = (event) => {
    setTransactionType(event.target.value);
  };

  useEffect(() => {
    setToken(location.state?.token || '');
    setRole('User');
    fetch('http://localhost:8080/loans', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((json) => {
        setLoans([...json]);
      });
    });
    fetch('http://localhost:8080/installments', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((json) => {
        setInstallments([...json]);
      });
    });
    fetch('http://localhost:8080/payments', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((json) => {
        setPayments([...json]);
      });
    });
  }, []);

  return (
    <>
      {token === '' ? (
        <h1>
          Unauthorized
        </h1>
      ) : (
        <>
          <NavBar token={token} role={role} />
        </>
      )}
      {token !== '' && (
        <>
          <select onChange={handleTransactionType} value={transactionType} className="form-select">
            <option value="Loans">Loans</option>
            <option value="Installments">Installments</option>
            <option value="Payments">Payments</option>
          </select>
          {transactionType === 'Loans' && (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Borrower ID</th>
                <th>Tenor</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                loans.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.borrowerID}</td>
                    <td>{item.tenor}</td>
                    <td>{item.amount}</td>
                    <td>{item.loanStatus}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          ) }
          {transactionType === 'Payments' && (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Installment ID</th>
                <th>Borrower ID</th>
                <th>Loan ID</th>
                <th>Payment Date</th>
                <th>Discount ID</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {
                payments.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.installmentID}</td>
                    <td>{item.borrowerID}</td>
                    <td>{item.loanID}</td>
                    <td>{item.paymentDate}</td>
                    <td>{item.discountID}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          ) }
          {transactionType === 'Installments' && (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Loan ID</th>
                <th>Borrower ID</th>
                <th>Due Date</th>
                <th>Tenor Number</th>
                <th>Amount</th>
                <th>Paid</th>
              </tr>
            </thead>
            <tbody>
              {
                installments.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.loanID}</td>
                    <td>{item.borrowerID}</td>
                    <td>{item.dueDate}</td>
                    <td>{item.tenorNumber}</td>
                    <td>{item.amount}</td>
                    <td>{item.isPaid ? 'Yes' : 'No'}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          ) }
        </>
      )}
    </>
  );
}

export default AdminTransaction;
