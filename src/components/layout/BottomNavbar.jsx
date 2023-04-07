import React from "react"
import {AiFillFire, AiOutlineFire} from 'react-icons/ai'
import {FaUser, FaRegUser} from 'react-icons/fa';
import {TbCirclesFilled, TbCircles} from 'react-icons/tb';
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";


const BottomNavbar = (props) => {
  const [path, setPath] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
    console.log(location);
  }, [location]);

  return (
    <nav className="bottom-navbar navbar">
      <div className="bottom-navbar-circles-div">
        <NavLink to="/circles">
          {path === "/circles" ? (<TbCirclesFilled className="navbar-icon"/>) : (<TbCircles className="navbar-icon"/>)}
        </NavLink>
      </div>
      <div className="bottom-navbar-questions-div">
        <NavLink to="/questions">
          {path === "/questions" ? (<AiFillFire className="navbar-icon navbar-fire-icon"/>) : (<AiOutlineFire className="navbar-icon navbar-fire-icon"/>)}
        </NavLink>
      </div>
      <div className="bottom-navbar-profile-div">
        <NavLink to="/profile">
        {path === "/profile" ? (<FaUser className="navbar-icon"/>) : (<FaRegUser className="navbar-icon"/>)}
        </NavLink>
      </div>
    </nav> 
  )
};

export default BottomNavbar;
