import React from "react"
import {IoFlameSharp} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg';
import {GiLinkedRings} from 'react-icons/gi';


const BottomNavbar = (props) => {
  return (
    <nav className="bottom-navbar">
      <div className="bottom-navbar-circles-div">
        <h1><GiLinkedRings/></h1>
      </div>
      <div className="bottom-navbar-questions-div">
        <h1><IoFlameSharp/></h1>
      </div>
      <div className="bottom-navbar-profile-div">
        <h3><CgProfile/></h3>
      </div>
    </nav> 
  )
};

export default BottomNavbar;
