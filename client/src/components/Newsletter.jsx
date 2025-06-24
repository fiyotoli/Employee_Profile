import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('loading');

    const templateParams = {
      user_email: email,
    };

    emailjs.send(
      'service_xq904j8',     // Your Service ID
      'template_kzpvw47',    // Your Template ID
      templateParams,
      'qwd253r0hHhtgB8s_'    // Your Public Key
    )
    .then(() => {
      setStatus('success');
      setEmail('');
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      setStatus('error');
    });
  };

  return (
    <section className="mt-3">
      <div className="container shadow py-3 mb-5 min-h-100">
        <div className="row jd-flex justify-content-center align-items-center">
          <div
            className="col-md-9 col-lg-8 text-center"
            data-aos="zoom-out"
          >
            <div className="subscription-box mb-4 text-white p-4 rounded">
              <h4 className="mb-3 fw-bold text-dark">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-muted mb-3">
                Stay updated with the latest news and exclusive offers from us.
              </p>

              <form
                className="d-flex col-md-9 col-lg-8 container text-center"
                onSubmit={sendEmail}
              >
                <div className="input-group justify-content-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control input"
                    placeholder="Enter your email"
                    required
                  />
                  <button type="submit" className="btn btn-primary text-white">
                    {status === 'loading' ? 'Sending...' : 'Subscribe'}
                  </button>
                </div>
              </form>

              {/* Feedback Message */}
              {status === 'success' && (
                <p className="text-success mt-3">
                  ✅ Thanks for subscribing!
                </p>
              )}
              {status === 'error' && (
                <p className="text-danger mt-3">
                  ❌ Failed to send email. Please try again.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
