import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import hero from '../assets/hero.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div id="hero-container" className="container-fluid bg-white mt-5 pt-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Section: Text */}
          <div
            className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0 mt-5 mt-md-5 mt-lg-0"
            data-aos="fade-up"
          >
            <h1 className="display-3 fw-bold ">
              <span className="text-dark ">Welcome to the </span>
              <span className="text-primary ">
                <Typewriter
                  words={['Employee Portal']}
                  loop={false}
                  cursor
                  cursorStyle="."
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h1>

            <p className="lead mt-3">
              Get to know our dedicated team members. View employee profiles, roles, and contact information.
            </p>
            <Link to="/profile" className="btn btn-lg btn-primary mt-2">
              View Profiles
            </Link>
          </div>

          {/* Right Section: Image */}
          <div className="col-12 col-md-6 text-center" data-aos="fade-left">
            <img
              src={hero}
              alt="Employee Portal Advert"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
