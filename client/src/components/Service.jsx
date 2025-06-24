import React, { useState, useEffect } from 'react';
import './Service.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const services = [
  {
    icon: 'bi-person-badge',
    title: 'Employee Profiles',
    description: 'View detailed profiles of all team members across departments.',
  },
  {
    icon: 'bi-search',
    title: 'Skill Search',
    description: 'Easily find employees based on their skills and expertise.',
  },
  {
    icon: 'bi-calendar-check',
    title: 'Attendance Records',
    description: 'Track employee attendance and availability efficiently.',
  },
  {
    icon: 'bi-award',
    title: 'Achievements',
    description: 'Highlight employee awards, recognitions, and milestones.',
  },
  {
    icon: 'bi-people',
    title: 'Team Structure',
    description: 'Understand the organization’s hierarchy and team roles.',
  },
  {
    icon: 'bi-envelope',
    title: 'Contact Info',
    description: 'Access direct contact information for internal communication.',
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
