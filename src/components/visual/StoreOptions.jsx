import React from "react"
import {GiGems} from 'react-icons/gi';
import {FaGem} from 'react-icons/fa';
import {FaRegGem} from 'react-icons/fa';
import "../../views/store/MainStore.css";

const StoreOption = ({amount, price, size, children, onClick}) => {
  return (
      <div className={`store-${size} store-container`}>
        <h2>{children} {amount} <FaGem/></h2>
        <GiGems className={`store-gem-${size}`}/>
        <h3>{price}</h3>
        <button className="purchase-button" onClick={onClick}>BUY</button>
      </div>
  )
};

export default StoreOption;
