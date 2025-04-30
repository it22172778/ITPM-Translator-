import React from 'react';
import './Nav.css';
import Logo from './images/image.png';

function Nav() {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="NEXT GEN Logo" className="logo-img" />
        <h2 className="text">NEXT GEN</h2>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/addnote">Add Note</a></li>
          <li><a href="/notedetails">Notes</a></li>
          <li><a href="/bookmarkdetails">Bookmark</a></li>
          <li><a href="/quizintro">Quiz</a></li>
          
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
