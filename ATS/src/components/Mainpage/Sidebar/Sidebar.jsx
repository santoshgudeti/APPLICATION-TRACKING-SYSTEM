import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ onComponentChange }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="sidebar">
      {/* MENU button */}
      <button onClick={toggleSidebar} className="menu-button">
        MENU
      </button>

      {/* Sidebar content, visible only when isSidebarOpen is true */}
      {isSidebarOpen && (
        <ul className="sidebar-content">
          <li onClick={() => onComponentChange('candidateFiltering')}>Candidate Filtering</li>
          {/* Add more items as needed */}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
