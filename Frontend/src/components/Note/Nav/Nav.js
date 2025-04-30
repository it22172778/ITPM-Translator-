import React from 'react';
import './Nav.css';
import Logo from "./images/logo.jpeg";

function Nav() {
  return (
    <div>
      <div className="nav_con_user">
        <div className="left_section">
          <img src={Logo} alt="logo_nav" className="nav_logo_user" />
          <h1 className="app_topic">NEXT GEN</h1>
        </div>
        <div className="nav_item_user">
          <h3 className="navitem" onClick={() => (window.location.href = "/")}>Home</h3>
          <h3 className="navitem" onClick={() => (window.location.href = "/addnote")}>Add note</h3>
          <h3 className="navitem" onClick={() => (window.location.href = "/notedetails")}>Note details</h3>
          <button className="nav_btn_log" onClick={() => (window.location.href = "/login")}>Login</button>
          <button className="nav_btn_regi" onClick={() => (window.location.href = "/userregister")}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
