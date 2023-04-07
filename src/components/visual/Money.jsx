import './Money.css';
import React from "react"
import {FaGem} from 'react-icons/fa';
import {FaRegGem} from 'react-icons/fa';

const Money = (props) => {
  const {gems, isActive} = props;
  return (
    <div className="money-container">
      <div className="money-icon-container">
        {isActive ? <FaGem className="navbar-icon money-icon" /> : <FaRegGem className="navbar-icon money-icon" />}
      </div>
      <div className="money-count">{gems}</div>
    </div>
  );
};

export default Money;
