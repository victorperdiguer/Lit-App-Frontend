import './UpperNavbar.css';
import React from "react";
import {AiOutlineInbox} from 'react-icons/ai';
import Money from "../visual/Money";

const UpperNavbar = (props) => {
  return (
    <nav className="upper-navbar">
      <div className="upper-navbar-notification-div">
        <AiOutlineInbox className="navbar-icon"/>
      </div>
      <div className="upper-navbar-title-div">
        <h1 className="navbar-icon">Lit</h1>
      </div>
        <h1><Money gems={42}/></h1>
    </nav> 
  )
};

export default UpperNavbar;
