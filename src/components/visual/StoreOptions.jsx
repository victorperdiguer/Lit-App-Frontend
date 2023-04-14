import React from "react"
import {GiGems} from 'react-icons/gi';

const StoreOption = ({amount, price, size, children, onClick}) => {
  return (
      <div className={`store-${size}`}>
        <h3>{children}</h3>
        <GiGems className={`store-gem-${size}`}/>
        <h3>{amount} - {price}</h3>
        <button className="purchase-button" onClick={onClick}>BUY</button>
      </div>
  )
};

export default StoreOption;
