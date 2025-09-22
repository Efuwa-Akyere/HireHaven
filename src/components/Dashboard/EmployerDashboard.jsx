import React, { useState, useEffect } from 'react';
import { Building2, Users, FileText, TrendingUp, LogOut, Edit, Phone, Mail, Globe, Plus, Eye, UserCheck, Upload, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useEmployer } from '../../hooks/useEmployer';
import { useJobs } from '../../hooks/useJobs';
import { employerService } from '../../services/api';
import { jobService } from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';

const EmployerDashboard = () => {
  const { user, logout, updateProfile: updateAuthProfile } = useAuth();
  const {
    profile: companyProfile,
    dashboardStats,
    jobs: companyJobs,
    applications,
    loading: employerLoading,
    error: employerError,
    fetchProfile,
    updateProfile,
    fetchDashboardStats,
    fetchJobs,
    fetchApplications,
    updateApplicationStatus
  } = useEmployer();

  const { createJob } = useJobs();

  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({});
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobFormLoading, setJobFormLoading] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    description: '',
    location: '',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salary: { min: '', max: '', currency: 'GHS' },
    skills: [''],
    requirements: [''],
    responsibilities: ['']
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch data when component mounts or section changes
  useEffect(() => {
    const loadData = async () => {
      await fetchProfile();
      await fetchDashboardStats();
      
      if (activeSection === 'jobs') {
        await fetchJobs();
      } else if (activeSection === 'candidates') {
        await fetchApplications();
      }
    };

    loadData();
  }, [activeSection]);

  // Initialize profile form when profile is loaded
  useEffect(() => {
    if (companyProfile && !editMode) {
      setProfileForm({
        companyName: companyProfile.companyName || '',
        industry: companyProfile.industry || '',
        description: companyProfile.description || '',
        website: companyProfile.website || '',
        phone: companyProfile.phone || '',
        location: companyProfile.location || {},
        culture: companyProfile.culture || [],
        benefits: companyProfile.benefits || [],
        socialLinks: companyProfile.socialLinks || {}
      });
    }
  }, [companyProfile, editMode]);

  const handleProfileUpdate = async () => {
    const result = await updateProfile(profileForm);
    if (result.success) {
      setEditMode(false);
      updateAuthProfile(result.data);
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingLogo(true);
    try {
      const formData = new FormData();
      formData.append('logo', file);
      
      const result = await employerService.uploadLogo(file);
      if (result.success) {
        await fetchProfile(); // Refresh profile to show new logo
      }
    } catch (error) {
      console.error('Logo upload failed:', error);
    }
    setUploadingLogo(false);
  };

  const handleJobSubmit = async () => {
    if (!jobForm.title || !jobForm.department || !jobForm.description) {
      alert('Please fill in required fields');
      return;
    }

    setJobFormLoading(true);
    const jobData = {
      ...jobForm,
      salary: {
        min: parseInt(jobForm.salary.min) || 0,
        max: parseInt(jobForm.salary.max) || 0,
        currency: jobForm.salary.currency
      },
      skills: jobForm.skills.filter(skill => skill.trim()),
      requirements: jobForm.requirements.filter(req => req.trim()),
      responsibilities: jobForm.responsibilities.filter(resp => resp.trim())
    };

    const result = await createJob(jobData);
    if (result.success) {
      setShowJobForm(false);
      resetJobForm();
      await fetchJobs(); // Refresh job list
      await fetchDashboardStats(); // Refresh stats
    }
    setJobFormLoading(false);
  };

  const resetJobForm = () => {
    setJobForm({
      title: '', department: '', description: '', location: '',
      jobType: 'full-time', experienceLevel: 'mid',
      salary: { min: '', max: '', currency: 'GHS' },
      skills: [''], requirements: [''], responsibilities: ['']
    });
  };

  const handleApplicationStatusUpdate = async (applicationId, newStatus, additionalData = {}) => {
    const statusData = { status: newStatus, ...additionalData };
    const result = await updateApplicationStatus(applicationId, statusData);
    if (result.success) {
      await fetchDashboardStats(); // Refresh stats
    }
  };

  const addArrayField = (fieldName) => {
    setJobForm({
      ...jobForm,
      [fieldName]: [...jobForm[fieldName], '']
    });
  };

  const updateArrayField = (fieldName, index, value) => {
    const newArray = [...jobForm[fieldName]];
    newArray[index] = value;
    setJobForm({ ...jobForm, [fieldName]: newArray });
  };

  const removeArrayField = (fieldName, index) => {
    const newArray = jobForm[fieldName].filter((_, i) => i !== index);
    setJobForm({ ...jobForm, [fieldName]: newArray });
  };

  const addCultureItem = () => {
    setProfileForm({
      ...profileForm,
      culture: [...(profileForm.culture || []), '']
    });
  };

  const updateCultureItem = (index, value) => {
    const newCulture = [...(profileForm.culture || [])];
    newCulture[index] = value;
    setProfileForm({ ...profileForm, culture: newCulture });
  };

  const removeCultureItem = (index) => {
    const newCulture = (profileForm.culture || []).filter((_, i) => i !== index);
    setProfileForm({ ...profileForm, culture: newCulture });
  };

  const addBenefitItem = () => {
    setProfileForm({
      ...profileForm,
      benefits: [...(profileForm.benefits || []), '']
    });
  };

  const updateBenefitItem = (index, value) => {
    const newBenefits = [...(profileForm.benefits || [])];
    newBenefits[index] = value;
    setProfileForm({ ...profileForm, benefits: newBenefits });
  };

  const removeBenefitItem = (index) => {
    const newBenefits = (profileForm.benefits || []).filter((_, i) => i !== index);
    setProfileForm({ ...profileForm, benefits: newBenefits });
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'company', label: 'Company Profile', icon: Building2 },
    { id: 'jobs', label: 'Job Postings', icon: FileText },
    { id: 'candidates', label: 'Applications', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  // Responsive styles
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const sidebarStyle = {
    width: isMobile ? (isMobileMenuOpen ? '280px' : '0') : isTablet ? '240px' : '280px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    zIndex: 50,
    overflow: 'hidden',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRight: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column'
  };

  const mainContentStyle = {
    flex: 1,
    marginLeft: isMobile ? '0' : isTablet ? '240px' : '280px',
    height: '100vh',
    overflow: 'auto',
    padding: isMobile ? '16px' : isTablet ? '24px' : '32px'
  };

  if (employerLoading && !companyProfile) {
    return <LoadingSpinner size="large" message="Loading your company profile..." />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {employerError && (
              <ErrorMessage 
                error={employerError} 
                onRetry={() => fetchDashboardStats()}
              />
            )}
            
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr 1fr' : '1fr 1fr 1fr 1fr 1fr 1fr',
              gap: '20px'
            }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setActiveSection('jobs')}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6' }}>
                    {dashboardStats?.totalJobs || 0}
                  </div>
                  <FileText size={24} color="#3b82f6" style={{ opacity: 0.7 }} />
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', textTransform: 'uppercase' }}>
                  TOTAL JOBS
                </div>
              </div>

              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>
                    {dashboardStats?.activeJobs || 0}
                  </div>
                  <TrendingUp size={24} color="#10b981" style={{ opacity: 0.7 }} />
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', textTransform: 'uppercase' }}>
                  ACTIVE JOBS
                </div>
              </div>

              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setActiveSection('candidates')}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ef4444' }}>
                    {dashboardStats?.totalApplications || 0}
                  </div>
                  <Users size={24} color="#ef4444" style={{ opacity: 0.7 }} />
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', textTransform: 'uppercase' }}>
                  APPLICATIONS
                </div>
              </div>

              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#8b5cf6' }}>
                    {dashboardStats?.interviewsScheduled || 0}
                  </div>
                  <UserCheck size={24} color="#8b5cf6" style={{ opacity: 0.7 }} />
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', textTransform: 'uppercase' }}>
                  INTERVIEWS
                </div>
              </div>

              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '4px' }}>
                  {dashboardStats?.hiredThisMonth || 0}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', textTransform: 'uppercase' }}>
                  HIRED THIS MONTH
                </div>
              </div>

              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#06b6d4', marginBottom: '4px' }}>
                  {dashboardStats?.responseRate || '0%'}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', textTransform: 'uppercase' }}>
                  RESPONSE RATE
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: isMobile ? '24px' : '32px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
                Recent Activity
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {dashboardStats?.recentActivity?.slice(0, 5).map((activity, index) => (
                  <div key={activity.id || index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ fontSize: '24px' }}>
                      {activity.type === 'application' ? '📋' : activity.type === 'interview' ? '👥' : '🎉'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', margin: '0 0 4px 0' }}>
                        {activity.title}
                      </h4>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 4px 0' }}>
                        {activity.description}
                      </p>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                )) || (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: isMobile ? '24px' : '32px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>
                Quick Actions
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
                gap: '20px'
              }}>
                <button
                  onClick={() => setShowJobForm(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 24px',
                    backgroundColor: '#3b82f6',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}
                >
                  <Plus size={16} />
                  Post New Job
                </button>
                <button
                  onClick={() => setActiveSection('candidates')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 24px',
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}
                >
                  <Eye size={16} />
                  Review Applications
                </button>
                <button
                  onClick={() => setActiveSection('analytics')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 24px',
                    backgroundColor: '#8b5cf6',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}
                >
                  <TrendingUp size={16} />
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        );

      case 'company':
        return (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: isMobile ? '24px' : '40px'
          }}>
            {employerError && (
              <ErrorMessage 
                error={employerError} 
                onRetry={() => fetchProfile()}
              />
            )}
            
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '40px',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '20px'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '24px',
                flexDirection: isMobile ? 'column' : 'row',
                textAlign: isMobile ? 'center' : 'left'
              }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  border: '4px solid #e2e8f0'
                }}>
                  {companyProfile?.logo ? (
                    <img 
                      src={`${import.meta.env.VITE_API_URL || 'http://localhost:7000'}/${companyProfile.logo.path}`} 
                      alt="Company Logo" 
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    '🏢'
                  )}
                </div>
                <div>
                  <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 8px 0' }}>
                    {companyProfile?.companyName || 'Loading...'}
                  </h2>
                  <p style={{ color: '#3b82f6', fontWeight: '600', fontSize: '18px', margin: '0 0 6px 0' }}>
                    {companyProfile?.industry || 'Industry not set'}
                  </p>
                  <p style={{ color: '#64748b', fontSize: '16px', margin: '0' }}>
                    {companyProfile?.location?.city && companyProfile?.location?.country ? 
                      `${companyProfile.location.city}, ${companyProfile.location.country}` : 
                      'Location not set'}
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', flexDirection: isMobile ? 'row' : 'column' }}>
                <button
                  onClick={() => setEditMode(!editMode)}
                  style={{
                    padding: '12px',
                    backgroundColor: editMode ? '#10b981' : '#f8fafc',
                    color: editMode ? 'white' : '#94a3b8',
                    border: '2px solid #e2e8f0',
                    borderRadius: '50%',
                    cursor: 'pointer'
                  }}
                >
                  <Edit style={{ width: '24px', height: '24px' }} />
                </button>
                
                <label style={{
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  color: '#94a3b8',
                  border: '2px solid #e2e8f0',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'inline-block'
                }}>
                  <Upload style={{ width: '24px', height: '24px' }} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    style={{ display: 'none' }}
                    disabled={uploadingLogo}
                  />
                </label>
              </div>
            </div>

            {uploadingLogo && <LoadingSpinner message="Uploading logo..." />}

            {editMode ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#374151', 
                      marginBottom: '6px' 
                    }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.companyName}
                      onChange={(e) => setProfileForm({ ...profileForm, companyName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#374151', 
                      marginBottom: '6px' 
                    }}>
                      Industry
                    </label>
                    <input
                      type="text"
                      value={profileForm.industry}
                      onChange={(e) => setProfileForm({ ...profileForm, industry: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#374151', 
                    marginBottom: '6px' 
                  }}>
                    Description
                  </label>
                  <textarea
                    value={profileForm.description}
                    onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      resize: 'vertical'
                    }}
                    placeholder="Describe your company..."
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '32px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                      Company Culture
                    </label>
                    {(profileForm.culture || []).map((item, index) => (
                      <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateCultureItem(index, e.target.value)}
                          style={{
                            flex: 1,
                            padding: '10px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '6px'
                          }}
                          placeholder="Culture value"
                        />
                        <button
                          onClick={() => removeCultureItem(index)}
                          style={{
                            padding: '10px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addCultureItem}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Add Culture Item
                    </button>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                      Benefits & Perks
                    </label>
                    {(profileForm.benefits || []).map((item, index) => (
                      <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateBenefitItem(index, e.target.value)}
                          style={{
                            flex: 1,
                            padding: '10px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '6px'
                          }}
                          placeholder="Benefit or perk"
                        />
                        <button
                          onClick={() => removeBenefitItem(index)}
                          style={{
                            padding: '10px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addBenefitItem}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Add Benefit
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setEditMode(false)}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProfileUpdate}
                    disabled={employerLoading}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: employerLoading ? 'not-allowed' : 'pointer',
                      fontWeight: '600',
                      opacity: employerLoading ? 0.7 : 1
                    }}
                  >
                    {employerLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '16px', fontSize: '20px' }}>
                    About Company
                  </h3>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0'
                  }}>
                    <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                      {companyProfile?.description || 'No description added yet.'}
                    </p>
                  </div>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
                  gap: '20px',
                  marginBottom: '32px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0'
                  }}>
                    <Phone style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
                    <span style={{ color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                      {companyProfile?.phone || 'No phone number'}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0'
                  }}>
                    <Mail style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
                    <span style={{ color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                      {user?.email}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0'
                  }}>
                    <Globe style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
                    <span style={{ color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                      {companyProfile?.website || 'No website'}
                    </span>
                  </div>
                </div>

                {/* Company Culture & Benefits */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '32px'
                }}>
                  <div>
                    <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '16px', fontSize: '20px' }}>
                      Company Culture
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {companyProfile?.culture?.length > 0 ? (
                        companyProfile.culture.map((item, index) => (
                          <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px',
                            backgroundColor: '#f0fdf4',
                            borderRadius: '8px',
                            border: '1px solid #dcfce7'
                          }}>
                            <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                            <span style={{ color: '#374151', fontSize: '14px' }}>{item}</span>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: '#64748b' }}>No culture values added yet.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '16px', fontSize: '20px' }}>
                      Benefits & Perks
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {companyProfile?.benefits?.length > 0 ? (
                        companyProfile.benefits.map((item, index) => (
                          <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px',
                            backgroundColor: '#fef3c7',
                            borderRadius: '8px',
                            border: '1px solid #fde68a'
                          }}>
                            <div style={{ width: '8px', height: '8px', backgroundColor: '#f59e0b', borderRadius: '50%' }}></div>
                            <span style={{ color: '#374151', fontSize: '14px' }}>{item}</span>
                          </div>
                        ))
                      ) : (
                        <p style={{ color: '#64748b' }}>No benefits added yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'jobs':
        return (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: isMobile ? '24px' : '40px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Job Postings</h2>
              <button
                onClick={() => setShowJobForm(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 24px',
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                <Plus size={16} />
                Post New Job
              </button>
            </div>
            
            {employerLoading && <LoadingSpinner message="Loading jobs..." />}
            {employerError && <ErrorMessage error={employerError} onRetry={() => fetchJobs()} />}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {companyJobs.length > 0 ? (
                companyJobs.map((job) => (
                  <div key={job._id} style={{
                    border: '2px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '24px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start', 
                      marginBottom: '12px',
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: '12px' 
                    }}>
                      <h3 style={{ fontWeight: '700', fontSize: '20px', color: '#1e293b', margin: 0 }}>
                        {job.title}
                      </h3>
                      <span style={{
                        padding: '6px 16px',
                        borderRadius: '25px',
                        fontSize: '12px',
                        fontWeight: '700',
                        backgroundColor: job.status === 'active' ? '#dcfce7' : '#fef2f2',
                        color: job.status === 'active' ? '#166534' : '#dc2626',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {job.status}
                      </span>
                    </div>
                    <p style={{ color: '#374151', fontWeight: '600', fontSize: '18px', margin: '0 0 12px 0' }}>
                      {job.department}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '20px', 
                      fontSize: '14px', 
                      color: '#64748b', 
                      marginBottom: '12px',
                      flexWrap: 'wrap' 
                    }}>
                      <span>📍 {job.location}</span>
                      <span>💼 {job.jobType}</span>
                      <span>💰 {job.salary?.min} - {job.salary?.max} {job.salary?.currency}</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '20px', 
                      fontSize: '14px', 
                      color: '#64748b', 
                      marginBottom: '12px',
                      flexWrap: 'wrap' 
                    }}>
                      <span>👥 {job.applicationsCount || 0} applications</span>
                      <span>👁️ {job.views || 0} views</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>No jobs posted yet</p>
                  <p>Create your first job posting to start receiving applications.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'candidates':
        return (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: isMobile ? '24px' : '40px'
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '32px' }}>
              Candidate Applications
            </h2>
            
            {employerLoading && <LoadingSpinner message="Loading applications..." />}
            {employerError && <ErrorMessage error={employerError} onRetry={() => fetchApplications()} />}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {applications.length > 0 ? (
                applications.map((application) => (
                  <div key={application._id} style={{
                    border: '2px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '24px',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '16px',
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: '16px' 
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <div style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: '#f1f5f9',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px',
                            border: '2px solid #e2e8f0'
                          }}>
                            👤
                          </div>
                          <div>
                            <h3 style={{ fontWeight: '700', fontSize: '18px', color: '#1e293b', margin: 0 }}>
                              {application.jobSeekerId?.firstName} {application.jobSeekerId?.lastName}
                            </h3>
                            <p style={{ color: '#3b82f6', fontSize: '14px', margin: 0, fontWeight: '600' }}>
                              Applied for {application.jobId?.title}
                            </p>
                          </div>
                        </div>
                        
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '16px', 
                          marginBottom: '12px',
                          flexWrap: 'wrap' 
                        }}>
                          <span style={{ fontSize: '14px', color: '#64748b' }}>
                            💼 {application.jobSeekerId?.experience?.[0]?.position || 'Experience not specified'}
                          </span>
                          <span style={{ fontSize: '14px', color: '#64748b' }}>
                            ⭐ {application.rating || 'Not rated'}/5.0
                          </span>
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                            Applied {new Date(application.appliedAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {application.jobSeekerId?.skills?.slice(0, 3).map((skill, skillIndex) => (
                            <span key={skillIndex} style={{
                              padding: '4px 12px',
                              backgroundColor: '#eff6ff',
                              color: '#1e40af',
                              borderRadius: '16px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                        <span style={{
                          padding: '8px 16px',
                          borderRadius: '25px',
                          fontSize: '12px',
                          fontWeight: '700',
                          backgroundColor: getApplicationStatusColor(application.status).bg,
                          color: getApplicationStatusColor(application.status).text,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {application.status.replace('-', ' ')}
                        </span>
                        
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {application.status === 'applied' && (
                            <>
                              <button 
                                onClick={() => handleApplicationStatusUpdate(application._id, 'under-review')}
                                style={{
                                  padding: '8px 16px',
                                  backgroundColor: '#f59e0b',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  cursor: 'pointer'
                                }}
                              >
                                Review
                              </button>
                              <button 
                                onClick={() => handleApplicationStatusUpdate(application._id, 'rejected', {
                                  rejectionReason: 'Not a good fit for this role'
                                })}
                                style={{
                                  padding: '8px 16px',
                                  backgroundColor: '#ef4444',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  cursor: 'pointer'
                                }}
                              >
                                Reject
                              </button>
                            </>
                          )}
                          
                          {application.status === 'under-review' && (
                            <>
                              <button 
                                onClick={() => handleApplicationStatusUpdate(application._id, 'shortlisted')}
                                style={{
                                  padding: '8px 16px',
                                  backgroundColor: '#8b5cf6',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  cursor: 'pointer'
                                }}
                              >
                                Shortlist
                              </button>
                              <button 
                                onClick={() => handleApplicationStatusUpdate(application._id, 'rejected', {
                                  rejectionReason: 'Did not meet requirements'
                                })}
                                style={{
                                  padding: '8px 16px',
                                  backgroundColor: '#ef4444',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  cursor: 'pointer'
                                }}
                              >
                                Reject
                              </button>
                            </>
                          )}
                          
                          {application.status === 'shortlisted' && (
                            <button 
                              onClick={() => handleApplicationStatusUpdate(application._id, 'interview-scheduled', {
                                interviewDetails: {
                                  scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                                  interviewType: 'video',
                                  notes: 'Initial screening interview'
                                }
                              })}
                              style={{
                                padding: '8px 16px',
                                backgroundColor: '#3b82f6',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              Schedule Interview
                            </button>
                          )}
                          
                          {application.status === 'interview-scheduled' && (
                            <button 
                              onClick={() => handleApplicationStatusUpdate(application._id, 'interviewed')}
                              style={{
                                padding: '8px 16px',
                                backgroundColor: '#10b981',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              Mark Interviewed
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>No applications yet</p>
                  <p>Applications will appear here once candidates start applying to your jobs.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: isMobile ? '24px' : '40px'
            }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '32px' }}>
                Hiring Analytics
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
                gap: '20px',
                marginBottom: '32px'
              }}>
                <div style={{
                  textAlign: 'center',
                  padding: '24px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>67%</div>
                  <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Application Success Rate</div>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '24px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>14</div>
                  <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Days Avg. Time to Hire</div>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '24px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444', marginBottom: '8px' }}>89%</div>
                  <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Interview Show Rate</div>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '24px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '8px' }}>4.2</div>
                  <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Avg. Candidate Rating</div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
                  Top Performing Job Categories
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { category: 'Software Development', applications: 45, percentage: 85 },
                    { category: 'Product Management', applications: 28, percentage: 72 },
                    { category: 'Design', applications: 31, percentage: 68 },
                    { category: 'Marketing', applications: 22, percentage: 55 }
                  ].map((item, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                          {item.category}
                        </div>
                        <div style={{ fontSize: '14px', color: '#64748b' }}>
                          {item.applications} applications
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '100px',
                          height: '8px',
                          backgroundColor: '#e2e8f0',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${item.percentage}%`,
                            height: '100%',
                            backgroundColor: '#3b82f6',
                            borderRadius: '4px'
                          }}></div>
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#3b82f6' }}>
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getApplicationStatusColor = (status) => {
    switch (status) {
      case 'applied':
        return { bg: '#dbeafe', text: '#1e40af' };
      case 'under-review':
        return { bg: '#fef3c7', text: '#92400e' };
      case 'shortlisted':
        return { bg: '#f3e8ff', text: '#7c3aed' };
      case 'interview-scheduled':
        return { bg: '#dcfce7', text: '#166534' };
      case 'interviewed':
        return { bg: '#e0f2fe', text: '#0369a1' };
      case 'rejected':
        return { bg: '#fef2f2', text: '#dc2626' };
      case 'hired':
        return { bg: '#d1fae5', text: '#059669' };
      default:
        return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  // Job Form Modal
  if (showJobForm) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: '32px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
              Post New Job
            </h3>
            <button
              onClick={() => setShowJobForm(false)}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              <X size={24} />
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Job Title *
                </label>
                <input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Department *
                </label>
                <input
                  type="text"
                  value={jobForm.department}
                  onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                  placeholder="e.g. Engineering"
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                Job Description *
              </label>
              <textarea
                value={jobForm.description}
                onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  resize: 'vertical'
                }}
                placeholder="Describe the role, responsibilities, and what you're looking for..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Location
                </label>
                <input
                  type="text"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                  placeholder="e.g. Accra, Ghana"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Job Type
                </label>
                <select
                  value={jobForm.jobType}
                  onChange={(e) => setJobForm({ ...jobForm, jobType: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Experience Level
                </label>
                <select
                  value={jobForm.experienceLevel}
                  onChange={(e) => setJobForm({ ...jobForm, experienceLevel: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="entry">Entry Level</option>
                  <option value="junior">Junior</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Currency
                </label>
                <select
                  value={jobForm.salary.currency}
                  onChange={(e) => setJobForm({ 
                    ...jobForm, 
                    salary: { ...jobForm.salary, currency: e.target.value }
                  })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="GHS">GHS (Ghanaian Cedi)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Minimum Salary
                </label>
                <input
                  type="number"
                  value={jobForm.salary.min}
                  onChange={(e) => setJobForm({ 
                    ...jobForm, 
                    salary: { ...jobForm.salary, min: e.target.value }
                  })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                  placeholder="3000"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>
                  Maximum Salary
                </label>
                <input
                  type="number"
                  value={jobForm.salary.max}
                  onChange={(e) => setJobForm({ 
                    ...jobForm, 
                    salary: { ...jobForm.salary, max: e.target.value }
                  })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                  placeholder="5000"
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                Skills Required
              </label>
              {jobForm.skills.map((skill, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateArrayField('skills', index, e.target.value)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                    placeholder="Enter a skill"
                  />
                  {jobForm.skills.length > 1 && (
                    <button
                      onClick={() => removeArrayField('skills', index)}
                      style={{
                        padding: '12px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayField('skills')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Add Skill
              </button>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                Job Requirements
              </label>
              {jobForm.requirements.map((requirement, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => updateArrayField('requirements', index, e.target.value)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                    placeholder="Enter a requirement"
                  />
                  {jobForm.requirements.length > 1 && (
                    <button
                      onClick={() => removeArrayField('requirements', index)}
                      style={{
                        padding: '12px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayField('requirements')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Add Requirement
              </button>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                Key Responsibilities
              </label>
              {jobForm.responsibilities.map((responsibility, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={responsibility}
                    onChange={(e) => updateArrayField('responsibilities', index, e.target.value)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                    placeholder="Enter a responsibility"
                  />
                  {jobForm.responsibilities.length > 1 && (
                    <button
                      onClick={() => removeArrayField('responsibilities', index)}
                      style={{
                        padding: '12px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addArrayField('responsibilities')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Add Responsibility
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowJobForm(false)}
                disabled={jobFormLoading}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: jobFormLoading ? 'not-allowed' : 'pointer',
                  fontWeight: '600'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleJobSubmit}
                disabled={jobFormLoading}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: jobFormLoading ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  opacity: jobFormLoading ? 0.7 : 1
                }}
              >
                {jobFormLoading ? 'Creating...' : 'Create Job'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 45
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={{ padding: isMobile ? '20px' : '24px', borderBottom: '1px solid #e2e8f0' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', lineHeight: '28px', margin: 0 }}>
            <span style={{ color: '#1e293b' }}>Hire</span>
            <span style={{ color: '#3b82f6' }}>HAVEN</span>
          </h1>
        </div>
        
        <nav style={{ 
          padding: '16px', 
          flex: 1, 
          overflowY: 'auto',
          overflowX: 'hidden'
        }}>
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  if (isMobile) setIsMobileMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 18px',
                  textAlign: 'left',
                  borderRadius: '12px',
                  marginBottom: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: isActive ? '#eff6ff' : 'transparent',
                  color: isActive ? '#1d4ed8' : '#374151',
                  fontWeight: isActive ? '600' : '500',
                  fontSize: '14px',
                  borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent'
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div style={{ 
          padding: '16px',
          borderTop: '1px solid #e2e8f0',
          flexShrink: 0
        }}>
          <button 
            onClick={logout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 18px',
              color: '#374151',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px'
            }}
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Mobile Header */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              style={{
                padding: '12px',
                backgroundColor: '#ffffff',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ width: '20px', height: '3px', backgroundColor: '#374151', borderRadius: '2px' }}></div>
                <div style={{ width: '20px', height: '3px', backgroundColor: '#374151', borderRadius: '2px' }}></div>
                <div style={{ width: '20px', height: '3px', backgroundColor: '#374151', borderRadius: '2px' }}></div>
              </div>
            </button>
            <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1e293b', margin: 0, textTransform: 'capitalize' }}>
              {activeSection}
            </h1>
            <div style={{ width: '44px' }}></div>
          </div>
        )}

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {!isMobile && (
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                color: '#1e293b', 
                textTransform: 'capitalize', 
                margin: '0 0 6px 0'
              }}>
                {activeSection}
              </h1>
              <p style={{ color: '#64748b', margin: 0, fontSize: '18px' }}>
                Employer Dashboard
              </p>
            </div>
          )}
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;