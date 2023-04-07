import './Layout.css';
import React from 'react';
import UpperNavbar from './UpperNavbar';
import BottomNavbar from './BottomNavbar';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <UpperNavbar/>
      <main className="layout-content">{children}</main>
      <BottomNavbar/>
    </div>
  );
};

export default Layout;