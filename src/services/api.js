// API Integration Layer for HireHaven Frontend
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:7000/api/auth').replace(/\/$/, '');

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getAuthHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    // Don't set Content-Type for FormData (file uploads)
    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(data.message || 'API Error', response.status, data);
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error', 0, null);
    }
  }

  // Auth Methods
  async register(userData) {
    return this.request('/auth/jobseeker/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(email, password) {
    const response = await this.request('/auth/jobseeker/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.setToken(null);
    }
  }

  async getCurrentUser() {
  try {
    const response = await apiClient.getCurrentUser();
    return { 
      success: true, 
      data: {
        user: response.user,
        profile: response.profile
      } 
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


  async changePassword(currentPassword, newPassword) {
    return this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Job Seeker Methods
  async getJobSeekerProfile() {
    return this.request('/jobseeker/profile');
  }

  async updateJobSeekerProfile(profileData) {
    return this.request('/jobseeker/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async uploadFiles(files) {
    const formData = new FormData();
    if (files.resume) formData.append('resume', files.resume);
    if (files.profilePicture) formData.append('profilePicture', files.profilePicture);

    return this.request('/jobseeker/upload', {
      method: 'POST',
      body: formData,
    });
  }

  async addExperience(experienceData) {
    return this.request('/jobseeker/experience', {
      method: 'POST',
      body: JSON.stringify(experienceData),
    });
  }

  async updateExperience(id, experienceData) {
    return this.request(`/jobseeker/experience/${id}`, {
      method: 'PUT',
      body: JSON.stringify(experienceData),
    });
  }

  async deleteExperience(id) {
    return this.request(`/jobseeker/experience/${id}`, {
      method: 'DELETE',
    });
  }

  async addEducation(educationData) {
    return this.request('/jobseeker/education', {
      method: 'POST',
      body: JSON.stringify(educationData),
    });
  }

  async updateEducation(id, educationData) {
    return this.request(`/jobseeker/education/${id}`, {
      method: 'PUT',
      body: JSON.stringify(educationData),
    });
  }

  async deleteEducation(id) {
    return this.request(`/jobseeker/education/${id}`, {
      method: 'DELETE',
    });
  }

  async addCertification(certificationData) {
    return this.request('/jobseeker/certifications', {
      method: 'POST',
      body: JSON.stringify(certificationData),
    });
  }

  async deleteCertification(id) {
    return this.request(`/jobseeker/certifications/${id}`, {
      method: 'DELETE',
    });
  }

  async getSavedJobs() {
    return this.request('/jobseeker/saved-jobs');
  }

  async saveJob(jobId) {
    return this.request(`/jobseeker/save-job/${jobId}`, {
      method: 'POST',
    });
  }

  async unsaveJob(jobId) {
    return this.request(`/jobseeker/unsave-job/${jobId}`, {
      method: 'DELETE',
    });
  }

  async getMyApplications(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/jobseeker/applications${queryString ? `?${queryString}` : ''}`);
  }

  async getJobSeekerStats() {
    return this.request('/jobseeker/dashboard-stats');
  }

  // Employer Methods
  async getCompanyProfile() {
    return this.request('/employer/profile');
  }

  async updateCompanyProfile(profileData) {
    return this.request('/employer/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async uploadCompanyLogo(logoFile) {
    const formData = new FormData();
    formData.append('logo', logoFile);

    return this.request('/employer/upload-logo', {
      method: 'POST',
      body: formData,
    });
  }

  async getCompanyJobs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/employer/jobs${queryString ? `?${queryString}` : ''}`);
  }

  async getApplications(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/employer/applications${queryString ? `?${queryString}` : ''}`);
  }

  async updateApplicationStatus(applicationId, statusData) {
    return this.request(`/employer/applications/${applicationId}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    });
  }

  async rateCandidate(applicationId, rating, notes) {
    return this.request(`/employer/applications/${applicationId}/rating`, {
      method: 'PUT',
      body: JSON.stringify({ rating, notes }),
    });
  }

  async getEmployerStats() {
    return this.request('/employer/dashboard-stats');
  }

  async getEmployerAnalytics() {
    return this.request('/employer/analytics');
  }

  async getCandidateProfile(candidateId) {
    return this.request(`/employer/candidate/${candidateId}`);
  }

  // Job Methods
  async getJobs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/jobs${queryString ? `?${queryString}` : ''}`);
  }

  async getFeaturedJobs() {
    return this.request('/jobs/featured');
  }

  async getJobRecommendations() {
    return this.request('/jobs/recommendations');
  }

  async getJob(jobId) {
    return this.request(`/jobs/${jobId}`);
  }

  async createJob(jobData) {
    return this.request('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  async updateJob(jobId, jobData) {
    return this.request(`/jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });
  }

  async deleteJob(jobId) {
    return this.request(`/jobs/${jobId}`, {
      method: 'DELETE',
    });
  }

  async updateJobStatus(jobId, status) {
    return this.request(`/jobs/${jobId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async getJobStats() {
    return this.request('/jobs/stats/overview');
  }

  // Application Methods
  async applyToJob(jobId, applicationData, resumeFile = null) {
    const formData = new FormData();
    formData.append('coverLetter', applicationData.coverLetter || '');
    
    if (applicationData.customAnswers) {
      formData.append('customAnswers', JSON.stringify(applicationData.customAnswers));
    }
    
    if (resumeFile) {
      formData.append('resume', resumeFile);
    }

    return this.request(`/applications/apply/${jobId}`, {
      method: 'POST',
      body: formData,
    });
  }

  async getApplication(applicationId) {
    return this.request(`/applications/${applicationId}`);
  }

  async withdrawApplication(applicationId) {
    return this.request(`/applications/${applicationId}/withdraw`, {
      method: 'PUT',
    });
  }

  async acceptOffer(applicationId) {
    return this.request(`/applications/${applicationId}/accept-offer`, {
      method: 'PUT',
    });
  }

  async declineOffer(applicationId, reason = '') {
    return this.request(`/applications/${applicationId}/decline-offer`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    });
  }

  async getApplicationStats() {
    return this.request('/applications/stats/overview');
  }
}

// Create singleton instance
const apiClient = new ApiClient();

// Higher-level service functions
export const authService = {
  async login(email, password) {
    try {
      const response = await apiClient.login(email, password);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async register(userData) {
    try {
      const response = await apiClient.register(userData);
      if (response.token) {
        apiClient.setToken(response.token);
      }
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async logout() {
    try {
      await apiClient.logout();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getCurrentUser() {
    try {
      const response = await apiClient.getCurrentUser();
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  isAuthenticated() {
    return !!apiClient.token;
  },

  getToken() {
    return apiClient.token;
  }
};

export const jobSeekerService = {
  async getProfile() {
    try {
      const response = await apiClient.getJobSeekerProfile();
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await apiClient.updateJobSeekerProfile(profileData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async uploadFiles(files) {
    try {
      const response = await apiClient.uploadFiles(files);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getDashboardStats() {
    try {
      const response = await apiClient.getJobSeekerStats();
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getSavedJobs() {
    try {
      const response = await apiClient.getSavedJobs();
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getApplications(params = {}) {
    try {
      const response = await apiClient.getMyApplications(params);
      return { success: true, data: response.data, pagination: response.pagination };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export const employerService = {
  async getProfile() {
    try {
      const response = await apiClient.getCompanyProfile();
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await apiClient.updateCompanyProfile(profileData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getDashboardStats() {
    try {
      const response = await apiClient.getEmployerStats();
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getJobs(params = {}) {
    try {
      const response = await apiClient.getCompanyJobs(params);
      return { success: true, data: response.data, pagination: response.pagination };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getApplications(params = {}) {
    try {
      const response = await apiClient.getApplications(params);
      return { success: true, data: response.data, pagination: response.pagination };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async updateApplicationStatus(applicationId, statusData) {
    try {
      const response = await apiClient.updateApplicationStatus(applicationId, statusData);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export const jobService = {
  async getJobs(params = {}) {
    try {
      const response = await apiClient.getJobs(params);
      return { success: true, data: response.data, pagination: response.pagination };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getJob(jobId) {
    try {
      const response = await apiClient.getJob(jobId);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async createJob(jobData) {
    try {
      const response = await apiClient.createJob(jobData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async applyToJob(jobId, applicationData, resumeFile = null) {
    try {
      const response = await apiClient.applyToJob(jobId, applicationData, resumeFile);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async saveJob(jobId) {
    try {
      const response = await apiClient.saveJob(jobId);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async unsaveJob(jobId) {
    try {
      const response = await apiClient.unsaveJob(jobId);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Export the main API client for direct access if needed
export default apiClient;