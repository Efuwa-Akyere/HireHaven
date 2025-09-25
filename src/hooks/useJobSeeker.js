import { useState } from 'react';
import { jobSeekerService } from '../services/api';

export const useJobSeeker = () => {
  const [profile, setProfile] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    const result = await jobSeekerService.getProfile();
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
    const result = await jobSeekerService.updateProfile(profileData);
    if (result.success) {
      setProfile(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };

  const uploadFiles = async (files) => {
    setLoading(true);
    setError(null);
    const result = await jobSeekerService.uploadFiles(files);
    if (result.success) {
      // Update profile with new file information
      setProfile(prev => ({
        ...prev,
        resume: result.data.resume || prev?.resume,
        profilePicture: result.data.profilePicture || prev?.profilePicture
      }));
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };

  const fetchDashboardStats = async () => {
    setError(null);
    const result = await jobSeekerService.getDashboardStats();
    if (result.success) {
      setDashboardStats(result.data);
    } else {
      setError(result.error);
    }
  };

  const fetchApplications = async (params = {}) => {
    setLoading(true);
    setError(null);
    const result = await jobSeekerService.getApplications(params);
    if (result.success) {
      setApplications(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };

  const fetchSavedJobs = async () => {
    setError(null);
    const result = await jobSeekerService.getSavedJobs();
    if (result.success) {
      setSavedJobs(result.data);
    } else {
      setError(result.error);
    }
  };

  const addExperience = async (experienceData) => {
    setLoading(true);
    setError(null);
    const result = await jobSeekerService.addExperience(experienceData);
    if (result.success) {
      await fetchProfile(); // Refresh profile to get updated experience
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };

  const updateExperience = async (id, experienceData) => {
    setLoading(true);
    setError(null);
    const result = await jobSeekerService.updateExperience(id, experienceData);
    if (result.success) {
      await fetchProfile(); // Refresh profile
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };

  const deleteExperience = async (id) => {
    setLoading(true);
    setError(null);
    const result = await jobSeekerService.deleteExperience(id);
    if (result.success) {
      await fetchProfile(); // Refresh profile
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };

  return {
    profile,
    dashboardStats,
    applications,
    savedJobs,
    loading,
    error,
    fetchProfile,
    updateProfile,
    uploadFiles,
    fetchDashboardStats,
    fetchApplications,
    fetchSavedJobs,
    addExperience,
    updateExperience,
    deleteExperience,
    clearError: () => setError(null)
  };
};
