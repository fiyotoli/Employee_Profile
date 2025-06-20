import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const EmployeeCard = ({ id, image, name, description }) => {
  const { currency } = useContext(ShopContext);

  const capitalizeName = (str) => {
    if (!str) return '';
    return str
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  const [education = '', experience = '', workExperienceSelf = '', workExperienceGovernment = ''] = description
    ? description.split(',').map(s => s.trim())
    : ['', ''];

  return (
    <div className="col">
      <Link to={`/product/${id}`} className="text-decoration-none">
        <div
          className="card shadow-sm border-0 p-3 h-100 text-center employee-card"
          style={{
            transition: 'background-color 0.4s ease, transform 0.3s ease',
          }}
        >
          {/* Image */}
          <img
            src={image[0]}
            alt={name}
            className="rounded-circle mx-auto profile-img"
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              border: '3px solid #0d6efd',
              transition: 'border-color 0.3s ease',
            }}
          />

          {/* Name */}
          <h5 className="fw-bold mt-3 mb-1 card-name">{capitalizeName(name)}</h5>

          {/* Education */}
          <p className="text-muted mb-0 card-education">{education}</p>

          {/* Horizontal Line */}
          <hr className="card-line mt-2 mb-0" />
 <div></div>
 
          {/* Experience Section */}
         
          <div
            className="d-inline-flex mt-2 text-nowrap justify-content-center align-items-center px-2 py-1 rounded mb-2 card-info"
            style={{ fontSize: '14px' }}
          >
            <FaCheckCircle className="me-2 text-primary card-icon" />
            <span className="card-info-text">TotalExperience: {experience}</span>
          </div>
{/* 
          <div
            className="d-inline-flex justify-content-center text-nowrap align-items-center px-2 py-1 rounded mb-2 card-info"
            style={{ fontSize: '14px' }}
          >
            <FaCheckCircle className="me-2 text-primary card-icon" />
            <span className="card-info-text text-nowrap">GovExperience: {workExperienceGovernment}</span>
          </div>

          <div
            className="d-inline-flex text-nowrap justify-content-center align-items-center px-2 py-1 rounded mb-3 card-info"
            style={{ fontSize: '14px' }}
          >
            <FaCheckCircle className="me-2 text-primary card-icon" />
            <span className="card-info-text">SelfExperience: {workExperienceSelf}</span>
          </div> */}

          {/* View Detail Button */}
          <div className="text-center w-100">
            <button
              className="btn  btn-primary view-btn px-4 employee-card"
              style={{ display: 'inline-block' }}
            >
              View Detail
            </button>
          </div>
        </div>
      </Link>

      {/* Hover Styles */}
      <style>
        {`
          .employee-card:hover {
            background-color: #0d6efd;
            transform: scale(1.02);
          }

          .employee-card:hover .card-name,
          .employee-card:hover .card-education,
          .employee-card:hover .card-info-text {
            color: #fff !important;
          }

          .employee-card:hover .card-icon {
            color: #fff !important;
          }

          .employee-card:hover .card-line {
            background-color: #fff;
          }

          .employee-card:hover .view-btn {
            background-color: #fff !important;
            color: #000 !important;
          }

          .employee-card:hover .profile-img {
            border-color: #fff !important;
          }
        `}
      </style>
    </div>
  );
};

export default EmployeeCard;
