import React, { useRef, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FaQuoteLeft } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const testimonials = [
  {
    quote: "This company helped me find my needs in fashion clothing!",
    name: "Abebe Kebede",
    avatar: "https://cdn-icons-png.freepik.com/512/6714/6714042.png",
  },
  {
    quote: "Amazing service and very professional staff.",
    name: "Mekdes Fikre",
    avatar: "https://cdn-icons-png.freepik.com/256/8583/8583504.png?uid=R157617096&ga=GA1.1.1359343644.1738236308&semt=ais_hybrid",
  },
  {
    quote: "Highly recommend to anyone looking to buy fashion cloth!",
    name: "Bekele Alemu",
    avatar: "https://cdn-icons-png.freepik.com/512/6714/6714042.png",
  },
  {
    quote: "Best experience I’ve had with a fashion online store.",
    name: "Selamawit Getachew",
    avatar: "https://cdn-icons-png.freepik.com/256/8583/8583504.png?uid=R157617096&ga=GA1.1.1359343644.1738236308&semt=ais_hybrid",
  },
  {
    quote: "They really listen to your needs and deliver great results.",
    name: "Haileyesus Desta",
    avatar: "https://cdn-icons-png.freepik.com/512/6714/6714042.png",
  },
];

const TestimonialCarousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="container my-5">
      <div className="text-center my-4" data-aos="fade-left">
        <h2 className="d-inline-flex align-items-center justify-content-center">
          <span className="bg-primary me-2" style={{ borderRadius: '50px', width: '30px', height: '3px', display: 'inline-block' }}></span>
          Testimonial
        </h2>
      </div>

      <Carousel
        ref={carouselRef}
        indicators={false}
        controls={false}
        interval={5000}
      >
        {testimonials.map((testimonial, index) => (
          <Carousel.Item key={index}>
            <div className="row" data-aos="fade-up">
              {testimonials.slice(index, index + 3).map((testimonialItem, i) => (
                <div className="col-lg-4 col-md-6 mb-4" key={i}>
                  <div className="card h-100 shadow-sm" data-aos="zoom-in" data-aos-delay={`${i * 100}`}>
                    <div className="card-body text-center">
                      <FaQuoteLeft className="text-primary display-5 mb-3" />
                      <p className="card-text mb-3">{testimonialItem.quote}</p>
                      <hr className="border-primary" />
                      <img
                        src={testimonialItem.avatar}
                        alt={testimonialItem.name}
                        className="rounded-circle mb-3"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                      <h5 className="card-title">{testimonialItem.name}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Custom Carousel Controls */}
      <div className="d-flex justify-content-center mt-4" data-aos="fade-up">
        <button
          className="btn btn-primary rounded align-items-center justify-content-center shadow me-2"
          style={{ width: '50px', height: '50px' }}
          onClick={() => carouselRef.current.prev()}
        >
          <i className="bi bi-box-arrow-left text-white" />
        </button>
        <button
          className="btn btn-primary rounded align-items-center justify-content-center shadow"
          style={{ width: '50px', height: '50px' }}
          onClick={() => carouselRef.current.next()}
        >
          <i className="bi bi-box-arrow-right text-white" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
