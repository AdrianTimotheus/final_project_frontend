import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import NavBarAdmin from '../Components/NavbarAdmin';

function AdminUser() {
  const location = useLocation();
  const [token, setToken] = useState('');
  const [id, setID] = useState(0);
  const [role, setRole] = useState('Admin');
  const [voucherCode, setVoucherCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [activeUntil, setActiveUntil] = useState('');
  const [remainingUsage, setRemainingUsage] = useState(0);
  const [idx, setIdx] = useState(0);
  const [vouchers, setVouchers] = useState([]);
  const [isNew, setIsNew] = useState(true);

  const today = new Date();
  const todayDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  useEffect(() => {
    setToken(location.state?.token || '');
    setRole('Admin');
    fetch('http://localhost:8080/vouchers', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((json) => {
        setVouchers([...json]);
      });
    });
  }, []);

  const setVoucherStates = (event, voucher, index) => {
    setID(voucher.id);
    setVoucherCode(voucher.voucherCode);
    setDiscountPercentage(voucher.discountPercentage);
    setActiveUntil(voucher.activeUntil);
    setRemainingUsage(voucher.remainingUsage);
    setIdx(index);
    setIsNew(false);
  };

  const resetStates = () => {
    setID(0);
    setVoucherCode('');
    setDiscountPercentage(0);
    setActiveUntil('');
    setRemainingUsage(0);
    setIdx(0);
    setIsNew(true);
  };

  const handleCodeChange = (event) => {
    setVoucherCode(event.target.value);
  };
  const handlePercentageChange = (event) => {
    setDiscountPercentage(event.target.value);
  };
  const handleActiveUntil = (event) => {
    setActiveUntil(event.target.value);
  };
  const handleRemainingUsage = (event) => {
    setRemainingUsage(event.target.value);
  };

  const handleSubmit = (event) => {
    const updatedVoucherData = {
      id,
      voucherCode,
      discountPercentage: Number(discountPercentage),
      activeUntil,
      remainingUsage: Number(remainingUsage),
    };

    const newVoucherData = {
      voucherCode,
      discountPercentage: Number(discountPercentage),
      activeUntil,
      remainingUsage: Number(remainingUsage),
    };

    if (!isNew) {
      const updatedVouchers = vouchers.slice();
      updatedVouchers[idx] = updatedVoucherData;
      setVouchers([...updatedVouchers]);
    }

    fetch('http://localhost:8080/voucher', {
      method: isNew ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${location.state?.token || ''}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(isNew ? newVoucherData : updatedVoucherData),
    }).then((response) => {
      response.json().then((json) => {
        if (isNew) {
          setVouchers([...vouchers, json]);
        }
      });
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
                  <label htmlFor="name">Code</label>
                  <input id="name" type="text" value={voucherCode} onChange={handleCodeChange} className="form-control" placeholder="Enter voucher code" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Discount percentage</label>
                  <input type="number" value={discountPercentage} onChange={handlePercentageChange} required min="0" max="100" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Active Until</label>
                  <input type="date" value={activeUntil} onChange={handleActiveUntil} required min={todayDate} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Remaining Usage</label>
                  <input type="number" value={remainingUsage} onChange={handleRemainingUsage} required min="1" className="form-control" />
                </div>
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
      <>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Voucher Code</th>
              <th>Discount Percentage</th>
              <th>Active Until</th>
            </tr>
          </thead>
          <tbody>
            {
                        vouchers.map((voucher, index) => (
                          <tr key={voucher.id}>
                            <td>{voucher.id}</td>
                            <td>{voucher.voucherCode}</td>
                            <td>{voucher.discountPercentage}</td>
                            <td>{voucher.activeUntil}</td>
                            <td>{voucher.remainingUsage}</td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={(e) => setVoucherStates(e, voucher, index)}
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
        <div className="position-absolute bottom-0 end-0">
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={resetStates}>Add New Voucher</button>
        </div>
      </>
      )}
    </>
  );
}

export default AdminUser;
