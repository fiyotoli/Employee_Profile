import React, { useState, useEffect } from 'react';
import logo from '../assets/yegna.png';
import { Link, NavLink } from 'react-router-dom';
import { MdAddCircleOutline, MdListAlt, MdClose } from 'react-icons/md';

function Navbar({ setToken }) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar is expanded by default on large screens
  const [isSmallOrMedium, setIsSmallOrMedium] = useState(window.innerWidth < 992); // Check if it's small or medium screen

  // Handle screen resize
  useEffect(() => {
    const onResize = () => {
      const isSmall = window.innerWidth < 992;
      setIsSmallOrMedium(isSmall);
      if (!isSmall) {
        setSidebarOpen(true); // Sidebar is expanded by default on large screens
      } else {
        setSidebarOpen(false); // Sidebar is collapsed by default on small/medium screens
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Toggle sidebar when logo is clicked (on small/medium screens)
  const handleLogoClick = (e) => {
    e.preventDefault(); // Prevent redirect to home when sidebar is toggled
    setSidebarOpen((prevState) => !prevState); // Toggle the sidebar open/close
  };

  // Close sidebar when clicking on the close icon
  const closeSidebar = () => {
    setSidebarOpen(false); // Close the sidebar
  };

  return (
    <>
      {/* Navbar */}
      <div className="bg-white d-flex align-items-center justify-content-between py-3  px-5 fixed-top shadow-sm">
        <Link className="navbar-brand" to="/" onClick={handleLogoClick}>

          <h3 className='fw-bold text-primary'>Logo</h3>
        </Link>

        {/* Logout Button */}
        <button onClick={() => setToken('')} className="btn btn-danger">
          Logout
        </button>
      </div>

      {/* Sidebar */}
      <div
        className="position-fixed top-0 start-0 bg-primary vh-100 shadow p-3"
        style={{
          width: '250px',
          zIndex: 1050,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)', // Slide the sidebar in/out
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {/* Logo and Close icon container (vertically aligned) */}
        <div className="d-flex  align-items-center border-bottom border-1 border-white">
          {/* Logo on top left of the sidebar */}
          <div className="mb-4">
            
          <h6 onClick={handleLogoClick} className='lead fw-bold text-white'>Employee profile Dashboard</h6>
            
          </div>

          {/* Close icon on top right of the sidebar */}
          {sidebarOpen && (
            <div className="d-flex justify-content-end  w-100">
              <MdClose
                size={26}
                onClick={closeSidebar}
                style={{ cursor: 'pointer' ,color:'white'}}
              />
            </div>
          )}
        </div>

        {/* Sidebar Links */}
        <div className="d-flex flex-column mt-4 pt-3">
          <NavLink
            to="/"
            className="sidebar-link text-decoration-none text-white mb-4 d-flex align-items-center"
            style={{ fontWeight: 500 }}
            onClick={closeSidebar}
          >
            <MdAddCircleOutline className="me-2" size={20} />
            <p className="m-0 ">Add Employee</p>
          </NavLink>

          <NavLink
            to="/list"
            className="sidebar-link text-decoration-none text-white mb-4 d-flex align-items-center"
            style={{ fontWeight: 500 }}
            onClick={closeSidebar}
          >
            <MdListAlt className="me-2" size={20} />
            <p className="m-0">List Employee</p>
          </NavLink>

          
        </div>
      </div>

      {/* Content Area */}
      <div
        className={`container-fluid pt-5 px-4 ms-0 ${sidebarOpen ? 'ms-250' : ''}`} // Shift content if sidebar is open
      >
        {/* Your main content here */}
      </div>
    </>
  );
}

export default Navbar;
