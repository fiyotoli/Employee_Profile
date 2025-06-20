import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import about from '../assets/ceo1.jpg';
const About = () => {
  return (
    <div className="container py-5 mt-5">
      {/* Title */}
      <div className="text-center mb-5">
      <div className="text-center my-4">
  <h2 className="d-inline-flex align-items-center justify-content-center">
    <span className="bg-primary me-2" style={{  borderRadius: '50px',width: '30px', height: '3px', display: 'inline-block' }}></span>
    About Us
  </h2>
</div>
        <p className="text-muted mt-3">
          Our mission is to bring convenience and variety to your fingertips, offering high-quality products from top brands. 
          We believe in making shopping a seamless and enjoyable experience. 
          With our diverse range of products, we cater to the needs of all our customers.
        </p>
        <p className="text-muted">
          Since the inception of our company, we have strived to create an ecommerce platform that is both accessible and enjoyable for everyone. 
          We aim to continuously innovate and adapt to the ever-changing world of online retail. 
          Our vision is to be the go-to destination for all your shopping needs, with customer satisfaction at the forefront.
        </p>
      </div>

      {/* Bottom Section: Founder Card + Why Choose Us */}
      <div className="row align-items-center">
        {/* Left: Founder Card */}
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card shadow border-0">
            <div className="row g-0 align-items-center">
              <div className="col-md-12">
                <img 
                src={about}
                  alt="Founder"
                  className="img-fluid d-block mx-auto"
                  style={{
                    width: '50%',       // Set width to 100% of its container
                    height: 'auto',      // Maintain the aspect ratio of the image
                    borderRadius: '8px', // Rounded corners (you can also use Bootstrap's 'rounded' class for this)
                     }}   />
                <div className="card-body">
                  <h5 className="card-title">Nardos Lemma</h5>
                  <p className="card-text text-muted">
                   Nardos Lemma started this journey with a vision to revolutionize the ecommerce industry with customer-centric solutions. 
                    Their passion for innovation and dedication to providing the best service has been the driving force behind the company's success. 
                    With years of experience in the retail industry, the founder continues to inspire the team to push boundaries.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Founder & CEO</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Why Choose Us */}
        <div className="col-md-6">
          <h4 className="mb-4">Why Choose Us</h4>
          <ul className="list-unstyled">
            <li className="mb-3 d-flex align-items-start">
              <FaCheckCircle className="text-primary me-2 mt-1" />
              <span>Curated high-quality products</span>
            </li>
            <li className="mb-3 d-flex align-items-start">
              <FaCheckCircle className="text-primary me-2 mt-1" />
              <span>Timely and secure delivery</span>
            </li>
            <li className="mb-3 d-flex align-items-start">
              <FaCheckCircle className="text-primary me-2 mt-1" />
              <span>Responsive customer care</span>
            </li>
            <li className="mb-3 d-flex align-items-start">
              <FaCheckCircle className="text-primary me-2 mt-1" />
              <span>Trusted by thousands of customers</span>
            </li>
          </ul>
        </div>
      </div> 
    </div>
  );
};

export default About;
