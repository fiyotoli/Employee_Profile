import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBriefcase } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../components/JobCard.css'; // You can still use this for custom styles

const JobCard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/jobs/list`);
        if (res.data.success) {
          setJobs(res.data.jobs);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  if (loading) return <p className="text-center my-5">Loading jobs...</p>;

  return (
    <div className="container py-4 mt-5">
      <h2 className="mb-4 mt-5 text-center  d-flex justify-content-center align-items-center gap-2">
        <FaBriefcase className='text-primary-custom' />ክፍት የሥራ ቦታዎች
      </h2>
      <div className="row g-4">
        {jobs.length === 0 && (
          <p className="text-center text-muted">ክፍት የሥራ ቦታ የለም.</p>
        )}

        {jobs.map((job) => (
          <div key={job._id} className="col-md-6 col-lg-4">
            <div
              className="card h-100 border-0 shadow-sm hover-shadow job-card"
              style={{ cursor: 'pointer', transition: '0.3s' }}
            >
              <div className="card-body">

                {/* First Row - Icon & Info */}
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="bg-primary-custom text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: '50px', height: '50px' }}
                  >
                    <FaBriefcase size={20} />
                  </div>
                  <div>
                    <h5 className="mb-0 fw-bold text-capitalize">{job.organizationName}</h5>
                    <small className="text-muted">
                      {job.organizationType}
                      {job.organizationType === 'Other' && job.organizationTypeOther
                        ? ` (${job.organizationTypeOther})`
                        : ''}
                    </small>
                  </div>
                </div>

                {/* Second Row - Job Title & Description */}
                <div className="mb-3 border-bottom pb-2">
                  <h6 className="fw-bold text-capitalize">
                    {Array.isArray(job.jobTitle)
                      ? job.jobTitle.join(', ')
                      : job.jobTitle}
                  </h6>
                  <p className="text-muted mb-0">
                    {truncateText(job.jobDescription)}
                  </p>
                </div>

                {/* Third Row - Location & Experience */}
                <div className="d-flex justify-content-between text-muted small mb-3">
                  <div>📍 {job.jobLocation}</div>
                  {/* <div>🧠 {job.workExperience}</div> */}
                </div>

                {/* View Details */}
                <div className="d-flex justify-content-start">
                  <Link
                    to={`/job/${job._id}`}
                    className="btn  view-detail-button  btn-sm"
                  >
                    ዝርዝሮችን ይመልከቱ
                  </Link>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCard;
