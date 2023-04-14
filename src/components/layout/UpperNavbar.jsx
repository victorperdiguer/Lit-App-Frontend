import React from "react";
import {RiInboxFill, RiInboxLine} from 'react-icons/ri';
import Money from "../visual/Money";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import userService from "../../services/userService";

const UpperNavbar = ({gems}) => {
  const [path, setPath] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <nav className="upper-navbar navbar">
      <div className="upper-navbar-notification-div">
        <NavLink to="/notifications">
          {path === "/notifications" ? (<RiInboxFill className="navbar-icon"/>) : (<RiInboxLine className="navbar-icon"/>)}
        </NavLink>
      </div>
      <div className="upper-navbar-title-div">
        <h1 className="navbar-icon">Lit</h1>
      </div>
        <NavLink to="/store">
          {path === "/store" ? (<Money gems={gems} isActive={true}/>) : (<Money gems={gems} isActive={false}/>)}
        </NavLink>
    </nav> 
  )
};

export default UpperNavbar;
