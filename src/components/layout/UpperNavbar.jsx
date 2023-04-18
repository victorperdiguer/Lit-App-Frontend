import React from "react";
import NotificationIcon from "../visual/NotificationsIcon";
import Money from "../visual/Money";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import userService from "../../services/userService";

const UpperNavbar = ({notifications, gems}) => {
  const [path, setPath] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <nav className="upper-navbar navbar">
      <div className="upper-navbar-notification-div">
        <NavLink to="/notifications">
          {path === "/notifications" ? (<NotificationIcon isActive={true} notifications={notifications} />) : (<NotificationIcon isActive={false} notifications={notifications} />)}
        </NavLink>
      </div>
      <div className="upper-navbar-title-div">
        <a href="/"><h1 className="navbar-icon lit-title" >LIT</h1></a>
      </div>
        <NavLink to="/store">
          {path === "/store" ? (<Money gems={gems} isActive={true}/>) : (<Money gems={gems} isActive={false}/>)}
        </NavLink>
    </nav> 
  )
};

export default UpperNavbar;
