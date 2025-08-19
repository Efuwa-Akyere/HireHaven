import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    type: '',
    experience: '',
    location: ''
  });

  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Initialize filters from URL parameters
    const initialFilters = {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      type: searchParams.get('type') || '',
      experience: searchParams.get('experience') || '',
      location: searchParams.get('location') || ''
    };
    setFilters(initialFilters);
    fetchJobs(1, initialFilters);
  }, [searchParams]);

  const fetchJobs = async (page = 1, currentFilters = filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });

      // Add filters to params
      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });

      const response = await axios.get(`/api/jobs?${params.toString()}`);
      setJobs(response.data.jobs || []);
      setPagination({
        currentPage: response.data.currentPage || 1,
        totalPages: response.data.totalPages || 1,
        totalJobs: response.data.totalJobs || 0
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
      setPagination({ currentPage: 1, totalPages: 1, totalJobs: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchJobs(1, newFilters);
  };

  const handlePageChange = (page) => {
    fetchJobs(page);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      type: '',
      experience: '',
      location: ''
    };
    setFilters(clearedFilters);
    fetchJobs(1, clearedFilters);
  };

  return (
    <div className="jobs-page">
      <div className="container">
        <div className="page-header">
          <h1>Find Your Perfect Job</h1>
          <p>Explore {pagination.totalJobs || 0} available opportunities</p>
        </div>

        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-3">
            <div className="filters-sidebar">
              <div className="card">
                <div className="card-header">
                  <h3>Filter Jobs</h3>
                  <button onClick={clearFilters} className="btn btn-outline btn-sm">
                    Clear All
                  </button>
                </div>

                {/* Search Filter */}
                <div className="filter-group">
                  <label>Search Keywords</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Job title, keywords..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>

                {/* Location Filter */}
                <div className="filter-group">
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City or region"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  />
                </div>

                {/* Category Filter */}
                <div className="filter-group">
                  <label>Category</label>
                  <select
                    className="form-control"
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="IT & Software">IT & Software</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Job Type Filter */}
                <div className="filter-group">
                  <label>Job Type</label>
                  <select
                    className="form-control"
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                  >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                {/* Experience Filter */}
                <div className="filter-group">
                  <label>Experience Level</label>
                  <select
                    className="form-control"
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                  >
                    <option value="">All Levels</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior Level">Senior Level</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="col-9">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading jobs...</p>
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="results-header">
                  <p>
                    Showing {jobs?.length || 0} of {pagination.totalJobs || 0} jobs
                    {Object.values(filters).some(f => f) && (
                      <span className="filter-indicator"> (filtered)</span>
                    )}
                  </p>
                </div>

                {/* Jobs Grid */}
                <div className="jobs-list">
                  {(jobs?.length ?? 0) === 0 ? (
                    <div className="no-results">
                      <h3>No jobs found</h3>
                      <p>Try adjusting your filters or search terms</p>
                      <button onClick={clearFilters} className="btn btn-primary">
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    jobs.map((job) => (
                      <div key={job._id} className="job-card">
                        <div className="job-header">
                          <div className="job-title-section">
                            <h3 className="job-title">
                              <Link to={`/jobs/${job._id}`}>{job.title}</Link>
                            </h3>
                            <p className="job-company">{job.company}</p>
                          </div>
                          {job.employer?.profile?.companyLogo && (
                            <div className="company-logo">
                              <img 
                                src={`/${job.employer.profile.companyLogo}`} 
                                alt={job.company}
                                className="logo-img"
                              />
                            </div>
                          )}
                        </div>

                        <div className="job-details">
                          <p className="job-location">📍 {job.location}</p>
                          <div className="job-meta">
                            <span className="job-type">{job.type}</span>
                            <span className="job-category">{job.category}</span>
                            <span className="job-experience">{job.experience}</span>
                          </div>
                        </div>

                        <div className="job-description">
                          <p>
                            {job.description?.length > 200
                              ? `${job.description.substring(0, 200)}...`
                              : job.description}
                          </p>
                        </div>

                        {job.salary?.min && (
                          <div className="job-salary">
                            💰 GHS {job.salary.min?.toLocaleString()} - {job.salary.max?.toLocaleString()}
                          </div>
                        )}

                        <div className="job-footer">
                          <div className="job-posted">
                            Posted {new Date(job.createdAt).toLocaleDateString()}
                          </div>
                          <div className="job-actions">
                            <Link to={`/jobs/${job._id}`} className="btn btn-primary">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="pagination-container">
                    <div className="pagination">
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="btn btn-outline"
                      >
                        Previous
                      </button>
                      
                      {[...Array(pagination.totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`btn ${page === pagination.currentPage ? 'btn-primary' : 'btn-outline'}`}
                          >
                            {page}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="btn btn-outline"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
