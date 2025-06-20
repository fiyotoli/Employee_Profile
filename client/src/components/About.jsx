import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBullseye, FaLightbulb, FaHandshake } from 'react-icons/fa';
import about from '../assets/about.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="container-fluid px-3 pt-5 pb-1 ">
      <div className="row align-items-center">
        {/* Image Section */}
        <div className="col-md-6 order-sm-1 order-2" data-aos="zoom-in">
          <img 
            src={about}
            alt="About Illustration" 
            className="img-fluid"
          />
        </div>

        {/* Text Section */}
        <div className="col-md-6 order-sm-2 order-1" data-aos="fade-left">
          <h2 className="mb-4">Who We Are</h2>

          {/* Mission */}
          <div className="mb-4">
            <h5 className="d-flex align-items-center">
              <FaBullseye className="me-2 text-primary" /> Our Mission
            </h5>
            <p className="text-muted mb-0">
              To provide exceptional e-commerce experiences by offering top-quality products, reliable service, and customer satisfaction.
            </p>
          </div>

          {/* Vision */}
          <div className="mb-4">
            <h5 className="d-flex align-items-center">
              <FaLightbulb className="me-2 text-primary" /> Our Vision
            </h5>
            <p className="text-muted mb-0">
              To become a leading online store known for innovation, trust, and excellence in service.
            </p>
          </div>

          {/* Values */}
          <div className="mb-4">
            <h5 className="d-flex align-items-center">
              <FaHandshake className="me-2 text-primary" /> Our Values
            </h5>
            <p className="text-muted mb-0">
              We value integrity, innovation, and building long-lasting relationships with our customers and partners.
            </p>
          </div>

          {/* CTA Button */}
          <Link to="/collection" className="btn btn-primary mt-3">
            Explore Our Collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
