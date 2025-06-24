import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  MdAddCircleOutline,
  MdFormatListBulleted,
  MdClose,
  MdCreate,
  MdRateReview,
  MdLibraryBooks,
  MdListAlt,
  MdFeedback,
} from 'react-icons/md';

function Navbar({ setToken }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSmallOrMedium, setIsSmallOrMedium] = useState(window.innerWidth < 992);
  const location = useLocation();

  // Track selected path locally to manage active styles immediately on click
  const [selectedPath, setSelectedPath] = useState(location.pathname);

  useEffect(() => {
    // Sync local selectedPath when URL changes (e.g. via back/forward navigation)
    setSelectedPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const onResize = () => {
      const isSmall = window.innerWidth < 992;
      setIsSmallOrMedium(isSmall);
      setSidebarOpen(!isSmall);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => setSidebarOpen(false);

  // Custom function to determine if this navlink is active by comparing its 'to' with selectedPath state
  const navLinkClass = (to) => {
    const isActive = selectedPath === to;
    return `sidebar-link text-decoration-none d-flex align-items-center gap-2 mb-3 small fw-semibold ${
      isActive ? 'active-link' : 'text-black'
    }`;
  };

  // On NavLink click handler - update selectedPath only (DO NOT close sidebar automatically)
  const onNavLinkClick = (to) => {
    setSelectedPath(to); // immediately set active style locally
    // sidebar stays open — no closeSidebar() here
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="bg-white d-flex align-items-center justify-content-between py-3 px-5 fixed-top shadow-sm">
        <Link className="navbar-brand" to="/" onClick={handleLogoClick}>
          <h3 className="fw-bold text-primary">Logo</h3>
        </Link>
        <button onClick={() => setToken('')} className="btn btn-danger">
          Logout
        </button>
      </div>

      {/* Sidebar */}
      <div
        className="position-fixed top-0 start-0 bg-light vh-100 shadow-lg p-3"
        style={{
          width: '250px',
          zIndex: 1050,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {/* Header: logo and close icon in one row */}
        <div className="d-flex align-items-center justify-content-between mb-0">
          <Link to="/" className="text-decoration-none" onClick={() => onNavLinkClick('/')}>
            <h4 className="fw-bold text-primary mb-0">LOGO</h4>
          </Link>
          <MdClose
            size={20}
            onClick={closeSidebar}
            style={{ cursor: 'pointer', color: 'black' }}
          />
        </div>

        {/* Dashboard label below header */}
        <p className="text-muted small mb-3 text-start">Employee Dashboard</p>
        <hr className="border border-black opacity-100 my-3" />

        {/* Sidebar Links */}
        <div className="d-flex flex-column">
          {/* Section 1 */}
          <div className="pb-3 border-bottom border-black">
            <NavLink
              to="/add"
              className={() => navLinkClass('/add')}
              onClick={() => onNavLinkClick('/add')}
            >
              <MdAddCircleOutline className="sidebar-icon" size={18} />
              <span>Add Employee</span>
            </NavLink>
            <NavLink
              to="/list"
              className={() => navLinkClass('/list')}
              onClick={() => onNavLinkClick('/list')}
            >
              <MdFormatListBulleted className="sidebar-icon" size={18} />
              <span>List Employee</span>
            </NavLink>
          </div>

          {/* Section 2 */}
          <div className="py-3 border-bottom border-black">
            <NavLink
              to="/add_testimonial"
              className={() => navLinkClass('/add_testimonial')}
              onClick={() => onNavLinkClick('/add_testimonial')}
            >
              <MdCreate className="sidebar-icon" size={18} />
              <span>Add Testimonial</span>
            </NavLink>
            <NavLink
              to="/list_testimonial"
              className={() => navLinkClass('/list_testimonial')}
              onClick={() => onNavLinkClick('/list_testimonial')}
            >
              <MdRateReview className="sidebar-icon" size={18} />
              <span>List Testimonial</span>
            </NavLink>
          </div>

          {/* Section 3 */}
          <div className="py-3">
            <NavLink
              to="/add_blog"
              className={() => navLinkClass('/add_blog')}
              onClick={() => onNavLinkClick('/add_blog')}
            >
              <MdLibraryBooks className="sidebar-icon" size={18} />
              <span>Add Blog</span>
            </NavLink>
            <NavLink
              to="/blog_list"
              className={() => navLinkClass('/blog_list')}
              onClick={() => onNavLinkClick('/blog_list')}
            >
              <MdListAlt className="sidebar-icon" size={18} />
              <span>List Blog</span>
            </NavLink>
            <NavLink
              to="/feedback_list"
              className={() => navLinkClass('/feedback_list')}
              onClick={() => onNavLinkClick('/feedback_list')}
            >
              <MdFeedback className="sidebar-icon" size={18} />
              <span>User Feedback</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Page Content Offset */}
      <div className={`container-fluid pt-5 px-4 ms-0 ${sidebarOpen ? 'ms-250' : ''}`}></div>

      {/* Styles */}
      <style>{`
        .sidebar-link {
          padding: 4px 8px;
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .sidebar-icon {
          color: #0d6efd;
          transition: color 0.3s ease;
        }

        .sidebar-link:hover {
          background-color: #0d6efd !important;
          color: white !important;
        }

        .sidebar-link:hover .sidebar-icon {
          color: white !important;
        }

        .active-link {
          background-color: #0d6efd !important;
          color: white !important;
        }

        .active-link .sidebar-icon {
          color: white !important;
        }
      `}</style>
    </>
  );
}

export default Navbar;
