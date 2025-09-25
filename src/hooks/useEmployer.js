import { useState } from 'react';
import  { employerService } from '../services/api';

export const useEmployer = () => {
  const [profile, setProfile] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    const result = await employerService.getProfile();
    if (result.success) {
      setProfile(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    const result = await employerService.updateProfile(profileData);
    if (result.success) {
      setProfile(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };

  const uploadLogo = async (logoFile) => {
    setLoading(true);
    setError(null);
    const result = await employerService.uploadLogo(logoFile);
    if (result.success) {
      setProfile(prev => ({
        ...prev,
        logo: result.data.logo
      }));
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };

  const fetchDashboardStats = async () => {
    setError(null);
    const result = await employerService.getDashboardStats();
    if (result.success) {
      setDashboardStats(result.data);
    } else {
      setError(result.error);
    }
  };

  const fetchJobs = async (params = {}) => {
    setLoading(true);
    setError(null);
    const result = await employerService.getJobs(params);
    if (result.success) {
      setJobs(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };

  const fetchApplications = async (params = {}) => {
    setLoading(true);
    setError(null);
    const result = await employerService.getApplications(params);
    if (result.success) {
      setApplications(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };

  const updateApplicationStatus = async (applicationId, statusData) => {
    setError(null);
    const result = await employerService.updateApplicationStatus(applicationId, statusData);
    if (result.success) {
      // Update the application in the local state
      setApplications(prev => 
        prev.map(app => 
          app._id === applicationId 
            ? { ...app, status: statusData.status, lastStatusUpdate: new Date() }
            : app
        )
      );
    } else {
      setError(result.error);
    }
    return result;
  };

  const fetchAnalytics = async () => {
    setError(null);
    const result = await employerService.getAnalytics();
    if (result.success) {
      setAnalytics(result.data);
    } else {
      setError(result.error);
    }
  };

  return {
    profile,
    dashboardStats,
    jobs,
    applications,
    analytics,
    loading,
    error,
    fetchProfile,
    updateProfile,
    uploadLogo,
    fetchDashboardStats,
    fetchJobs,
    fetchApplications,
    updateApplicationStatus,
    fetchAnalytics,
    clearError: () => setError(null)
  };
};