import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div id="hero-container" className="container-fluid bg-white mt-5 pt-5">
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center" data-aos="fade-up">
          <h1 className="display-3">
            Welcome to{' '}
            <span className="text-primary fw-bold">Employee Profile System</span>
          </h1>
          <p className="lead mt-3">
            Organize and manage employee profiles with ease. Track experience, education,
            and job preferences all in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
