import React, { useEffect, useState } from 'react';
import axios from 'axios';


import {
  MdArticle,
  MdPeople,
  MdFeedback,
  MdRateReview,
  MdDashboard,
} from 'react-icons/md';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    blog: 0,
    employee: 0,
    feedback: 0,
    testimonial: 0,
    latestEmployees: [],
  });

  const [activeCardIndex, setActiveCardIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Debug: Log the API base URL to verify env variable is loaded
  console.log('API_BASE_URL:', API_BASE_URL);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [blogRes, empRes, feedRes, testiRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/blog/stats`),
        axios.get(`${API_BASE_URL}/api/profile/stats`),
        axios.get(`${API_BASE_URL}/api/feedback/stats`),
        axios.get(`${API_BASE_URL}/api/testimonials/stats`),
      ]);

      setStats({
        blog: blogRes.data.count || 0,
        employee: empRes.data.count || 0,
        feedback: feedRes.data.count || 0,
        testimonial: testiRes.data.count || 0,
        latestEmployees: empRes.data.latest || [],
      });
    } catch (err) {
      // Log detailed error info to console
      console.error("Error loading dashboard stats", err);
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
      } else if (err.request) {
        console.error('No response received:', err.request);
      } else {
        console.error('Error message:', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cardInfo = [
    { title: 'Blogs', icon: <MdArticle size={40} />, key: 'blog' },
    { title: 'Employees', icon: <MdPeople size={40} />, key: 'employee' },
    { title: 'Feedbacks', icon: <MdFeedback size={40} />, key: 'feedback' },
    { title: 'Testimonials', icon: <MdRateReview size={40} />, key: 'testimonial' },
  ];

  if (loading) {
    return <p className="text-center my-5">Loading dashboard...</p>;
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-primary-custom d-flex align-items-center">
        <MdDashboard size={30} className="me-2" />
        Dashboard Overview
      </h2>

      {/* Cards Row - flex-wrap is important for small screens */}
      <div className="row flex-wrap mb-3">
        {cardInfo.map(({ title, icon, key }, index) => (
          <div key={key} className="col-6 col-md-4 col-lg-3 mb-3">
            <div
              className={`card text-center shadow-sm card-hover ${
                activeCardIndex === index ? 'bg-primary-custom text-white' : ''
              }`}
              onMouseEnter={() => setActiveCardIndex(index)}
            >
              <div className="card-body d-flex flex-column align-items-center gap-2">
                <div className={`icon-wrapper ${activeCardIndex === index ? 'text-white' : 'text-primary-custom'}`}>
                  {icon}
                </div>
                <p className="display-6 mb-1">{stats[key]}</p>
                <h5>{title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Employees Table */}
      {stats.latestEmployees.length > 0 && (
        <div className="card shadow-sm">
          <div className="card-header bg-primary-custom text-white d-flex align-items-center">
            <MdPeople size={24} className="me-2" />
            Recently Added Employees
          </div>
          <div className="card-body p-0">
            <div className="table-responsive-wrapper">
              <table className="table mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>totalWorkExperience
</th>
                    <th>Phone</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.latestEmployees.map((emp, i) => (
                    <tr
                      key={emp._id}
                      className={`employee-row ${i === 1 ? 'default-highlight' : ''}`}
                    >
                      <td>{i + 1}</td>
                      <td>{emp.firstName} {emp.lastName}</td>
                      <td>{emp.email}</td>
                      <td>{emp.totalWorkExperience
} yrs</td>
                      <td>{emp.phoneNumber}</td>
                      <td>{new Date(emp.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .card-hover {
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .card-hover:hover {
          background-color: #2ca8a6 !important;
          color: white !important;
        }

        .card-hover:hover .icon-wrapper {
          color: white !important;
        }

        .icon-wrapper {
          transition: color 0.3s ease;
        }

        .employee-row {
          background-color: #f8f9fa;
          transition: all 0.3s ease;
          cursor: pointer;
          white-space: nowrap;
        }

        .employee-row:hover {
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
          transform: scale(1.01);
        }

        .employee-row:hover td {
          color: #212529 !important;
        }

        .employee-row.default-highlight:not(:hover) {
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
          transform: scale(1.01);
        }

        @media (max-width: 991.98px) {
          .table-responsive-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
        }

        @media (min-width: 992px) {
          .table-responsive-wrapper {
            overflow-x: visible !important;
          }
        }

        .table-responsive-wrapper table {
          min-width: 800px;
        }

        .row.flex-wrap {
          flex-wrap: wrap !important;
        }

        .container {
          overflow-x: visible !important;
        }
      `}</style>
    </div>
  );
};

export default DashboardHome;
