import './Money.css';
import React from "react"
import {FaGem} from 'react-icons/fa';

const Money = ({ gems }) => {
  return (
    <div className="money-container">
      <div className="money-icon-container">
        <FaGem className="navbar-icon money-icon" />
      </div>
      <div className="money-count">{gems}</div>
    </div>
  );
};

export default Money;
