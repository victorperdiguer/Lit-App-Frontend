import React from "react";
import {RiInboxFill} from 'react-icons/ri';
import Money from "../visual/Money";
import { NavLink } from "react-router-dom";

const UpperNavbar = (props) => {
  return (
    <nav className="upper-navbar navbar">
      <div className="upper-navbar-notification-div">
        <NavLink to="/notifications"><RiInboxFill className="navbar-icon"/></NavLink>
      </div>
      <div className="upper-navbar-title-div">
        <h1 className="navbar-icon">Lit</h1>
      </div>
        <NavLink to="/store"><Money gems={42}/></NavLink>
    </nav> 
  )
};

export default UpperNavbar;
