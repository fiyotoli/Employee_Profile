import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTelegram, FaEnvelope, FaLinkedin,FaFacebook, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-primary-custom-opacity bg-opacity-10 py-4">
      <div className="container">
        <div className="row text-left">
          {/* Column 1 */}
          <div className="col-md-6 col-lg-4 mb-3">
            <Link className="navbar-brand" to="/">
                        {/* Replace text logo with image */}
                        <img src={logo} alt="Tesfa PRTC Logo" style={{ height: '60px' }} />
            </Link>

            <p className="mb-0 mt-2">Follow us for updates and announcements!</p>
           <div className="icons mt-2">
  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=tesfatraining2016@gmail.com" className="text-primary-custom text-decoration-none me-2">
    <div className="icon">
      <FaEnvelope size={20} />
    </div>
  </a>
  <a href="https://t.me/tesfapreretirement" className="text-primary-custom text-decoration-none me-2">
    <div className="icon">
      <FaTelegram size={20} />
    </div>
  </a>
  <a href="https://www.linkedin.com/company/tesfa-pre-retirement-capacity-building-center/" className="text-primary-custom text-decoration-none me-2">
    <div className="icon">
      <FaLinkedin size={20} />
    </div>
  </a>
  <a
    href="https://www.facebook.com/people/Tesfa-Pre-Retirement-Capacity-Building-Center/61567011331033/"
    className="text-primary-custom text-decoration-none"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="icon">
      <FaFacebook size={20} />
    </div>
  </a>
</div>

          </div>

          {/* Column 2 */}
<div className="col-md-6 col-lg-4 mb-3">
  <h5 className="mb-3">Explore Profiles By</h5>
  <ul className="list-unstyled" style={{ listStyleType: 'none' }}>
    <li style={{ cursor: 'text' }}>Job Title</li>
    <li style={{ cursor: 'text' }}>Skills</li>
    <li style={{ cursor: 'text' }}>Region</li>
    <li style={{ cursor: 'text' }}>Experience Level</li>
  </ul>
</div>


          {/* Column 3 */}
          <div className="col-md-6 col-lg-4 mb-3">
            <h5 className="mb-3">Contact</h5> 
            <p className="mb-0"><FaMapMarkerAlt className="me-2" /> 4 Kilo, Addis Ababa, Ethiopia</p>
            <p className="mb-0"><FaPhoneAlt className="me-2" /> 0911440456</p>
            <p className="mb-0 d-flex align-items-center text-wrap">
              <FaEnvelope className="me-2 " size={20} />
               tesfatraining2016@gmail.com
           
            </p>
          </div>

         
        </div>

        <hr className="my-4" />
        <p className="text-center mb-0 text-black">
          © {new Date().getFullYear()} tesfa pre-retirement training center. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
