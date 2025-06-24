import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProfileContext } from '../context/ProfileContext';
import {
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaSuitcase,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';

const iconCircleStyle = {
  backgroundColor: '#0d6efd',
  borderRadius: '50%',
  color: 'white',
  width: '32px',
  height: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const shadowRowStyle = {
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '1.5rem',
  backgroundColor: 'white',
};

const ProfileDetail = () => {
  const { profileId } = useParams();
  const { profiles } = useContext(ProfileContext);
  const [profileData, setProfileData] = useState(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    const profile = profiles.find((item) => item._id === profileId);
    if (profile) {
      setProfileData(profile);
      setImage(profile.image?.[0] || '');
    }
    window.scrollTo(0, 0);
  }, [profileId, profiles]);

  if (!profileData)
    return (
      <div className="text-center mt-5 fs-4">
        Loading...
      </div>
    );
  console.log('Profile component render', profileData);

  const parseField = (field) => {
    if (!field) return 'N/A';
    if (Array.isArray(field)) return field.join(', ');
    if (typeof field === 'string') {
      try {
        const parsed = JSON.parse(field);
        if (Array.isArray(parsed)) return parsed.join(', ');
        return parsed;
      } catch {
        return field;
      }
    }
    return field;
  };

  const formatExperience = (exp) => {
    if (exp === 0) return '0 years';
    if (exp === undefined || exp === null) return 'N/A';
    return `${exp} years`;
  };

  
  return (
    <div className="container mt-5 pt-5">
      <Link to="/profile" className="btn btn-primary mb-4 mt-2">&larr; Back to Profile</Link>
      
      <div className="row align-items-start mb-5">
        <div className="col-md-3 text-center mt-3">
          <div
            className="position-relative d-inline-block"
            style={{
              boxShadow: '0 0 15px 4px rgba(13, 110, 253, 0.7)',
              borderRadius: '8px',
              maxWidth: '100%',
            }}
          >
            <img
              src={image}
              alt={`${profileData.firstName} ${profileData.lastName}`}
              className="img-fluid rounded"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '350px',
                objectFit: 'cover',
                display: 'block',
                borderRadius: '8px',
              }}
            />
          </div>

          <hr
            style={{
              borderTop: '2px solid #0d6efd',
              width: '80%',
              margin: '20px auto',
            }}
          />

          <h2 className="fw-bold text-capitalize">
            {profileData.firstName} {profileData.lastName}
          </h2>

          <p className="text-muted">{profileData.educationLevel || 'N/A'}</p>
        </div>

        <div className="col-md-9 mt-3">
          <div className="hover-card" style={shadowRowStyle}>
            <div className="row">
              <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
                <div style={iconCircleStyle}>
                  <FaGraduationCap />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Education Level</h6>
                  <p className="mb-0">{profileData.educationLevel || 'N/A'}</p>
                </div>
              </div>

              <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
                <div style={iconCircleStyle}>
                  <FaBriefcase />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Total Experience</h6>
                  <p className="mb-0">{formatExperience(profileData.totalWorkExperience)}</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
                <div style={iconCircleStyle}>
                  <FaBriefcase />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Self Experience</h6>
                  <p className="mb-0">{formatExperience(profileData.workExperienceSelf)}</p>
                </div>
              </div>

              <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
                <div style={iconCircleStyle}>
                  <FaBriefcase />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Govt Experience</h6>
                  <p className="mb-0">{formatExperience(profileData.workExperienceGovernment)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hover-card bg-primary text-white" style={shadowRowStyle}>
            <div className="row">
              <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
                <div style={iconCircleStyle}>
                  <FaTools />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Skills</h6>
                  <p className="mb-0">
                    {(() => {
                      try {
                        if (Array.isArray(profileData.additionalSkills) && profileData.additionalSkills.length === 1) {
                          const parsedSkills = JSON.parse(profileData.additionalSkills[0]);
                          return parsedSkills.join(', ');
                        }
                        if (Array.isArray(profileData.additionalSkills)) {
                          return profileData.additionalSkills.join(', ');
                        }
                        return profileData.additionalSkills || 'N/A';
                      } catch {
                        return profileData.additionalSkills || 'N/A';
                      }
                    })()}
                  </p>
                </div>
              </div>

              <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
                <div style={iconCircleStyle}>
                  <FaSuitcase />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Job Type</h6>
                  <p className="mb-0">
                    {(() => {
                      try {
                        if (Array.isArray(profileData.neededJobType) && profileData.neededJobType.length === 1) {
                          const parsedJobs = JSON.parse(profileData.neededJobType[0]);
                          return parsedJobs.join(', ');
                        }
                        if (Array.isArray(profileData.neededJobType)) {
                          return profileData.neededJobType.join(', ');
                        }
                        return profileData.neededJobType || 'N/A';
                      } catch {
                        return profileData.neededJobType || 'N/A';
                      }
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                <FaEnvelope className="me-2 text-primary" />
                Email
              </label>
              <input
                type="text"
                readOnly
                className="form-control bg-light"
                id="email"
                value={profileData.email || 'N/A'}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="phone" className="form-label fw-bold">
                <FaPhone className="me-2 text-primary" />
                Phone
              </label>
              <input
                type="text"
                readOnly
                className="form-control bg-light"
                id="phone"
                value={profileData.phoneNumber || 'N/A'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
