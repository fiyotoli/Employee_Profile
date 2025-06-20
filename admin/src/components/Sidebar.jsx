import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MdAddCircleOutline, MdListAlt, MdMenu, MdClose } from 'react-icons/md';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(false); // Hide toggle if not mobile
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false);

  return (
    <>
      {/* Menu Icon: Only visible on small screens */}
      {isMobile && !showSidebar && (
        <div
          className="position-fixed top-0 start-0 p-3 bg-light shadow"
          style={{ zIndex: 1060 }}
        >
          <MdMenu size={30} onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-light vh-100 p-3  position-fixed top-0 ${
          isMobile ? (showSidebar ? 'start-0' : 'd-none') : 'start-0'
        }`}
        style={{ width: '250px', zIndex: 1050 }}
      >
        {/* Close icon on small screens */}
        {isMobile && (
          <div className="d-flex text-white justify-content-end">
            <MdClose size={26} onClick={closeSidebar} style={{ cursor: 'pointer' }} />
          </div>
        )}

        <div className="d-flex flex-column mt-4 pt-3">
          <NavLink
            to="/"
            className="sidebar-link text-decoration-none text-dark mb-4 d-flex align-items-center"
            style={{ fontWeight: 500 }}
            onClick={closeSidebar}
          >
            
            <MdAddCircleOutline className="me-2" size={20} />
            <p className="m-0">Add Items</p>
          </NavLink>

          <NavLink
            to="/list"
            className="sidebar-link text-decoration-none text-dark mb-4 d-flex align-items-center"
            style={{ fontWeight: 500 }}
            onClick={closeSidebar}
          >
            <MdListAlt className="me-2" size={20} />
            <p className="m-0">List Items</p>
          </NavLink>

          <NavLink
            to="/orders"
            className="sidebar-link text-decoration-none text-dark mb-4 d-flex align-items-center"
            style={{ fontWeight: 500 }}
            onClick={closeSidebar}
          >
            <MdListAlt className="me-2" size={20} />
            <p className="m-0">Orders</p>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
