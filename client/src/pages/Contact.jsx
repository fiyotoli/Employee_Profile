import React from 'react';
import { Form, Input, Button, Row, Col, Typography, message as antdMessage } from 'antd';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import '../components/Contact.css';

const { Title, Text } = Typography;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await axios.post(`${backendUrl}/api/feedback/add`, values);
      if (res.data.success) {
        antdMessage.success(res.data.message);
        form.resetFields();
      } else {
        antdMessage.error(res.data.message || "Failed to send message");
      }
    } catch (error) {
      antdMessage.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="container my-5 pt-5">
      {/* Section Header */}
      <div className="text-center my-4">
        <h2 className="d-inline-flex align-items-center justify-content-center">
          <span
            className="bg-primary me-2"
            style={{ borderRadius: '50px', width: '30px', height: '3px', display: 'inline-block' }}
          ></span>
          Contact HR & Support
        </h2>
      </div>

      <Text
        className="mb-2 text-muted"
        style={{ fontSize: '18px', lineHeight: '1.7', textAlign: 'center', display: 'block' }}
      >
      If you need assistance with your employee profile, submitting new data, or general inquiries, we’re here to help.
Our HR and technical teams are ready to support you.
You can reach out to us through the contact form, phone, or email, and we’ll get back to you as soon as possible.   </Text>

      <Row gutter={[32, 32]} className="pt-5">
        {/* Left: Contact Form */}
        <Col xs={24} md={12}>
          <div className="p-5 bg-primary bg-opacity-10" style={{ borderRadius: '8px' }}>
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email address' },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <Input.TextArea rows={4} placeholder="Write your message or inquiry here" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: '#0d6efd', borderColor: '#0d6efd' }}
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>

        {/* Right: Contact Info */}
        <Col xs={24} md={12} className="d-flex flex-column justify-content-center">
          <Title level={2} style={{ color: '#0d6efd' }}>HR & Support Contact</Title>
          <Text className="mb-4 text-muted" style={{ fontSize: '16px', lineHeight: '1.7' }}>
            If you need assistance with your employee profile, submitting new data, or general inquiries, we’re here to help.
            Our HR and technical teams are ready to support you.
          </Text>
          <Text className="mb-4 text-muted" style={{ fontSize: '16px', lineHeight: '1.7' }}>
            Feel free to contact us via the form or use the details below to reach out directly.
          </Text>

          <ul style={{ padding: 0, listStyle: 'none', fontSize: '16px' }}>
            <li className="mb-3">
              <FaEnvelope className="text-primary me-2" />
              <span>tesfatraining2016@gmail.com</span>
            </li>
            <li className="mb-3">
              <FaPhone className="text-primary me-2" />
              <span>0911440456</span>
            </li>
            <li className="mb-3">
              <FaMapMarkerAlt className="text-primary me-2" />
              <span>Addis Ketema, Addis Ababa, Ethiopia</span>
            </li>
          </ul>
        </Col>
      </Row>

      {/* Google Map */}
      <div className="mt-5 text-center">
        <h3 className="mb-3">Visit Our Office</h3>
        <p className="text-muted mb-4" style={{ fontSize: '16px' }}>
          You can find us at the HR department office in Addis Ketema, Addis Ababa.
        </p>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.3154022262454!2d38.74273951460182!3d9.01079369351781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b853bf29c9c69%3A0xb5b4b13dfeb52d94!2sAddis%20Ketema%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1689938467081!5m2!1sen!2set"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
