import React, { useState, useEffect } from 'react';
import { Accordion, Container, Row, Col, Image } from 'react-bootstrap';
import { FaQuestionCircle, FaPlus } from 'react-icons/fa';
import faqImage from '../assets/faq1.jpg';
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
    question: "How can I view employee profiles?",
    answer: "Navigate to the 'Profiles' section from the main menu. You can browse or search by job title, skill, or department.",
    eventKey: "0",
  },
  {
    question: "Can I filter employee profiles by department or skills?",
    answer: "Yes, the platform allows you to filter profiles by department, skills, region, and other criteria for easier exploration.",
    eventKey: "1",
  },
  {
    question: "Is the information in the employee profiles verified?",
    answer: "Yes, all profile data is either submitted by the employee and approved by HR or directly managed by the HR department.",
    eventKey: "2",
  },
  {
    question: "Can I download or print an employee's profile?",
    answer: "Currently, the platform supports viewing profiles online. For official use, please contact the HR department for downloadable versions.",
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
                className="bg-primary-custom me-2"
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
                  <FaQuestionCircle className="me-2 text-primary-custom" size={20} />
                  <span className="flex-grow-1 text-start">{question}</span>
                  <FaPlus className="text-primary-custom" size={20} />
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
