import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaBullseye, FaHandshake } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import aboutBanner from '../assets/team.jpg';
import employee2 from '../assets/employee2.jpg';
import employee3 from '../assets/employee3.jpg';
import employee4 from '../assets/employee4.jpg';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <>
      {/* Hero Section with image left and text right */}
      <div className="about-hero-section pt-5 mt-5 mt-lg-0">
        <Container>
          <Row className="align-items-center mt-5">
            <Col md={6}>
              <img
                src={aboutBanner}
                alt="About Us"
                className="img-fluid rounded"
              />
            </Col>
            <Col md={6} className="text-md-start mt-4 mt-md-0">
              <h1 className="fw-bold display-5 text-primary-custom">About Our Company</h1>
              <p className="mt-3">
                We connect top talent with opportunities to grow and succeed through a transparent employee profile system.
              </p>
              <p>
                Our platform empowers individuals by showcasing their skills, experience, and aspirations — giving employers clear insight into what each candidate brings to the table.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Our Story - moved just below hero */}
      <section className="bg-light OurStory py-5">
        <Container>
          <h2 className="text-center mb-4 text-primary-custom">Our Story</h2>
          <p className="lead text-center mx-auto" style={{ maxWidth: '800px' }}>
            Born out of the need for clarity in talent management, our Employee Profile Platform helps organizations stay organized, build culture, and highlight the value every individual brings to the team.
            Since our inception, we've helped businesses transform their HR processes, making employee data accessible, useful, and beautifully presented.
          </p>
        </Container>
      </section>

      {/* Mission, Vision, Culture */}
<Container className="my-5">
  <Row className="text-center mb-5 g-4">
    {/* Mission Card */}
    <Col md={6} lg={4}>
      <Card className="h-100 p-4">
        <div className="mx-auto mb-3 d-flex justify-content-center align-items-center rounded-circle bg-primary-custom text-white" style={{ width: '60px', height: '60px' }}>
          <FaBullseye size={30} />
        </div>
        <h4>Our Mission</h4>
        <p>To bridge the gap between talent and opportunity through clarity, visibility, and fairness.</p>
      </Card>
    </Col>

    {/* Vision Card (Zoomed out with shadow) */}
    <Col md={6} lg={4}>
      <Card className="h-100 p-4 shadow-lg vision-card">
        <div className="mx-auto mb-3 d-flex justify-content-center align-items-center rounded-circle bg-primary-custom text-white" style={{ width: '60px', height: '60px' }}>
          <FaHandshake size={30} />
        </div>
        <h4>Our Vision</h4>
        <p>A world where every employee's skills and story are valued globally.</p>
      </Card>
    </Col>

    {/* Culture Card */}
    <Col md={6} lg={4}>
      <Card className="h-100 p-4">
        <div className="mx-auto mb-3 d-flex justify-content-center align-items-center rounded-circle bg-primary-custom text-white" style={{ width: '60px', height: '60px' }}>
          <FaUsers size={30} />
        </div>
        <h4>Our Culture</h4>
        <p>We foster innovation, collaboration, and authenticity in everything we do.</p>
      </Card>
    </Col>
  </Row>
</Container>


      {/* CTA Section */}
      <div className="cta-section d-flex align-items-center justify-content-center text-white text-center">
        <div className='Container'>
          <h2 className="mb-1">Ready to Explore Our Profiles?</h2>
          <p className='mb-2'>Get to know our dedicated team members. View employee profiles, roles, and contact information.</p>
          <Link to="/profile" className=" btn-profile btn btn-light btn-lg mt-2">
            View Employee Profiles
          </Link>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
