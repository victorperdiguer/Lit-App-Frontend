import React from "react";
import {RiInboxFill, RiInboxLine} from 'react-icons/ri';
import Money from "../visual/Money";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const UpperNavbar = (props) => {
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
          {path === "/store" ? (<Money gems={42} isActive={true}/>) : (<Money gems={42} isActive={false}/>)}
        </NavLink>
    </nav> 
  )
};

export default UpperNavbar;
