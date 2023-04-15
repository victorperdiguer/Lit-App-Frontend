import './NotificationsIcon.css';
import React from "react"
import {RiInboxFill, RiInboxLine} from 'react-icons/ri';


const NotificationIcon = ({notifications, isActive}) => {
  return (
    <div className="notification-container">
      <div className="notification-icon-container">
        {isActive ? <RiInboxFill className="navbar-icon notification-icon" /> : <RiInboxLine className="navbar-icon notification-icon" />}
      </div>
      {notifications && <div className="new-notification"></div>}
    </div>
  );
};

export default NotificationIcon;
