import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function Header(){
  const { user, logout, cart } = useApp();
  const navigate = useNavigate();

  return (
    <header className="header ">
      <div className="header-left" >
        <Link to="/"><h2>Food's Restaurent</h2></Link>
      </div>
      <div className="header-left">
        <Link to="/">Menu</Link>
        <Link to={user ? "/food" : "/login"}>Food Items</Link>
        <Link to="/summary">Cart({cart.length})</Link>
        {user ? (
          <>
            <span className="user-name">Hi, {user.fullName.split(' ')[0]}</span>
            <button className="btn small" color="warning" onClick={() => { logout(); navigate('/login'); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" >Login</Link>
            <Link to="/signup" className="btn">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
}
export default Header;
