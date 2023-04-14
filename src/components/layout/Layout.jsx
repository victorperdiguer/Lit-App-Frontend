import './Layout.css';
import React from 'react';
import UpperNavbar from './UpperNavbar';
import BottomNavbar from './BottomNavbar';

const Layout = ({ gems, children }) => {
  return (
    <div className="layout-container">
      <UpperNavbar gems={gems}/>
      <main className="layout-content">{children}</main>
      <BottomNavbar/>
    </div>
  );
};

export default Layout;