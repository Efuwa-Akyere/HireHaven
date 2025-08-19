import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../App';

const Applications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('/api/applications/my-applications');
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const withdrawApplication = async (applicationId) => {
    if (!window.confirm('Are you sure you want to withdraw this application?')) {
      return;
    }

    try {
      await axios.delete(`/api/applications/${applicationId}`);
      setApplications(applications.filter(app => app._id !== applicationId));
    } catch (error) {
      console.error('Error withdrawing application:', error);
      alert('Failed to withdraw application');
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'badge-warning',
      shortlisted: 'badge-success',
      rejected: 'badge-danger',
      hired: 'badge-primary'
    };
    
    const statusIcons = {
      pending: '⏳',
      shortlisted: '✅',
      rejected: '❌',
      hired: '🎉'
    };

    return (
      <span className={`badge ${statusClasses[status] || 'badge-secondary'}`}>
        {statusIcons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getFilteredApplications = () => {
    if (filter === 'all') return applications;
    return applications.filter(app => app.status === filter);
  };

  const getStatusCounts = () => {
    return {
      all: applications.length,
      pending: applications.filter(app => app.status === 'pending').length,
      shortlisted: applications.filter(app => app.status === 'shortlisted').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
      hired: applications.filter(app => app.status === 'hired').length
    };
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your applications...</p>
        </div>
      </div>
    );
  }

  const filteredApplications = getFilteredApplications();
  const statusCounts = getStatusCounts();

  return (
    <div className="applications-page">
      <div className="container">
        <div className="page-header">
          <h1>My Applications</h1>
          <p>Track the status of your job applications</p>
        </div>

        {/* Status Filter Tabs */}
        <div className="status-filter">
          <button
            onClick={() => setFilter('all')}
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          >
            All ({statusCounts.all})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
          >
            Pending ({statusCounts.pending})
          </button>
          <button
            onClick={() => setFilter('shortlisted')}
            className={`filter-tab ${filter === 'shortlisted' ? 'active' : ''}`}
          >
            Shortlisted ({statusCounts.shortlisted})
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`filter-tab ${filter === 'rejected' ? 'active' : ''}`}
          >
            Rejected ({statusCounts.rejected})
          </button>
          <button
            onClick={() => setFilter('hired')}
            className={`filter-tab ${filter === 'hired' ? 'active' : ''}`}
          >
            Hired ({statusCounts.hired})
          </button>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="no-applications">
            <div className="empty-state">
              <h3>
                {filter === 'all' 
                  ? 'No applications yet' 
                  : `No ${filter} applications`
                }
              </h3>
              <p>
                {filter === 'all' 
                  ? 'Start applying for jobs to see them here' 
                  : `You don't have any ${filter} applications at the moment`
                }
              </p>
              <Link to="/jobs" className="btn btn-primary">
                Browse Jobs
              </Link>
            </div>
          </div>
        ) : (
          <div className="applications-list">
            {filteredApplications.map((application) => (
              <div key={application._id} className="application-card">
                <div className="application-header">
                  <div className="job-info">
                    <h3 className="job-title">
                      <Link to={`/jobs/${application.job._id}`}>
                        {application.job.title}
                      </Link>
                    </h3>
                    <p className="job-company">{application.job.company}</p>
                    <p className="job-location">📍 {application.job.location}</p>
                  </div>
                  <div className="application-status">
                    {getStatusBadge(application.status)}
                  </div>
                </div>

                <div className="application-meta">
                  <div className="meta-item">
                    <strong>Applied:</strong> {new Date(application.appliedAt).toLocaleDateString()}
                  </div>
                  <div className="meta-item">
                    <strong>Job Type:</strong> {application.job.type}
                  </div>
                  <div className="meta-item">
                    <strong>Status Updated:</strong> {new Date(application.statusUpdatedAt).toLocaleDateString()}
                  </div>
                </div>

                {application.coverLetter && (
                  <div className="cover-letter-preview">
                    <strong>Cover Letter:</strong>
                    <p>
                      {application.coverLetter.length > 200
                        ? `${application.coverLetter.substring(0, 200)}...`
                        : application.coverLetter
                      }
                    </p>
                  </div>
                )}

                {application.notes && (
                  <div className="employer-notes">
                    <strong>Employer Notes:</strong>
                    <p>{application.notes}</p>
                  </div>
                )}

                <div className="application-actions">
                  <Link
                    to={`/jobs/${application.job._id}`}
                    className="btn btn-outline btn-sm"
                  >
                    View Job
                  </Link>
                  
                  {application.status === 'pending' && (
                    <button
                      onClick={() => withdrawApplication(application._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Withdraw
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {applications.length > 0 && (
          <div className="applications-summary">
            <div className="summary-stats">
              <div className="summary-card">
                <span className="summary-number">{statusCounts.pending}</span>
                <span className="summary-label">Pending Review</span>
              </div>
              <div className="summary-card">
                <span className="summary-number">{statusCounts.shortlisted}</span>
                <span className="summary-label">Shortlisted</span>
              </div>
              <div className="summary-card">
                <span className="summary-number">{statusCounts.hired}</span>
                <span className="summary-label">Hired</span>
              </div>
              <div className="summary-card">
                <span className="summary-number">
                  {((statusCounts.shortlisted + statusCounts.hired) / statusCounts.all * 100).toFixed(0)}%
                </span>
                <span className="summary-label">Success Rate</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;