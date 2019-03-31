import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from '../google-oauth/googleAuth';
import './header.css';

class Header extends Component {
  render() {
    return (
      <nav className="nav-container">
        <div>
          <Link to="/" className="nav-item">Streamy</Link>
        </div>
        <div>
          <Link to="/" className="nav-item">Streams</Link>
          <GoogleAuth />
        </div>
      </nav>
    );
  }
}

export default Header;