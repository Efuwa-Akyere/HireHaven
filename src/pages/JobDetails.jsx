import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../App';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    coverLetter: '',
    resume: null
  });

  useEffect(() => {
    fetchJobDetails();
    if (user && user.userType === 'jobseeker') {
      checkApplicationStatus();
      checkBookmarkStatus();
    }
  }, [id, user]);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`/api/jobs/${id}`);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
  };

  const checkApplicationStatus = async () => {
    try {
      const response = await axios.get('/api/applications/my-applications');
      const hasApplied = response.data.some(app => app.job._id === id);
      setHasApplied(hasApplied);
    } catch (error) {
      console.error('Error checking application status:', error);
    }
  };

  const checkBookmarkStatus = async () => {
    try {
      const response = await axios.get('/api/jobs/bookmarks/my-bookmarks');
      const isBookmarked = response.data.some(job => job._id === id);
      setIsBookmarked(isBookmarked);
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    }
  };


  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.userType !== 'jobseeker') {
      alert('Only job seekers can apply for jobs');
      return;
    }

    setApplying(true);
    try {
      const formData = new FormData();
      formData.append('coverLetter', applicationForm.coverLetter);
      if (applicationForm.resume) {
        formData.append('resume', applicationForm.resume);
      }

      await axios.post(`/api/applications/apply/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setHasApplied(true);
      setShowApplicationForm(false);
      alert('Application submitted successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.userType !== 'jobseeker') {
      alert('Only job seekers can bookmark jobs');
      return;
    }

    try {
      if (isBookmarked) {
        await axios.delete(`/api/jobs/${id}/bookmark`);
        setIsBookmarked(false);
      } else {
        await axios.post(`/api/jobs/${id}/bookmark`);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleApplicationFormChange = (e) => {
    const { name, value, files } = e.target;
    setApplicationForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container">
        <div className="text-center">
          <h2>Job not found</h2>
          <button onClick={() => navigate('/jobs')} className="btn btn-primary">
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details-page">
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="job-details-card">
              <div className="job-header">
                <div className="job-title-section">
                  <h1 className="job-title">{job.title}</h1>
                  <h2 className="job-company">{job.company}</h2>
                  <p className="job-location">📍 {job.location}</p>
                </div>
                {job.employer?.profile?.companyLogo && (
                  <div className="company-logo-large">
                    <img 
                      src={`/${job.employer.profile.companyLogo}`} 
                      alt={job.company}
                      className="logo-img"
                    />
                  </div>
                )}
              </div>

              <div className="job-meta">
                <div className="meta-item">
                  <strong>Job Type:</strong> {job.type}
                </div>
                <div className="meta-item">
                  <strong>Category:</strong> {job.category}
                </div>
                <div className="meta-item">
                  <strong>Experience:</strong> {job.experience}
                </div>
                {job.salary?.min && (
                  <div className="meta-item">
                    <strong>Salary:</strong> GHS {job.salary.min?.toLocaleString()} - {job.salary.max?.toLocaleString()}
                  </div>
                )}
                {job.applicationDeadline && (
                  <div className="meta-item">
                    <strong>Application Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="job-section">
                <h3>Job Description</h3>
                <div className="job-description">
                  {job.description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {job.requirements && job.requirements.length > 0 && (
                <div className="job-section">
                  <h3>Requirements</h3>
                  <ul className="requirements-list">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <div className="job-section">
                  <h3>Benefits</h3>
                  <ul className="benefits-list">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.skills && job.skills.length > 0 && (
                <div className="job-section">
                  <h3>Required Skills</h3>
                  <div className="skills-tags">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {job.employer?.profile && (
                <div className="job-section">
                  <h3>About {job.company}</h3>
                  <div className="company-info">
                    <p>{job.employer.profile.companyDescription}</p>
                    {job.employer.profile.companyWebsite && (
                      <p>
                        <strong>Website:</strong>{' '}
                        <a 
                          href={job.employer.profile.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {job.employer.profile.companyWebsite}
                        </a>
                      </p>
                    )}
                    {job.employer.profile.industry && (
                      <p><strong>Industry:</strong> {job.employer.profile.industry}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-4">
            <div className="job-sidebar">
              <div className="application-card">
                <div className="job-posted">
                  Posted {new Date(job.createdAt).toLocaleDateString()}
                </div>

                {user && user.userType === 'jobseeker' ? (
                  <div className="application-actions">
                    {hasApplied ? (
                      <div className="applied-status">
                        <span className="badge badge-success">✓ Applied</span>
                        <p>You have already applied for this job</p>
                      </div>
                    ) : job.status === 'active' ? (
                      <button
                        onClick={() => setShowApplicationForm(true)}
                        className="btn btn-primary apply-btn"
                      >
                        Apply Now
                      </button>
                    ) : (
                      <div className="job-closed">
                        <span className="badge badge-secondary">Job Closed</span>
                      </div>
                    )}

                    <button
                      onClick={handleBookmark}
                      className={`btn bookmark-btn ${isBookmarked ? 'bookmarked' : 'btn-outline'}`}
                    >
                      {isBookmarked ? '❤️ Bookmarked' : '🤍 Bookmark'}
                    </button>
                  </div>
                ) : user && user.userType === 'employer' ? (
                  <div className="employer-view">
                    <p>Viewing as employer</p>
                  </div>
                ) : (
                  <div className="guest-actions">
                    <p>Sign in to apply for this job</p>
                    <button
                      onClick={() => navigate('/login')}
                      className="btn btn-primary"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>

              <div className="job-stats">
                <h4>Job Statistics</h4>
                <div className="stat-item">
                  <span className="stat-label">Applications:</span>
                  <span className="stat-value">{job.applications?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Apply for {job.title}</h3>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleApply}>
              <div className="form-group">
                <label>Cover Letter</label>
                <textarea
                  name="coverLetter"
                  className="form-control"
                  rows="6"
                  placeholder="Tell the employer why you're interested in this role..."
                  value={applicationForm.coverLetter}
                  onChange={handleApplicationFormChange}
                  maxLength="1000"
                />
                <small className="form-text">
                  {applicationForm.coverLetter.length}/1000 characters
                </small>
              </div>

              <div className="form-group">
                <label>Resume (Optional)</label>
                <input
                  type="file"
                  name="resume"
                  className="form-control"
                  accept=".pdf,.doc,.docx"
                  onChange={handleApplicationFormChange}
                />
                <small className="form-text">
                  Upload a resume or leave blank to use your profile resume
                </small>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={applying}
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;