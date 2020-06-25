import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="list-books-title">
      <h1>MyReads</h1>
      <ul className="nav-links">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/search">
          <li>Search</li>
        </Link>
      </ul>
    </nav>
  );
}
