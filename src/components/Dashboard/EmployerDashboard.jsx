import React, { useState, useEffect } from 'react';
import { Building2, Users, FileText, TrendingUp, LogOut, Edit, Phone, Mail, Globe, Plus, Eye, UserCheck } from 'lucide-react';

const EmployerDashboard = () => {
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
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'company', label: 'Company Profile', icon: Building2 },
    { id: 'jobs', label: 'Job Postings', icon: FileText },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  const companyData = {
    name: 'TechCorp Solutions',
    role: 'Technology Company',
    location: 'Accra, Ghana',
    industry: 'Software Development & IT Services',
    contact: '0302123456',
    email: 'hr@techcorp.com',
    website: 'www.techcorp.com',
    logo: '🏢',
    founded: '2018',
    employees: '50-100'
  };

  const jobPostings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Accra, Ghana',
      type: 'Full-time',
      salary: 'GHS 8,000 - 12,000',
      posted: '3 days ago',
      status: 'Active',
      applications: 24,
      views: 156
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      salary: 'GHS 10,000 - 15,000',
      posted: '1 week ago',
      status: 'Active',
      applications: 18,
      views: 203
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Hybrid',
      type: 'Contract',
      salary: 'GHS 6,000 - 9,000',
      posted: '2 weeks ago',
      status: 'Closed',
      applications: 31,
      views: 189
    }
  ];

  const candidateApplications = [
    {
      id: 1,
      name: 'Sarah Mensah',
      position: 'Senior Frontend Developer',
      appliedDate: '2 days ago',
      status: 'Under Review',
      experience: '5 years',
      rating: 4.5,
      skills: ['React', 'TypeScript', 'Node.js']
    },
    {
      id: 2,
      name: 'Kwame Asante',
      position: 'Product Manager',
      appliedDate: '4 days ago',
      status: 'Interview Scheduled',
      experience: '7 years',
      rating: 4.8,
      skills: ['Product Strategy', 'Agile', 'Analytics']
    },
    {
      id: 3,
      name: 'Akosua Darko',
      position: 'UI/UX Designer',
      appliedDate: '1 week ago',
      status: 'Shortlisted',
      experience: '4 years',
      rating: 4.2,
      skills: ['Figma', 'User Research', 'Prototyping']
    }
  ];

  const companyDetails = {
    about: 'Leading technology company providing innovative software solutions for businesses across West Africa.',
    culture: [
      'Innovation-driven environment',
      'Work-life balance priority',
      'Professional development opportunities',
      'Collaborative team culture'
    ],
    benefits: [
      'Health insurance coverage',
      'Flexible working arrangements',
      'Professional training budget',
      'Performance bonuses',
      'Retirement savings plan'
    ],
    offices: [
      {
        location: 'Head Office - Accra',
        address: 'East Legon, Accra, Ghana',
        type: 'Main Campus'
      },
      {
        location: 'Kumasi Branch',
        address: 'Ahodwo, Kumasi, Ghana',
        type: 'Regional Office'
      }
    ]
  };

  // Dashboard metrics
  const dashboardStats = {
    totalJobs: 8,
    activeJobs: 5,
    totalApplications: 127,
    interviewsScheduled: 12,
    hiredThisMonth: 3,
    responseRate: '78%'
  };

  const recentActivity = [
    {
      id: 1,
      type: 'application',
      title: 'New application received',
      description: 'Sarah Mensah applied for Senior Frontend Developer',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview scheduled',
      description: 'Kwame Asante - Product Manager position',
      time: '5 hours ago'
    },
    {
      id: 3,
      type: 'hire',
      title: 'Candidate hired',
      description: 'Jennifer Osei joined as Backend Developer',
      time: '1 day ago'
    }
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
    borderRight: '1px solid #e2e8f0'
  };

  const mainContentStyle = {
    flex: 1,
    marginLeft: isMobile ? '0' : isTablet ? '240px' : '280px',
    height: '100vh',
    overflow: 'auto',
    padding: isMobile ? '16px' : isTablet ? '24px' : '32px'
  };

  // Enhanced StatCard component
  const StatCard = ({ value, label, color, icon: Icon, delay = 0, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: isHovered ? '0 10px 25px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: color,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.3s ease'
          }}>
            {value}
          </div>
          {Icon && <Icon size={24} color={color} style={{ opacity: 0.7 }} />}
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

  // Activity Card component
  const ActivityCard = ({ activity, delay = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const getIcon = (type) => {
      switch (type) {
        case 'application': return '📋';
        case 'interview': return '👥';
        case 'hire': return '🎉';
        default: return '📌';
      }
    };
    
    return (
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px',
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
        <div style={{ fontSize: '24px' }}>{getIcon(activity.type)}</div>
        <div style={{ flex: 1 }}>
          <h4 style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 4px 0'
          }}>
            {activity.title}
          </h4>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 4px 0' }}>{activity.description}</p>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{activity.time}</p>
        </div>
      </div>
    );
  };

  // Enhanced ActionButton component
  const ActionButton = ({ children, onClick, primary = true, delay = 0, icon: Icon }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <button
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
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
        <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
          {Icon && <Icon size={16} />}
          {children}
        </span>
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
              gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr 1fr' : '1fr 1fr 1fr 1fr 1fr 1fr',
              gap: '20px'
            }}>
              <StatCard 
                value={dashboardStats.totalJobs} 
                label="Total Jobs" 
                color="#3b82f6" 
                icon={FileText}
                delay={0.1}
                onClick={() => setActiveSection('jobs')}
              />
              <StatCard 
                value={dashboardStats.activeJobs} 
                label="Active Jobs" 
                color="#10b981" 
                icon={TrendingUp}
                delay={0.2}
              />
              <StatCard 
                value={dashboardStats.totalApplications} 
                label="Applications" 
                color="#ef4444" 
                icon={Users}
                delay={0.3}
                onClick={() => setActiveSection('candidates')}
              />
              <StatCard 
                value={dashboardStats.interviewsScheduled} 
                label="Interviews" 
                color="#8b5cf6" 
                icon={UserCheck}
                delay={0.4}
              />
              <StatCard 
                value={dashboardStats.hiredThisMonth} 
                label="Hired This Month" 
                color="#f59e0b" 
                delay={0.5}
              />
              <StatCard 
                value={dashboardStats.responseRate} 
                label="Response Rate" 
                color="#06b6d4" 
                delay={0.6}
              />
            </div>

            {/* Recent Activity */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: isMobile ? '24px' : '32px',
              border: '1px solid #e2e8f0',
              animation: 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.7s both'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Recent Activity</h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {recentActivity.map((activity, index) => (
                  <ActivityCard key={activity.id} activity={activity} delay={0.1 * (index + 1)} />
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
              animation: 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.9s both'
            }}>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '24px' }}>Quick Actions</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
                gap: '20px'
              }}>
                <ActionButton onClick={() => setActiveSection('jobs')} icon={Plus} delay={0.1}>
                  Post New Job
                </ActionButton>
                <ActionButton onClick={() => setActiveSection('candidates')} primary={false} icon={Eye} delay={0.2}>
                  Review Applications
                </ActionButton>
                <ActionButton onClick={() => setActiveSection('analytics')} icon={TrendingUp} delay={0.3}>
                  View Analytics
                </ActionButton>
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
                  {companyData.logo}
                </div>
                <div>
                  <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 8px 0' }}>{companyData.name}</h2>
                  <p style={{ color: '#3b82f6', fontWeight: '600', fontSize: '18px', margin: '0 0 6px 0' }}>{companyData.industry}</p>
                  <p style={{ color: '#64748b', fontSize: '16px', margin: '0' }}>{companyData.location}</p>
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
              <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '16px', fontSize: '20px' }}>About Company</h3>
              <div style={{
                padding: '20px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '2px solid #e2e8f0'
              }}>
                <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>{companyDetails.about}</p>
              </div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
              gap: '20px',
              marginBottom: '32px'
            }}>
              {[
                { icon: Phone, value: companyData.contact, href: `tel:${companyData.contact}` },
                { icon: Mail, value: companyData.email, href: `mailto:${companyData.email}` },
                { icon: Globe, value: companyData.website, href: `https://${companyData.website}` }
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

            {/* Company Culture & Benefits */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '32px'
            }}>
              <div>
                <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '16px', fontSize: '20px' }}>Company Culture</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {companyDetails.culture.map((item, index) => (
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
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '16px', fontSize: '20px' }}>Benefits & Perks</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {companyDetails.benefits.map((item, index) => (
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
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'jobs':
        return (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: isMobile ? '24px' : '40px',
            animation: 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Job Postings</h2>
              <ActionButton onClick={() => {}} icon={Plus}>
                Post New Job
              </ActionButton>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {jobPostings.map((job, index) => (
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
                      backgroundColor: job.status === 'Active' ? '#dcfce7' : '#fef2f2',
                      color: job.status === 'Active' ? '#166534' : '#dc2626',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {job.status}
                    </span>
                  </div>
                  <p style={{ color: '#374151', fontWeight: '600', fontSize: '18px', margin: '0 0 12px 0' }}>{job.department}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '14px', color: '#64748b', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span>📍 {job.location}</span>
                    <span>💼 {job.type}</span>
                    <span>💰 {job.salary}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '14px', color: '#64748b', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span>👥 {job.applications} applications</span>
                    <span>👁️ {job.views} views</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Posted {job.posted}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'candidates':
        return (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: isMobile ? '24px' : '40px',
            animation: 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both'
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '32px' }}>Candidate Applications</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {candidateApplications.map((candidate, index) => (
                <div key={candidate.id} style={{
                  border: '2px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  animation: `slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 * (index + 1)}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#10b981';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(16, 185, 129, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexDirection: isMobile ? 'column' : 'row', gap: '16px' }}>
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
                          <h3 style={{ fontWeight: '700', fontSize: '18px', color: '#1e293b', margin: 0 }}>{candidate.name}</h3>
                          <p style={{ color: '#3b82f6', fontSize: '14px', margin: 0, fontWeight: '600' }}>Applied for {candidate.position}</p>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '14px', color: '#64748b' }}>💼 {candidate.experience} experience</span>
                        <span style={{ fontSize: '14px', color: '#64748b' }}>⭐ {candidate.rating}/5.0</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Applied {candidate.appliedDate}</span>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {candidate.skills.map((skill, skillIndex) => (
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
                        backgroundColor: candidate.status === 'Under Review' ? '#fef3c7' : 
                                       candidate.status === 'Interview Scheduled' ? '#dcfce7' : '#dbeafe',
                        color: candidate.status === 'Under Review' ? '#92400e' : 
                               candidate.status === 'Interview Scheduled' ? '#166534' : '#1e40af',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {candidate.status}
                      </span>
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{
                          padding: '8px 16px',
                          backgroundColor: '#10b981',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
                        >
                          View Profile
                        </button>
                        <button style={{
                          padding: '8px 16px',
                          backgroundColor: '#3b82f6',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                        >
                          Schedule Interview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Analytics Overview */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: isMobile ? '24px' : '40px',
              animation: 'slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both'
            }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '32px' }}>Hiring Analytics</h2>
              
              {/* Key Metrics */}
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

              {/* Popular Job Categories */}
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>Top Performing Job Categories</h3>
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
                        <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{item.category}</div>
                        <div style={{ fontSize: '14px', color: '#64748b' }}>{item.applications} applications</div>
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
                            borderRadius: '4px',
                            transition: 'width 1s ease'
                          }}></div>
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#3b82f6' }}>{item.percentage}%</span>
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
            zIndex: 45,
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={{ padding: isMobile ? '20px' : '24px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', lineHeight: '28px', margin: 0 }}>
            <span style={{ color: '#1e293b' }}>Hire</span>
            <span style={{ color: '#3b82f6' }}>HAVEN</span>
            {/* <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '500', display: 'block', marginTop: '4px' }}>Employer Portal</span> */}
          </h1>
        </div>
        
        <nav style={{ padding: '0 16px', height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
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

        <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
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
                  Employer Dashboard
                </p>
              </div>
            </div>
          )}
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;