import { Link } from 'react-router-dom';
import React from 'react';

function NavBarAdmin(props) {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-nav">
          <h3>Admin</h3>
        </div>
        <ul className="nav navbar-nav flex-row-reverse ms-auto gap-5">
          <li><Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>Log Out</Link></li>
          <li>
            <Link
              to="/profile"
              state={props}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/admin/transactions"
              state={props}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              state={props}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/vouchers"
              state={props}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Vouchers
            </Link>
          </li>
          <li>
            <Link
              to="/admin/requests"
              state={props}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Requests
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBarAdmin;
