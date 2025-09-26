import React, { useState, useEffect } from 'react';
import { User, Briefcase, FileText, Heart, LogOut, Edit, Phone, Mail, Linkedin, Upload } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useJobSeeker } from '../../hooks/useJobSeeker';
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ErrorMessage } from "../../components/ErrorMessage"; // correct path

const JobSeekerDashboard = () => {
  const { user, logout, updateProfile: updateAuthProfile } = useAuth();
  const {
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
    fetchSavedJobs
  } = useJobSeeker();

  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({});
  const [uploadingFiles, setUploadingFiles] = useState(false);

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

  // Fetch data when component mounts
  useEffect(() => {
    const loadData = async () => {
      await fetchProfile();
      await fetchDashboardStats();
      
      if (activeSection === 'vacancy') {
        await fetchApplications();
      } else if (activeSection === 'favorite') {
        await fetchSavedJobs();
      }
    };

    loadData();
  }, [activeSection]);

  // Initialize profile form when profile is loaded
  useEffect(() => {
    if (profile && !editMode) {
      setProfileForm({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        location: profile.location || '',
        bio: profile.bio || '',
        skills: profile.skills || [],
        socialLinks: profile.socialLinks || {}
      });
    }
  }, [profile, editMode]);

  const handleProfileUpdate = async () => {
    const result = await updateProfile(profileForm);
    if (result.success) {
      setEditMode(false);
      updateAuthProfile(result.data);
    }
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    setUploadingFiles(true);
    const uploadData = {};
    
    Array.from(files).forEach(file => {
      if (file.type.includes('pdf')) {
        uploadData.resume = file;
      } else if (file.type.includes('image')) {
        uploadData.profilePicture = file;
      }
    });

    const result = await uploadFiles(uploadData);
    setUploadingFiles(false);
    
    if (!result.success) {
      console.error('Upload failed:', result.error);
    }
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...profileForm.skills];
    newSkills[index] = value;
    setProfileForm({ ...profileForm, skills: newSkills });
  };

  const addSkill = () => {
    setProfileForm({ ...profileForm, skills: [...profileForm.skills, ''] });
  };

  const removeSkill = (index) => {
    const newSkills = profileForm.skills.filter((_, i) => i !== index);
    setProfileForm({ ...profileForm, skills: newSkills });
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'vacancy', label: 'Applications', icon: Briefcase },
    { id: 'details', label: 'Details', icon: FileText },
    { id: 'favorite', label: 'Saved Jobs', icon: Heart }
  ];

  // Responsive styles
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;

  const containerStyle = {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
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
    backgroundColor: '#f8fafc'
  };

  const contentInnerStyle = {
    padding: isMobile ? '16px' : isTablet ? '24px' : '32px',
    minHeight: '100%'
  };

  if (loading && !profile) {
    return <LoadingSpinner size="large" message="Loading your profile..." />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {error && (
              <ErrorMessage 
                error={error} 
                onRetry={() => fetchDashboardStats()}
                onDismiss={() => {/* Clear error */}}
              />
            )}
            
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr 1fr' : '1fr 1fr 1fr 1fr 1fr',
              gap: '20px'
            }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '4px' }}>
                  {dashboardStats?.totalApplications || 0}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>APPLICATIONS</div>
              </div>
              
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>
                  {dashboardStats?.interviewsScheduled || 0}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>INTERVIEWS</div>
              </div>
              
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ef4444', marginBottom: '4px' }}>
                  {dashboardStats?.savedJobs || 0}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>SAVED JOBS</div>
              </div>
              
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '4px' }}>
                  {dashboardStats?.profileViews || 0}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>PROFILE VIEWS</div>
              </div>
              
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '4px' }}>
                  {dashboardStats?.responseRate || '0%'}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>RESPONSE RATE</div>
              </div>
            </div>

            {/* Recent Applications */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: isMobile ? '24px' : '32px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Recent Applications</h3>
                <button
                  onClick={() => setActiveSection('vacancy')}
                  style={{
                    color: '#3b82f6',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  View All →
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {dashboardStats?.recentApplications?.slice(0, 3).map((app) => (
                  <div key={app.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: '0 0 4px 0' }}>
                        {app.jobTitle}
                      </h4>
                      <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 4px 0' }}>{app.companyName}</p>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Applied {new Date(app.appliedAt).toLocaleDateString()}</p>
                    </div>
                    <span style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: app.status === 'under-review' ? '#dbeafe' : 
                                     app.status === 'interview-scheduled' ? '#dcfce7' : '#fef3c7',
                      color: app.status === 'under-review' ? '#1e40af' : 
                             app.status === 'interview-scheduled' ? '#166534' : '#92400e'
                    }}>
                      {app.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                ))}
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
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>Quick Actions</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '20px'
              }}>
                <button
                  onClick={() => setActiveSection('profile')}
                  style={{
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
                  Update Profile
                </button>
                <button
                  onClick={() => setActiveSection('favorite')}
                  style={{
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
                  Browse Saved Jobs
                </button>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: isMobile ? '24px' : '40px'
          }}>
            {error && (
              <ErrorMessage 
                error={error} 
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexDirection: isMobile ? 'column' : 'row' }}>
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
                  {profile?.profilePicture ? (
                    <img 
                      src={`${import.meta.env.VITE_API_URL || 'http://localhost:6000/api'}/${profile.profilePicture.path}`} 
                      alt="Profile" 
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    '👤'
                  )}
                </div>
                <div>
                  <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 8px 0' }}>
                    {profile ? `${profile.firstName} ${profile.lastName}` : 'Loading...'}
                  </h2>
                  <p style={{ color: '#3b82f6', fontWeight: '600', fontSize: '18px', margin: '0 0 6px 0' }}>Job Seeker</p>
                  <p style={{ color: '#64748b', fontSize: '16px', margin: '0' }}>{profile?.location || 'Location not set'}</p>
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
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
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
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}>
                  <Upload style={{ width: '24px', height: '24px' }} />
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    disabled={uploadingFiles}
                  />
                </label>
              </div>
            </div>

            {uploadingFiles && <LoadingSpinner message="Uploading files..." />}

            {editMode ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.firstName}
                      onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
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
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.lastName}
                      onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
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
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                    Bio
                  </label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      resize: 'vertical'
                    }}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                    Skills
                  </label>
                  {profileForm.skills.map((skill, index) => (
                    <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '8px',
                          fontSize: '16px'
                        }}
                        placeholder="Enter a skill"
                      />
                      <button
                        onClick={() => removeSkill(index)}
                        style={{
                          padding: '12px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addSkill}
                    style={{
                      padding: '12px 16px',
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
                    disabled={loading}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontWeight: '600',
                      opacity: loading ? 0.7 : 1
                    }}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '16px', fontSize: '20px' }}>Bio</h3>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0'
                  }}>
                    <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                      {profile?.bio || 'No bio added yet.'}
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '16px', fontSize: '20px' }}>Skills</h3>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0'
                  }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {profile?.skills?.length > 0 ? (
                        profile.skills.map((skill, index) => (
                          <span key={index} style={{
                            padding: '6px 12px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            borderRadius: '16px',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}>
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p style={{ color: '#64748b', margin: 0 }}>No skills added yet.</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
                  gap: '20px'
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
                      {profile?.phone || 'No phone number'}
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
                    <Linkedin style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
                    <span style={{ color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                      {profile?.socialLinks?.linkedin || 'No LinkedIn'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'vacancy':
        return (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: isMobile ? '24px' : '40px'
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '32px' }}>
              My Applications
            </h2>
            
            {loading && <LoadingSpinner message="Loading applications..." />}
            {error && <ErrorMessage error={error} onRetry={() => fetchApplications()} />}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {applications.length > 0 ? (
                applications.map((application) => (
                  <div key={application._id} style={{
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
                        {application.jobId?.title}
                      </h3>
                      <span style={{
                        padding: '6px 16px',
                        borderRadius: '25px',
                        fontSize: '12px',
                        fontWeight: '700',
                        backgroundColor: getStatusColor(application.status).bg,
                        color: getStatusColor(application.status).text,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {application.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p style={{ color: '#374151', fontWeight: '600', fontSize: '18px', margin: '0 0 12px 0' }}>
                      {application.jobId?.employerId?.companyName}
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
                      <span>📍 {application.jobId?.location}</span>
                      <span>💼 {application.jobId?.jobType}</span>
                      <span>💰 {application.jobId?.salary?.min} - {application.jobId?.salary?.max} {application.jobId?.salary?.currency}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                      Applied {new Date(application.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>No applications yet</p>
                  <p>Start applying to jobs to see your applications here.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'favorite':
        return (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: isMobile ? '24px' : '40px'
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '32px' }}>
              Saved Jobs
            </h2>
            
            {loading && <LoadingSpinner message="Loading saved jobs..." />}
            {error && <ErrorMessage error={error} onRetry={() => fetchSavedJobs()} />}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {savedJobs.length > 0 ? (
                savedJobs.map((savedJob) => (
                  <div key={savedJob._id} style={{
                    border: '2px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '24px',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: '20px' 
                    }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontWeight: '700', fontSize: '20px', color: '#1e293b', margin: '0 0 6px 0' }}>
                          {savedJob.jobId?.title}
                        </h3>
                        <p style={{ color: '#374151', fontWeight: '600', fontSize: '18px', margin: '0 0 6px 0' }}>
                          {savedJob.jobId?.employerId?.companyName}
                        </p>
                        <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 12px 0' }}>
                          📍 {savedJob.jobId?.location}
                        </p>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                          Saved {new Date(savedJob.savedAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexShrink: 0 }}>
                        <div style={{
                          padding: '12px',
                          borderRadius: '50%',
                          backgroundColor: '#fef2f2',
                          cursor: 'pointer'
                        }}>
                          <Heart style={{ width: '20px', height: '20px', color: '#ef4444', fill: '#ef4444' }} />
                        </div>
                        <button style={{
                          padding: '12px 20px',
                          backgroundColor: '#3b82f6',
                          color: '#ffffff',
                          borderRadius: '8px',
                          fontSize: '14px',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}>
                          Apply Now 🚀
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>No saved jobs yet</p>
                  <p>Save jobs you're interested in to find them here later.</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied':
        return { bg: '#dbeafe', text: '#1e40af' };
      case 'under-review':
        return { bg: '#fef3c7', text: '#92400e' };
      case 'interview-scheduled':
        return { bg: '#dcfce7', text: '#166534' };
      case 'rejected':
        return { bg: '#fef2f2', text: '#dc2626' };
      case 'hired':
        return { bg: '#d1fae5', text: '#059669' };
      default:
        return { bg: '#f3f4f6', text: '#374151' };
    }
  };

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
            zIndex: 40
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={{ 
          padding: isMobile ? '20px' : '24px',
          borderBottom: '1px solid #e2e8f0',
          flexShrink: 0
        }}>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', lineHeight: '28px', margin: 0 }}>
            <span style={{ color: '#1e293b' }}>Hire</span>
            <span style={{ color: '#3b82f6' }}>HAVEN</span>
          </h1>
        </div>
        
        <nav style={{ 
          padding: '16px',
          flex: 1,
          overflowY: 'auto'
        }}>
          {sidebarItems.map((item) => {
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
        <div style={contentInnerStyle}>
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
                  Job Seeker Dashboard
                </p>
              </div>
            )}
            
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;