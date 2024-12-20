import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <Link to="/">
            <i className="fa-solid fa-home"></i>
            <label>Home</label>
          </Link>
        </li>
        <li>
          <Link to="/analytics">
            <i className="fa-solid fa-chart-simple"></i>
            <label>Analytics</label>
          </Link>
        </li>
      </ul>
      
    </nav>
  );
}

export default NavBar;
