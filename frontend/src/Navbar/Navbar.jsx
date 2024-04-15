import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/Msgboard">Msgboard</Link></li>
            <li><Link to="/user">User</Link></li>
            <li><Link to="/createuser">Sign Up</Link></li>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/logout">Log Out</Link></li>
        </ul>
    </nav>
  );
};

export default Navbar;