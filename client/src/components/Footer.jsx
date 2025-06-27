import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTelegram, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-primary bg-opacity-10 py-4">
      <div className="container">
        <div className="row text-left">
          {/* Column 1 */}
          <div className="col-md-6 col-lg-4 mb-3">
            <Link className="navbar-brand" to="/">
              <h3 className='fw-bold text-primary'>Logo</h3>
            </Link>

            <p className="mb-0 mt-2">Follow us for updates and announcements!</p>
            <div className="icons mt-2">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=tasfayneshtolasa35@gmail.com" className="text-primary text-decoration-none me-2">
                <div className="icon">
                  <FaEnvelope size={20} />
                </div>
              </a>
              <a href="https://t.me/sabelatt" className="text-primary text-decoration-none me-2">
                <div className="icon">
                  <FaTelegram size={20} />
                </div>
              </a>
              <a href="https://www.linkedin.com/in/tasfaynesh-tolasa" className="text-primary text-decoration-none">
                <div className="icon">
                  <FaLinkedin size={20} />
                </div>
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-md-6 col-lg-4 mb-3">
            <h5 className="mb-3">Departments</h5>
            <ul className="list-unstyled" style={{ listStyleType: 'none' }}>
              <li style={{ cursor: 'text' }}>Human Resources</li>
              <li style={{ cursor: 'text' }}>IT & Development</li>
              <li style={{ cursor: 'text' }}>Marketing</li>
              <li style={{ cursor: 'text' }}>Operations</li>
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
          © {new Date().getFullYear()} Company Profile. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
