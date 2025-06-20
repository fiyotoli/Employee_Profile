import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTelegram, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'; // Import necessary icons
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Footer.css'; // Make sure to import the CSS for hover effects
import logo from '../assets/yegna.png';

const Footer = () => {
  return (
    <footer className="bg-primary bg-opacity-10 py-4">
      <div className="container">
        <div className="row text-left">
          {/* Column 1 */}
          <div className="col-md-3 mb-3">
{/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src={logo}  alt="Logo" style={{ width: 'auto', height: '70px' }}  />
        </Link>
            
            <p className="mb-0 mt-2">Follow us on our social media channels!</p>
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
<div className="col-md-3 mb-3">
  <h5 className="mb-3">Services</h5>
  <ul className="list-unstyled" style={{ listStyleType: 'none' }}>
    <li style={{ cursor: 'text' }}>Online Shopping</li>
    <li style={{ cursor: 'text' }}>Order Support</li>
    <li style={{ cursor: 'text' }}>Payment Options</li>
    <li style={{ cursor: 'text' }}>Shipping & Delivery</li>
  </ul>
</div>



          {/* Column 3 */}
          <div className="col-md-3 mb-3">
            <h5 className="mb-3">Contact</h5> 
            <p className="mb-0"><FaMapMarkerAlt className="me-2" />Addis Ketama, Addis Ababa, Ethiopia</p>
            <p className="mb-0"><FaPhoneAlt className="me-2" /> (251) 987-654-321</p>
            <p className="mb-0 d-flex align-items-center">
              <FaEnvelope className="me-2" size={20}  />
              support@yegna.com
            </p>
          </div>

          {/* Column 4 */}
          <div className="col-md-3 mb-3">
            <h5 className="mb-3">Additional Info</h5>
            <p className="mb-0">Get in touch with us for any inquiries or support.</p>
          </div>
        </div>

        <hr className="my-4" />
        <p className="text-center mb-0 text-black">© {new Date().getFullYear()} Yegna Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
