import React from "react"
import {FaFireAlt} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg';
import {GiLinkedRings} from 'react-icons/gi';
import { NavLink } from "react-router-dom";


const BottomNavbar = (props) => {
  return (
    <nav className="bottom-navbar navbar">
      <div className="bottom-navbar-circles-div">
        <NavLink to="/circles"><GiLinkedRings className="navbar-icon"/></NavLink>
      </div>
      <div className="bottom-navbar-questions-div">
        <NavLink to="/questions"><FaFireAlt className="navbar-icon"/></NavLink>
      </div>
      <div className="bottom-navbar-profile-div">
        <NavLink to="/profile"><CgProfile className="navbar-icon"/></NavLink>
      </div>
    </nav> 
  )
};

export default BottomNavbar;
