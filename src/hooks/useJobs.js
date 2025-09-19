import { useState, useCallback } from 'react';
import { jobService } from '../services/api';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [searchFilters, setSearchFilters] = useState({});

  const fetchJobs = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    const result = await jobService.getJobs(params);
    if (result.success) {
      setJobs(result.data);
      setPagination(result.pagination);
      setSearchFilters(params);
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  }, []);

  const fetchJob = useCallback(async (jobId) => {
    setLoading(true);
    setError(null);
    
    const result = await jobService.getJob(jobId);
    if (result.success) {
      setCurrentJob(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  }, []);

  const fetchFeaturedJobs = async () => {
    setError(null);
    const result = await jobService.getFeaturedJobs();
    if (result.success) {
      setFeaturedJobs(result.data);
    } else {
      setError(result.error);
    }
  };

  const createJob = async (jobData) => {
    setLoading(true);
    setError(null);
    const result = await jobService.createJob(jobData);
    if (result.success) {
      // Add new job to the beginning of jobs list
      setJobs(prev => [result.data, ...prev]);
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };

  const updateJob = async (jobId, jobData) => {
    setLoading(true);
    setError(null);
    const result = await jobService.updateJob(jobId, jobData);
    if (result.success) {
      // Update job in jobs list
      setJobs(prev => 
        prev.map(job => 
          job._id === jobId ? result.data : job
        )
      );
      // Update current job if it matches
      if (currentJob && currentJob._id === jobId) {
        setCurrentJob(result.data);
      }
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };

  const deleteJob = async (jobId) => {
    setLoading(true);
    setError(null);
    const result = await jobService.deleteJob(jobId);
    if (result.success) {
      // Remove job from jobs list
      setJobs(prev => prev.filter(job => job._id !== jobId));
      // Clear current job if it matches
      if (currentJob && currentJob._id === jobId) {
        setCurrentJob(null);
      }
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };

  const applyToJob = async (jobId, applicationData, resumeFile = null) => {
    setError(null);
    const result = await jobService.applyToJob(jobId, applicationData, resumeFile);
    if (result.success) {
      // Update current job to show application status
      if (currentJob && currentJob._id === jobId) {
        setCurrentJob(prev => ({ ...prev, hasApplied: true }));
      }
    } else {
      setError(result.error);
    }
    return result;
  };

  const saveJob = async (jobId) => {
    setError(null);
    const result = await jobService.saveJob(jobId);
    if (result.success) {
      // Update job in jobs list
      setJobs(prev => 
        prev.map(job => 
          job._id === jobId ? { ...job, isSaved: true } : job
        )
      );
      // Update current job if it matches
      if (currentJob && currentJob._id === jobId) {
        setCurrentJob(prev => ({ ...prev, isSaved: true }));
      }
    } else {
      setError(result.error);
    }
    return result;
  };

  const unsaveJob = async (jobId) => {
    setError(null);
    const result = await jobService.unsaveJob(jobId);
    if (result.success) {
      // Update job in jobs list
      setJobs(prev => 
        prev.map(job => 
          job._id === jobId ? { ...job, isSaved: false } : job
        )
      );
      // Update current job if it matches
      if (currentJob && currentJob._id === jobId) {
        setCurrentJob(prev => ({ ...prev, isSaved: false }));
      }
    } else {
      setError(result.error);
    }
    return result;
  };

  const searchJobs = useCallback(async (searchParams) => {
    return fetchJobs(searchParams);
  }, [fetchJobs]);

  const loadMoreJobs = async () => {
    if (!pagination || pagination.page >= pagination.pages) return;
    
    const nextPage = pagination.page + 1;
    const result = await jobService.getJobs({
      ...searchFilters,
      page: nextPage
    });
    
    if (result.success) {
      setJobs(prev => [...prev, ...result.data]);
      setPagination(result.pagination);
    }
    return result;
  };

  return {
    jobs,
    currentJob,
    featuredJobs,
    loading,
    error,
    pagination,
    searchFilters,
    fetchJobs,
    fetchJob,
    fetchFeaturedJobs,
    createJob,
    updateJob,
    deleteJob,
    applyToJob,
    saveJob,
    unsaveJob,
    searchJobs,
    loadMoreJobs,
    clearError: () => setError(null)
  };
};