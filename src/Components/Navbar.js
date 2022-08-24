import { Link } from 'react-router-dom';
import React from 'react';

function NavBar(props) {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-nav">
          <h3>Joplin</h3>
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
              to="/contract"
              state={props}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Contract
            </Link>
          </li>
          <li>
            <Link
              to="/transaction"
              state={props}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Transaction
            </Link>
          </li>
          <li>
            <Link
              to="/debt"
              state={props}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Debt
            </Link>
          </li>
          <li>
            <Link
              to="/lending"
              state={props}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Lending
            </Link>
          </li>
          <li>
            <Link
              to="/open_loan"
              state={props}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Open Requests
            </Link>
          </li>
          <li>
            <Link
              to="/my_loan"
              state={props}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              My Requests
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
