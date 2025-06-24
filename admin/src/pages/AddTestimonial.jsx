import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import { HiOutlineChatAlt2 } from 'react-icons/hi';

const AddTestimonial = ({ token }) => {
  const [form, setForm] = useState({
    name: '',
    title: '',
    feedback: '',
    gender: 'Male',
  });

  const maxFeedbackLength = 150;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/api/testimonials/add`,
        form,
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Testimonial added successfully!');
        setForm({ name: '', title: '', feedback: '', gender: 'Male' });
      } else {
        toast.error(response.data.message || 'Failed to add testimonial.');
      }
    } catch (err) {
      console.error('Error adding testimonial:', err);
      toast.error('Failed to add testimonial. Please check your token or login again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="d-flex text-primary align-items-center mb-4">
        <HiOutlineChatAlt2 className="text-primary me-2" />
        Add Testimonial
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="form-control mb-3"
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="form-control mb-3"
        />
        <textarea
          name="feedback"
          placeholder="Feedback"
          value={form.feedback}
          onChange={handleChange}
          required
          className="form-control mb-1"
          maxLength={maxFeedbackLength}
        />
        <small className="text-muted mb-3 d-block">
          {form.feedback.length} / {maxFeedbackLength} characters
        </small>
        <div className="mb-3">
          <label className="me-2">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={form.gender === 'Male'}
              onChange={handleChange}
            />{' '}
            Male
          </label>
          <label className="ms-3">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={form.gender === 'Female'}
              onChange={handleChange}
            />{' '}
            Female
          </label>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTestimonial;
