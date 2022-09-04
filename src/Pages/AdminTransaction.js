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
  const [dueDate, setDueDate] = useState();
  const [installmentID, setInstallmentID] = useState(0);
  const [installmentIdx, setInstallmentIdx] = useState(0);

  const today = new Date();
  const todayDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  const handleDueDate = (event) => {
    setDueDate(event.target.value);
    console.log(dueDate);
  };

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

  const changeDueDate = (event) => {
    const patchData = {
      id: installmentID,
      dueDate: new Date(`${dueDate} 07:00:01`),
    };

    const updatedInstallments = installments.slice();
    updatedInstallments[installmentIdx].dueDate = dueDate;
    setInstallments([...updatedInstallments]);

    fetch('http://localhost:8080/installment', {
      method: 'PATCH',
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

  const setInstallmentStates = (event, index, item) => {
    setInstallmentID(item.id);
    setDueDate(item.dueDate);
    setInstallmentIdx(index);
  };

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
          <>
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
                    <h5 className="modal-title" id="exampleModalLabel">Edit Due Date</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                  </div>
                  <div className="modal-body">
                    <form onSubmit={changeDueDate} className="container mx-auto d-block w-100">
                      <div className="mb-3">
                        <label className="form-label">Due Date</label>
                        <input type="date" value={dueDate} onChange={handleDueDate} min={todayDate} className="form-control" />
                      </div>
                      <input type="submit" value="Submit" />
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
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
                installments.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.loanID}</td>
                    <td>{item.borrowerID}</td>
                    <td>{item.dueDate}</td>
                    <td>{item.tenorNumber}</td>
                    <td>{item.amount}</td>
                    <td>{item.isPaid ? 'Yes' : 'No'}</td>
                    <td>
                      <button
                        type="button"
                        className="btn"
                        onClick={(e) => setInstallmentStates(e, index, item)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </>
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
