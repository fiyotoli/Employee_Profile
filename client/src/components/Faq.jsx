import React, { useState, useEffect } from 'react';
import { Accordion, Container, Row, Col, Image } from 'react-bootstrap';
import { FaQuestionCircle, FaPlus } from 'react-icons/fa';
import faqImage from '../assets/faq.jpg';
import './Faq.css';

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

const Faq = () => {
  const [activeKey, setActiveKey] = useState("0");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

 const faqItems = [
  {
    question: "How do I update my employee profile?",
    answer: "Log in to your account and go to the 'Profile' section. From there, you can edit your personal and professional details.",
    eventKey: "0",
  },
  {
    question: "Who can view my profile?",
    answer: "Your profile is visible to company administrators and HR. You can control visibility settings for specific fields in your account.",
    eventKey: "1",
  },
  {
    question: "How can I reset my password?",
    answer: "Click on 'Forgot Password' at the login page. A reset link will be sent to your registered email.",
    eventKey: "2",
  },
  {
    question: "What should I do if my profile information is incorrect?",
    answer: "Please contact the HR department or your manager to request a correction if you're unable to update it yourself.",
    eventKey: "3",
  },
];


  return (
    <Container className="mt-5 pt-5">
      <Row className="align-items-center">
        {/* Left Side - Image with AOS */}
        <Col lg={6} md={6} sm={12} className="mb-4" data-aos="fade-up">
          <Image src={faqImage} alt="FAQ" fluid rounded />
        </Col>

        {/* Right Side - Accordion with AOS */}
        <Col lg={6} md={6} sm={12} data-aos="fade-left">
          <div className="text-left my-4">
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
              Faq
            </h2>
          </div>

          <Accordion activeKey={activeKey} flush>
            {faqItems.map(({ question, answer, eventKey }) => (
              <Accordion.Item
                eventKey={eventKey}
                key={eventKey}
                style={{ border: 'none' }}
                data-aos="zoom-in-up"
              >
                <Accordion.Header onClick={() => handleToggle(eventKey)} style={{ borderBottom: '1px solid #ddd' }}>
                  <FaQuestionCircle className="me-2 text-primary" size={20} />
                  <span className="flex-grow-1 text-start">{question}</span>
                  <FaPlus className="text-primary" size={20} />
                </Accordion.Header>
                <Accordion.Body>{answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Faq;
