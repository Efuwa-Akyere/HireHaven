import React, { useState, useEffect } from 'react';
import { User, Briefcase, FileText, Heart, LogOut, Edit, Phone, Mail, Linkedin } from 'lucide-react';

const JobSeekerDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
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

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'vacancy', label: 'Vacancy', icon: Briefcase },
    { id: 'details', label: 'Details', icon: FileText },
    { id: 'favorite', label: 'Favorite', icon: Heart }
  ];

  const profileData = {
    name: 'John Doe',
    role: 'Job Seeker',
    location: 'Abokobi, Accra, Ghana',
    skills: 'CSS, HTML, JAVASCRIPT, REACT',
    contact: '0245678901',
    email: 'john@gmail.com',
    linkedin: 'www.linkedin.com',
    avatar: '🤵🏽‍♂'
  };

  const vacancyData = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Solutions Ghana',
      location: 'Accra, Ghana',
      type: 'Full-time',
      salary: 'GHS 3,000 - 5,000',
      posted: '2 days ago',
      status: 'Applied'
    },
    {
      id: 2,
      title: 'React Developer',
      company: 'Digital Innovations Ltd',
      location: 'Kumasi, Ghana',
      type: 'Remote',
      salary: 'GHS 4,000 - 6,000',
      posted: '5 days ago',
      status: 'Pending'
    },
    {
      id: 3,
      title: 'Web Developer',
      company: 'StartUp Hub',
      location: 'Tema, Ghana',
      type: 'Contract',
      salary: 'GHS 2,500 - 4,000',
      posted: '1 week ago',
      status: 'Interview'
    }
  ];

  const detailsData = {
    experience: [
      {
        position: 'Junior Frontend Developer',
        company: 'WebCraft Agency',
        period: '2023 - Present',
        description: 'Developing responsive web applications using React and modern CSS'
      },
      {
        position: 'Web Development Intern',
        company: 'Digital Hub Ghana',
        period: '2022 - 2023',
        description: 'Built websites using HTML, CSS, and JavaScript for local businesses'
      }
    ],
    education: [
      {
        degree: 'BSc Computer Science',
        institution: 'University of Ghana',
        period: '2019 - 2023'
      }
    ],
    certifications: [
      'React Developer Certification - Meta',
      'JavaScript Algorithms - freeCodeCamp',
      'Responsive Web Design - freeCodeCamp'
    ]
  };

  // Dashboard metrics
  const dashboardStats = {
    totalApplications: 12,
    interviews: 3,
    saved: 8,
    profileViews: 24,
    responseRate: '65%'
  };

  const recentApplications = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Solutions Ghana',
      appliedDate: '2 days ago',
      status: 'Under Review'
    },
    {
      id: 2,
      title: 'React Developer',
      company: 'Digital Innovations Ltd',
      appliedDate: '5 days ago',
      status: 'Interview Scheduled'
    },
    {
      id: 3,
      title: 'Web Developer',
      company: 'StartUp Hub',
      appliedDate: '1 week ago',
      status: 'Applied'
    }
  ];
   
  const favoriteJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'Accra, Ghana',
      saved: '3 days ago'
    },
    {
      id: 2,
      title: 'UI/UX Developer',
      company: 'DesignStudio',
      location: 'Kumasi, Ghana',
      saved: '1 week ago'
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'DevSolutions',
      location: 'Tema, Ghana',
      saved: '2 days ago'
    }
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

  // Enhanced StatCard component with animations
  const StatCard = ({ value, label, color, delay = 0, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: isHovered ? '0 10px 25px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          border: '1px solid #e2e8f0',
          cursor: 'pointer',
          transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: `slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
          transition: 'left 0.6s ease',
          ...(isHovered && { left: '100%' })
        }} />
        <div style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: color, 
          marginBottom: '4px',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}>
          {value}
        </div>
        <div style={{ 
          fontSize: '12px', 
          color: '#64748b', 
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {label}
        </div>
      </div>
    );
  };

  // Enhanced ApplicationCard component
  const ApplicationCard = ({ app, delay = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          cursor: 'pointer',
          transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: `slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
          boxShadow: isHovered ? '0 8px 25px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>
          <h4 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 4px 0',
            transition: 'color 0.3s ease',
            ...(isHovered && { color: '#3b82f6' })
          }}>
            {app.title}
          </h4>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 4px 0' }}>{app.company}</p>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Applied {app.appliedDate}</p>
        </div>
        <span style={{
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          backgroundColor: app.status === 'Under Review' ? '#dbeafe' : 
                         app.status === 'Interview Scheduled' ? '#dcfce7' : '#fef3c7',
          color: app.status === 'Under Review' ? '#1e40af' : 
                 app.status === 'Interview Scheduled' ? '#166534' : '#92400e',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}>
          {app.status}
        </span>
      </div>
    );
  };

  // Enhanced ActionButton component
  const ActionButton = ({ children, onClick, primary = true, delay = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <button
        onClick={onClick}
        style={{
          padding: '16px 24px',
          backgroundColor: primary ? '#3b82f6' : '#10b981',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: `slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s both`,
          boxShadow: isHovered ? '0 8px 20px rgba(59, 130, 246, 0.4)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: isHovered ? 0 : '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transition: 'left 0.6s ease'
        }} />
        <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      </button>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr 1fr' : '1fr 1fr 1fr 1fr 1fr',
              gap: '20px'
            }}>
              <StatCard 
                value={dashboardStats.totalApplications} 
                label="Applications" 
                color="#3b82f6" 
                delay={0.1}
                onClick={() => setActiveSection('vacancy')}
              />
              <StatCard 
                value={dashboardStats.interviews} 
                label="Interviews" 
                color="#10b981" 
                delay={0.2}
              />
              <StatCard 
                value={dashboardStats.saved} 
                label="Saved Jobs" 
                color="#ef4444" 
                delay={0.3}
                onClick={() => setActiveSection('favorite')}
              />
              <StatCard 
                value={dashboardStats.profileViews} 
                label="Profile Views" 
                color="#8b5cf6" 
                delay={0.4}
                onClick={() => setActiveSection('profile')}
              />
              <StatCard 
                value={dashboardStats.responseRate} 
                label="Response Rate" 
                color="#f59e0b" 
                delay={0.5}
              />
            </div>

            {/* Recent Applications */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: isMobile ? '24px' : '32px',
              border: '1px solid #e2e8f0',
              animation: 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both'
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
                    fontWeight: '600',
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#eff6ff';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  View All →
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {recentApplications.map((app, index) => (
                  <ApplicationCard key={app.id} app={app} delay={0.1 * (index + 1)} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: isMobile ? '24px' : '32px',
              border: '1px solid #e2e8f0',
              animation: 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.8s both'
            }}>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>Quick Actions</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '20px'
              }}>
                <ActionButton onClick={() => setActiveSection('profile')} delay={0.1}>
                  🚀 Update Profile
                </ActionButton>
                <ActionButton onClick={() => setActiveSection('favorite')} primary={false} delay={0.2}>
                  💼 Browse Saved Jobs
                </ActionButton>
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
            padding: isMobile ? '24px' : '40px',
            animation: 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '40px',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexDirection: isMobile ? 'column' : 'row', textAlign: isMobile ? 'center' : 'left' }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  border: '4px solid #e2e8f0',
                  transition: 'transform 0.3s ease',
                  animation: 'bounceIn 0.8s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05) rotate(5deg)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
                >
                  {profileData.avatar}
                </div>
                <div>
                  <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 8px 0' }}>{profileData.name}</h2>
                  <p style={{ color: '#3b82f6', fontWeight: '600', fontSize: '18px', margin: '0 0 6px 0' }}>{profileData.role}</p>
                  <p style={{ color: '#64748b', fontSize: '16px', margin: '0' }}>{profileData.location}</p>
                </div>
              </div>
              <div style={{
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '2px solid #e2e8f0'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.transform = 'scale(1.1) rotate(15deg)';
                e.target.querySelector('svg').style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f8fafc';
                e.target.style.transform = 'scale(1) rotate(0deg)';
                e.target.querySelector('svg').style.color = '#94a3b8';
              }}
              >
                <Edit style={{ width: '24px', height: '24px', color: '#94a3b8', transition: 'color 0.3s ease' }} />
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
                <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>{profileData.skills}</p>
              </div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
              gap: '20px'
            }}>
              {[
                { icon: Phone, value: profileData.contact, href: `tel:${profileData.contact}` },
                { icon: Mail, value: profileData.email, href: `mailto:${profileData.email}` },
                { icon: Linkedin, value: profileData.linkedin, href: `https://${profileData.linkedin}` }
              ].map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    animation: `slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 * (index + 1)}s both`
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                  onClick={() => window.open(contact.href, '_blank')}
                  >
                    <Icon style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
                    <span style={{ color: '#374151', fontSize: '14px', fontWeight: '500' }}>{contact.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'vacancy':
        return (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: isMobile ? '24px' : '40px',
            animation: 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both'
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '32px' }}>Job Applications</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {vacancyData.map((job, index) => (
                <div key={job.id} style={{
                  border: '2px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  animation: `slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 * (index + 1)}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexDirection: isMobile ? 'column' : 'row', gap: '12px' }}>
                    <h3 style={{ fontWeight: '700', fontSize: '20px', color: '#1e293b', margin: 0 }}>{job.title}</h3>
                    <span style={{
                      padding: '6px 16px',
                      borderRadius: '25px',
                      fontSize: '12px',
                      fontWeight: '700',
                      backgroundColor: job.status === 'Applied' ? '#dbeafe' : job.status === 'Interview' ? '#dcfce7' : '#fef3c7',
                      color: job.status === 'Applied' ? '#1e40af' : job.status === 'Interview' ? '#166534' : '#92400e',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {job.status}
                    </span>
                  </div>
                  <p style={{ color: '#374151', fontWeight: '600', fontSize: '18px', margin: '0 0 12px 0' }}>{job.company}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '14px', color: '#64748b', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span>📍 {job.location}</span>
                    <span>💼 {job.type}</span>
                    <span>💰 {job.salary}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Posted {job.posted}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'details':
        return (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: isMobile ? '24px' : '40px',
            animation: 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both'
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '32px' }}>Professional Details</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div style={{
                animation: 'slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both'
              }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>Work Experience</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {detailsData.experience.map((exp, index) => (
                    <div key={index} style={{ 
                      borderLeft: '4px solid #3b82f6', 
                      paddingLeft: '20px',
                      padding: '20px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderLeftColor = '#1d4ed8';
                      e.target.style.backgroundColor = '#eff6ff';
                      e.target.style.transform = 'translateX(8px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderLeftColor = '#3b82f6';
                      e.target.style.backgroundColor = '#f8fafc';
                      e.target.style.transform = 'translateX(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                    >
                      <h4 style={{ fontWeight: '600', color: '#1e293b', fontSize: '18px', margin: '0 0 6px 0' }}>{exp.position}</h4>
                      <p style={{ color: '#3b82f6', fontSize: '16px', margin: '0 0 6px 0', fontWeight: '600' }}>{exp.company}</p>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 12px 0', fontWeight: '500' }}>{exp.period}</p>
                      <p style={{ color: '#475569', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                animation: 'slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both'
              }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>Education</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {detailsData.education.map((edu, index) => (
                    <div key={index} style={{ 
                      borderLeft: '4px solid #10b981', 
                      paddingLeft: '20px',
                      padding: '20px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderLeftColor = '#059669';
                      e.target.style.backgroundColor = '#dcfce7';
                      e.target.style.transform = 'translateX(8px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderLeftColor = '#10b981';
                      e.target.style.backgroundColor = '#f0fdf4';
                      e.target.style.transform = 'translateX(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                    >
                      <h4 style={{ fontWeight: '600', color: '#1e293b', fontSize: '18px', margin: '0 0 6px 0' }}>{edu.degree}</h4>
                      <p style={{ color: '#10b981', fontSize: '16px', margin: '0 0 6px 0', fontWeight: '600' }}>{edu.institution}</p>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, fontWeight: '500' }}>{edu.period}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                animation: 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both'
              }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>Certifications</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '16px'
                }}>
                  {detailsData.certifications.map((cert, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      padding: '16px',
                      backgroundColor: '#faf5ff',
                      borderRadius: '12px',
                      border: '2px solid #e9d5ff',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      animation: `slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 * (index + 1) + 0.6}s both`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#ede9fe';
                      e.target.style.borderColor = '#8b5cf6';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#faf5ff';
                      e.target.style.borderColor = '#e9d5ff';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                    >
                      <div style={{ 
                        width: '12px', 
                        height: '12px', 
                        backgroundColor: '#8b5cf6', 
                        borderRadius: '50%',
                        flexShrink: 0
                      }}></div>
                      <span style={{ color: '#475569', fontSize: '14px', fontWeight: '500' }}>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'favorite':
        return (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: isMobile ? '24px' : '40px',
            animation: 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both'
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '32px' }}>Saved Jobs</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {favoriteJobs.map((job, index) => (
                <div key={job.id} style={{
                  border: '2px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: `slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 * (index + 1)}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ef4444';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(239, 68, 68, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: '700', fontSize: '20px', color: '#1e293b', margin: '0 0 6px 0' }}>{job.title}</h3>
                      <p style={{ color: '#374151', fontWeight: '600', fontSize: '18px', margin: '0 0 6px 0' }}>{job.company}</p>
                      <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 12px 0' }}>📍 {job.location}</p>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Saved {job.saved}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{
                        padding: '12px',
                        borderRadius: '50%',
                        backgroundColor: '#fef2f2',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#ef4444';
                        e.target.style.transform = 'scale(1.1) rotate(10deg)';
                        e.target.querySelector('svg').style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#fef2f2';
                        e.target.style.transform = 'scale(1) rotate(0deg)';
                        e.target.querySelector('svg').style.color = '#ef4444';
                      }}
                      >
                        <Heart style={{ width: '20px', height: '20px', color: '#ef4444', fill: '#ef4444', transition: 'color 0.3s ease' }} />
                      </div>
                      <button style={{
                        padding: '12px 20px',
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                        borderRadius: '8px',
                        fontSize: '14px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#2563eb';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#3b82f6';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                      >
                        Apply Now 🚀
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translate3d(0, 40px, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translate3d(-40px, 0, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translate3d(40px, 0, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
          
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          /* Custom scrollbar for webkit browsers */
          *::-webkit-scrollbar {
            width: 6px;
          }
          
          *::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 3px;
          }
          
          *::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
          }
          
          *::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}
      </style>
      
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
            zIndex: 40,
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <div style={sidebarStyle}>
        {/* Logo/Brand */}
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
        
        {/* Navigation */}
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
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: isActive ? '#eff6ff' : 'transparent',
                  color: isActive ? '#1d4ed8' : '#374151',
                  fontWeight: isActive ? '600' : '500',
                  fontSize: '14px',
                  transform: isActive ? 'translateX(8px)' : 'translateX(0)',
                  borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
                  animation: `slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 * (index + 1)}s both`
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = '#f8fafc';
                    e.target.style.transform = 'translateX(4px)';
                    e.target.style.borderLeft = '3px solid #e2e8f0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'translateX(0)';
                    e.target.style.borderLeft = '3px solid transparent';
                  }
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div style={{ 
          padding: '16px',
          borderTop: '1px solid #e2e8f0',
          flexShrink: 0
        }}>
          <button 
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
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              fontWeight: '500',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#fef2f2';
              e.target.style.color = '#dc2626';
              e.target.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#374151';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Scrollable Main Content */}
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
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f8fafc';
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div style={{ width: '20px', height: '3px', backgroundColor: '#374151', borderRadius: '2px', transition: 'all 0.3s ease' }}></div>
                  <div style={{ width: '20px', height: '3px', backgroundColor: '#374151', borderRadius: '2px', transition: 'all 0.3s ease' }}></div>
                  <div style={{ width: '20px', height: '3px', backgroundColor: '#374151', borderRadius: '2px', transition: 'all 0.3s ease' }}></div>
                </div>
              </button>
              <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1e293b', margin: 0, textTransform: 'capitalize' }}>
                {activeSection}
              </h1>
              <div style={{ width: '44px' }}></div> {/* Spacer for centering */}
            </div>
          )}

          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
                <div>
                  <h1 style={{ 
                    fontSize: '36px', 
                    fontWeight: 'bold', 
                    color: '#1e293b', 
                    textTransform: 'capitalize', 
                    margin: '0 0 6px 0',
                    animation: 'slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) both'
                  }}>
                    {activeSection}
                  </h1>
                  <p style={{ 
                    color: '#64748b', 
                    margin: 0, 
                    fontSize: '18px',
                    animation: 'slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both'
                  }}>
                    Job Seeker Dashboard
                  </p>
                </div>
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