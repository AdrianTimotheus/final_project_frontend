import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import NavBar from '../Components/Navbar';

function Installment() {
  const location = useLocation();
  const [installments, setInstallments] = useState([]);
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [vouchers, setVouchers] = useState([]);
  const [voucherIdx, setVoucherIdx] = useState(0);
  const [installmentIdx, setInstallmentIdx] = useState();
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  // const [discountedAmount, setDiscountedAmount] = useState(0);
  const [installmentID, setInstallmentID] = useState(0);
  const [loanID, setLoanID] = useState(0);
  const [borrowerID, setBorrowerID] = useState(0);
  const now = moment();

  // for (let i = 0; i < installments.length; i += 1) {
  //   console.log(now.diff(installments[i].dueDate, 'days'));
  // }

  useEffect(() => {
    console.log(location.state.token);
    setToken(location.state?.token || '');
    setRole('User');
    fetch('http://localhost:8080/unpaidinstallment', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((json) => {
        setInstallments([...json]);
        // console.log(installments);
      });
    });
    fetch('http://localhost:8080/vouchers', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((json) => {
        json.filter((item) => item.remainingUsage > 0 && moment(item.activeUntil) > now);
        setVouchers([...json]);
        // console.log(json);
      });
    });
  }, []);

  const handleVoucherIdx = (event) => {
    // setSelectedVoucher(event.target.value);
    setVoucherIdx(event.target.value);
    setCalculatedAmount((installments[installmentIdx].amount
            + (now.diff(installments[installmentIdx].dueDate, 'days') > 0
              ? 5000 * now.diff(installments[installmentIdx].dueDate, 'days')
              : 0)
    )
        * (1 - (vouchers[event.target.value].discountPercentage / 100)));
  };

  const showPayModal = (event, index, item) => {
    setCalculatedAmount((item.amount
        + (now.diff(item.dueDate, 'days') > 0
          ? 5000 * now.diff(item.dueDate, 'days')
          : 0)
    )
        * (1 - (vouchers[voucherIdx].discountPercentage / 100)));
    setInstallmentID(item.id);
    setLoanID(item.loanID);
    setBorrowerID(item.borrowerID);
    setInstallmentIdx(index);
  };

  const handlePayment = (event) => {
    event.preventDefault();
    // console.log(vouchers);
    // apa aja yang harus dilakuin?
    // rombak state si vouchers, dapetin indexnya, kurangin quantitynya
    const updatedVouchers = vouchers.slice();
    console.log(voucherIdx);
    updatedVouchers[voucherIdx].remainingUsage -= 1;
    setVouchers([...updatedVouchers]);
    // console.log(vouchers);

    // rombak state si installmentsnya, hapus index debtnya
    const updatedInstallments = installments.slice();
    updatedInstallments.splice(installmentIdx, 1);
    setInstallments([...updatedInstallments]);
    // console.log(installments);

    // PATCH ke /voucher, kurangin quantity vouchernya 1 buah berdasarkan voucher idnya
    const updatedVoucher = {
      id: updatedVouchers[voucherIdx].id,
      remainingUsage: updatedVouchers[voucherIdx].remainingUsage,
    };

    fetch('http://localhost:8080/voucher', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedVoucher),
    }).then((response) => {
      console.log(response);
    });

    // PATCH ke /installment, set isPaid true berdasarkan debt idnya / loan idnya + current tenor
    const data = {
      id: installmentID,
      isPaid: true,
    };

    fetch('http://localhost:8080/installment', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
    });

    // POST ke /payment, bikin transaction baru dengan data:
    // installmentID : id
    // loanID: item.loanID
    // paymentDate: moment()
    // discountID : ???
    // borrowerID : item.borrowerID

    const paymentData = {
      installmentID,
      loanID,
      paymentDate: now,
      discountID: updatedVouchers[voucherIdx].id,
      borrowerID,
      amount: calculatedAmount,
    };

    fetch('http://localhost:8080/payment', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    }).then((response) => {
      console.log(response);
    });
  };

  return (
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
              <form onSubmit={handlePayment} className="container mx-auto d-block w-100">
                <div className="mb-3">
                  <label className="form-label">
                    Amount:
                    {calculatedAmount}
                  </label>
                </div>
                <select onChange={handleVoucherIdx} value={voucherIdx} className="form-select">
                  {vouchers.filter((voucher) => voucher.remainingUsage > 0 && moment(voucher.activeUntil) > now).map((item, index) => <option key={item.id} value={index}>{item.voucherCode}</option>)}
                  {/* {vouchers.map((item, index) => (<option key={item.id} value={index}>{item.voucherCode}</option>))} */}
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
              <th>Loan ID</th>
              <th>Due Date</th>
              <th>Tenor Number</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {
              installments.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.loanID}</td>
                  <td>{item.dueDate}</td>
                  <td>{item.tenorNumber}</td>
                  <td>{item.amount}</td>
                  <button
                    type="button"
                    className="btn"
                    onClick={(e) => showPayModal(e, index, item)}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Pay
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

export default Installment;

// update voucher quantity, create new payment, set loan to paid
// create 3 states: all, filtered, shown (for pagination)
