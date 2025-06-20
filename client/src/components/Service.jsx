import React, { useState, useEffect } from 'react';
import './Service.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const services = [
  {
    icon: 'bi-cart-fill',
    title: 'Online Store',
    description: 'Browse and shop products with ease from our online platform.',
  },
  {
    icon: 'bi-truck',
    title: 'Fast Delivery',
    description: 'We ensure fast and secure delivery to your doorstep.',
  },
  {
    icon: 'bi-shield-lock',
    title: 'Secure Payment',
    description: 'Make transactions with confidence using our secure system.',
  },
  {
    icon: 'bi-tags-fill',
    title: 'Great Deals',
    description: 'Discover exciting deals and discounts every day.',
  },
  {
    icon: 'bi-headset',
    title: '24/7 Support',
    description: 'We’re always available to assist with your needs.',
  },
  {
    icon: 'bi-box-seam',
    title: 'Easy Returns',
    description: 'Return or exchange products with our simple process.',
  },
];

const Service = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div id="services-container">
      <div className="container ">
        <div className="text-center my-4" data-aos="fade-down">
          <h2 className="d-inline-flex align-items-center justify-content-center">
            <span
              className="bg-primary me-2"
              style={{
                borderRadius: '50px',
                width: '30px',
                height: '3px',
                display: 'inline-block',
              }}
            ></span>
            Our Service
          </h2>
        </div>

        <div className="row mt-3">
          {services.map((service, index) => {
            const isHovered =
              hoveredIndex === index || (index === 1 && hoveredIndex === null);
            return (
              <div
                key={index}
                className="col-md-6 col-lg-4 mb-4 d-flex"
                data-aos="zoom-out"
                data-aos-delay={index * 100}
              >
                <div
                  className={`card service-card w-100 ${
                    isHovered ? 'hovered-card' : ''
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="card-body text-center">
                    <i
                      className={`bi ${service.icon} ${
                        isHovered ? 'text-white' : 'text-primary'
                      }`}
                      style={{ fontSize: isHovered ? '50px' : '30px' }}
                    ></i>
                    <h5 className="card-title mt-3">{service.title}</h5>
                    <div
                      className={`border-bottom mb-2 ${
                        isHovered ? 'border-white' : ''
                      }`}
                    ></div>
                    <p className="card-text">{service.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Service;
