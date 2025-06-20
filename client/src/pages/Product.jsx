import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import {
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaSuitcase,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';

const iconCircleStyle = {
  backgroundColor: '#0d6efd',
  borderRadius: '50%',
  color: 'white',
  width: '32px',
  height: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const shadowRowStyle = {
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '1.5rem',
  backgroundColor: 'white',
};

const Product = () => {
  const { productId } = useParams();
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image?.[0] || '');
    }
    window.scrollTo(0, 0);
  }, [productId, products]);

  if (!productData)
    return (
      <div className="text-center mt-5 fs-4">
        Loading...
      </div>
    );

  return (
    <div className="container mt-5 pt-5">
      <div className="row align-items-start mb-5">
        {/* Left Column */}
        <div className="col-md-3 text-center mt-3">
          <div
            className="position-relative d-inline-block"
            style={{
              boxShadow: '0 0 15px 4px rgba(13, 110, 253, 0.7)',
              borderRadius: '8px',
              maxWidth: '100%',
            }}
          >
            <img
              src={image}
              alt={`${productData.firstName} ${productData.lastName}`}
              className="img-fluid rounded"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '350px',
                objectFit: 'cover',
                display: 'block',
                borderRadius: '8px',
              }}
            />
          </div>

          <hr
            style={{
              borderTop: '2px solid #0d6efd',
              width: '80%',
              margin: '20px auto',
            }}
          />

          <h2 className="fw-bold text-capitalize">
            {productData.firstName} {productData.lastName}
          </h2>

          <p className="text-muted">{productData.educationLevel || 'N/A'}</p>
        </div>

        {/* Right Column */}
        <div className="col-md-9 mt-3">
          {/* First row - 2 rows with 2 cols each for Education + Experiences */}
          <div className='hover-card' style={shadowRowStyle}>
            <div className="row">
              {/* Education */}
              <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
                <div style={iconCircleStyle}>
                  <FaGraduationCap />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Education Level</h6>
                  <p className="mb-0">{productData.educationLevel || 'N/A'}</p>
                </div>
              </div>

              {/* Total Experience */}
              <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
                <div style={iconCircleStyle}>
                  <FaBriefcase />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Total Experience</h6>
                  <p className="mb-0">{productData.totalWorkExperience ? `${productData.totalWorkExperience} years` : 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Self Experience */}
              <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
                <div style={iconCircleStyle}>
                  <FaBriefcase />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Self Experience</h6>
                  <p className="mb-0">{productData.workExperienceSelf ? `${productData.workExperienceSelf} years` : 'N/A'}</p>
                </div>
              </div>

              {/* Govt Experience */}
              <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
                <div style={iconCircleStyle}>
                  <FaBriefcase />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Govt Experience</h6>
                  <p className="mb-0">{productData.workExperienceGovernment ? `${productData.workExperienceGovernment} years` : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Second row - Skills + Job Type */}
          <div className='hover-card bg-primary text-white' style={shadowRowStyle}>
            <div className="row">
              {/* Skills */}
              <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
                <div style={iconCircleStyle}>
                  <FaTools />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Skills</h6>
                  <p className="mb-0">{productData.additionalSkills || 'N/A'}</p>
                </div>
              </div>

              {/* Job Type */}
              <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
                <div style={iconCircleStyle}>
                  <FaSuitcase />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Job Type</h6>
                  <p className="mb-0">{productData.neededJobType || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                <FaEnvelope className="me-2 text-primary" />
                Email
              </label>
              <input
                type="text"
                readOnly
                className="form-control bg-light"
                id="email"
                value={productData.email || 'N/A'}
                style={{ display: 'block' }}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="phone" className="form-label fw-bold">
                <FaPhone className="me-2 text-primary" />
                Phone
              </label>
              <input
                type="text"
                readOnly
                className="form-control bg-light"
                id="phone"
                value={productData.phoneNumber || 'N/A'}
                style={{ display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
