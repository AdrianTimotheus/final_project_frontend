import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBarAdmin from '../Components/NavbarAdmin';

function AdminTransaction() {
  const location = useLocation();
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [transactionType, setTransactionType] = useState('Loans');
  const [loans, setLoans] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [sort, setSort] = useState('descending');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const handleTransactionType = (event) => {
    setTransactionType(event.target.value);
  };

  const handleSort = (event) => {
    setSort(event.target.value);
  };

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const previousPage = (event) => {
    setCurrentPage(currentPage - 1);
    event.preventDefault();
  };

  const nextPage = (event) => {
    setCurrentPage(currentPage + 1);
    event.preventDefault();
  };

  useEffect(() => {
    setToken(location.state?.token || '');
    setRole('Admin');
    fetch('http://localhost:8080/loans', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((json) => {
        const loanData = json.data;
        setTotalPage(json.totalPage);
        setLoans([...loanData]);
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
        const installmentData = json.data;
        setInstallments([...installmentData]);
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
        const paymentData = json.data;
        setPayments([...paymentData]);
      });
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    if (transactionType === 'Loans') {
      fetch(`http://localhost:8080/loans?${new URLSearchParams({
        sort,
        sortBy,
        page: Number(currentPage),
      })}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${location.state?.token || ''}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        response.json().then((json) => {
          const loanData = json.data;
          setTotalPage(json.totalPage);
          setLoans([...loanData]);
        });
      });
    }

    if (transactionType === 'Installments') {
      fetch(`http://localhost:8080/installments?${new URLSearchParams({
        sort,
        sortBy,
        page: Number(currentPage),
      })}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${location.state?.token || ''}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        response.json().then((json) => {
          const installmentData = json.data;
          setTotalPage(json.totalPage);
          setInstallments([...installmentData]);
        });
      });
    }

    if (transactionType === 'Payments') {
      fetch(`http://localhost:8080/payments?${new URLSearchParams({
        sort,
        sortBy,
        page: Number(currentPage),
      })}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${location.state?.token || ''}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        response.json().then((json) => {
          const paymentData = json.data;
          setTotalPage(json.totalPage);
          setPayments([...paymentData]);
        });
      });
    }
  }, [sort, sortBy]);

  useEffect(() => {
    console.log(totalPage);
    if (transactionType === 'Loans') {
      fetch(`http://localhost:8080/loans?${new URLSearchParams({
        sort,
        sortBy,
        page: Number(currentPage),
      })}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${location.state?.token || ''}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        response.json().then((json) => {
          const loanData = json.data;
          setTotalPage(json.totalPage);
          setLoans([...loanData]);
        });
      });
    }

    if (transactionType === 'Installments') {
      fetch(`http://localhost:8080/installments?${new URLSearchParams({
        sort,
        sortBy,
        page: Number(currentPage),
      })}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${location.state?.token || ''}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        response.json().then((json) => {
          const installmentData = json.data;
          setTotalPage(json.totalPage);
          setInstallments([...installmentData]);
        });
      });
    }

    if (transactionType === 'Payments') {
      fetch(`http://localhost:8080/payments?${new URLSearchParams({
        sort,
        sortBy,
        page: Number(currentPage),
      })}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${location.state?.token || ''}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        response.json().then((json) => {
          const paymentData = json.data;
          setTotalPage(json.totalPage);
          setPayments([...paymentData]);
        });
      });
    }
  }, [currentPage, transactionType]);

  return (
    <>
      {token === '' ? (
        <h1>
          Unauthorized
        </h1>
      ) : (
        <>
          <NavBarAdmin token={token} role={role} />
        </>
      )}
      {token !== '' && (
        <>
          <div className="d-flex justify-content-around">
            <select onChange={handleTransactionType} value={transactionType} className="form-select w-auto nav">
              <option value="Loans">Loans</option>
              <option value="Installments">Installments</option>
              <option value="Payments">Payments</option>
            </select>
            <select onChange={handleSortBy} value={sortBy} className="form-select w-auto nav">
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
            <select onChange={handleSort} value={sort} className="form-select w-auto nav">
              <option value="descending">Descending</option>
              <option value="ascending">Ascending</option>
            </select>
          </div>
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
          {currentPage !== 1 && (
          <button onClick={previousPage} type="button">Previous</button>
          )}
          {currentPage !== totalPage && (
          <button onClick={nextPage} type="button">Next</button>
          )}
        </>
      )}
    </>
  );
}

export default AdminTransaction;
