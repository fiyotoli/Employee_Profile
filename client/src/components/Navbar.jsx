import { React, useContext, useEffect } from 'react';


import { Link, NavLink } from 'react-router-dom';


function Navbar() {
 

  useEffect(() => {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navbarNav');

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
            toggle: false
          });
          bsCollapse.hide();
        }
      });
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);

  // Toggle between hamburger and close icon
  useEffect(() => {
    const toggler = document.querySelector('.navbar-toggler');
    const menuIcon = toggler.querySelector('.navbar-toggler-icon');
    const closeIcon = toggler.querySelector('.close-icon');

    const toggleIcons = () => {
      const isExpanded = toggler.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        menuIcon.classList.add('d-none');
        closeIcon.classList.remove('d-none');
      } else {
        menuIcon.classList.remove('d-none');
        closeIcon.classList.add('d-none');
      }
    };

    toggler.addEventListener('click', () => {
      setTimeout(toggleIcons, 200); // wait for Bootstrap collapse
    });

    return () => {
      toggler.removeEventListener('click', toggleIcons);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg py-3 navbar-light bg-white shadow-lg fixed-top ">
      <div className="container ">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
         <h3 className='text-primary fw-bold'>LOGO</h3>
        </Link>

        {/* Navbar Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
          <span className="close-icon d-none" style={{ fontSize: '1.5rem' }}>&times;</span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/profile"
                style={({ isActive }) => ({
                  fontWeight: isActive ? 'bold' : 'normal',
                  color: isActive ? '#0d6efd' : 'inherit',
                  transition: '0.3s'
                })}
              >
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/blog"
                style={({ isActive }) => ({
                  fontWeight: isActive ? 'bold' : 'normal',
                  color: isActive ? '#0d6efd' : 'inherit',
                  transition: '0.3s'
                })}
              >
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/about"
                style={({ isActive }) => ({
                  fontWeight: isActive ? 'bold' : 'normal',
                  color: isActive ? '#0d6efd' : 'inherit',
                  transition: '0.3s'
                })}
              >
                About
              </NavLink>
            </li>
          </ul>

          {/* Right Section */}
          <div className="d-flex align-items-center justify-content-center mt-3 mt-lg-0">
           

           
            <div className="dropdown me-3">
              
                             {/* Right Button */}
          <div className="d-flex align-items-center justify-content-center mt-3 mt-lg-0">
            <Link to="/contact">
              <button className="btn btn-primary">Contact</button>
            </Link>
          </div>
                 
            
            </div>

           
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
