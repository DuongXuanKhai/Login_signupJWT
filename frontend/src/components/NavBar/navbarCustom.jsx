import { useState } from "react";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
const NavBar = () => {
  const user = useSelector((state)=> state.auth.login.currenUser)
  return (
    <nav className="navbar-container" style={{backgroundColor:'black'}}>
      <Link to="/" className="navbar-home"> Home </Link>
      {user? (
        <>
        <p className="navbar-user">Hi, <span> {user}  </span> </p>
        <Link to="/logout" className="navbar-logout"> Log out</Link>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Register</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;