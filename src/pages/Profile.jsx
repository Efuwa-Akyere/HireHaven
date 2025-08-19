import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    // Job Seeker fields
    skills: [],
    location: '',
    experience: '',
    phone: '',
    linkedin: '',
    // Employer fields
    companyName: '',
    companyDescription: '',
    companyWebsite: '',
    industry: ''
  });
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [files, setFiles] = useState({
    resume: null,
    companyLogo: null
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/auth/profile');
      const userData = response.data;
      
      setProfile({
        name: userData.name || '',
        email: userData.email || '',
        skills: userData.profile?.skills || [],
        location: userData.profile?.location || '',
        experience: userData.profile?.experience || '',
        phone: userData.profile?.phone || '',
        linkedin: userData.profile?.linkedin || '',
        companyName: userData.profile?.companyName || '',
        companyDescription: userData.profile?.companyDescription || '',
        companyWebsite: userData.profile?.companyWebsite || '',
        industry: userData.profile?.industry || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage({ type: 'error', text: 'Failed to load profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles(prev => ({ ...prev, [name]: fileList[0] }));
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      
      // Add profile data
      Object.entries(profile).forEach(([key, value]) => {
        if (key === 'skills') {
          value.forEach((skill, index) => {
            formData.append(`profile.skills[${index}]`, skill);
          });
        } else if (key !== 'name' && key !== 'email') {
          formData.append(`profile.${key}`, value);
        }
      });

      // Add files
      if (files.resume) {
        formData.append('resume', files.resume);
      }
      if (files.companyLogo) {
        formData.append('companyLogo', files.companyLogo);
      }

      await axios.put('/api/auth/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Reset file inputs
      setFiles({ resume: null, companyLogo: null });
      
      // Clear file input values
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach(input => input.value = '');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update profile' 
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="page-header">
          <h1>My Profile</h1>
          <p>Keep your profile up to date to attract the best opportunities</p>
        </div>

        {message.text && (
          <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="row">
            <div className="col-8">
              {/* Basic Information */}
              <div className="card">
                <div className="card-header">
                  <h3>Basic Information</h3>
                </div>
                
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={profile.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={profile.email}
                        disabled
                      />
                      <small className="form-text">Email cannot be changed</small>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        name="location"
                        className="form-control"
                        value={profile.location}
                        onChange={handleInputChange}
                        placeholder="City, Region"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={profile.phone}
                        onChange={handleInputChange}
                        placeholder="+233 XXX XXX XXX"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Seeker Specific Fields */}
              {user.userType === 'jobseeker' && (
                <>
                  <div className="card">
                    <div className="card-header">
                      <h3>Professional Information</h3>
                    </div>
                    
                    <div className="form-group">
                      <label>Experience Level</label>
                      <select
                        name="experience"
                        className="form-control"
                        value={profile.experience}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Experience Level</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior Level">Senior Level</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>LinkedIn Profile</label>
                      <input
                        type="url"
                        name="linkedin"
                        className="form-control"
                        value={profile.linkedin}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>

                    <div className="form-group">
                      <label>Skills</label>
                      <div className="skills-input">
                        <form onSubmit={addSkill} className="add-skill-form">
                          <input
                            type="text"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            placeholder="Add a skill..."
                            className="form-control"
                          />
                          <button type="submit" className="btn btn-primary btn-sm">
                            Add
                          </button>
                        </form>
                      </div>
                      
                      <div className="skills-list">
                        {profile.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="remove-skill"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Resume</label>
                      <input
                        type="file"
                        name="resume"
                        className="form-control"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                      <small className="form-text">
                        Upload a PDF or Word document (Max 5MB)
                      </small>
                    </div>
                  </div>
                </>
              )}

              {/* Employer Specific Fields */}
              {user.userType === 'employer' && (
                <div className="card">
                  <div className="card-header">
                    <h3>Company Information</h3>
                  </div>
                  
                  <div className="form-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      className="form-control"
                      value={profile.companyName}
                      onChange={handleInputChange}
                      placeholder="Your Company Name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Company Description</label>
                    <textarea
                      name="companyDescription"
                      className="form-control"
                      value={profile.companyDescription}
                      onChange={handleInputChange}
                      placeholder="Describe your company..."
                      rows={5}
                    />
                  </div>

                  <div className="form-group">
                    <label>Company Website</label>
                    <input
                      type="url"
                      name="companyWebsite"
                      className="form-control"
                      value={profile.companyWebsite}
                      onChange={handleInputChange}
                      placeholder="https://companywebsite.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>Industry</label>
                    <input
                      type="text"
                      name="industry"
                      className="form-control"
                      value={profile.industry}
                      onChange={handleInputChange}
                      placeholder="E.g., Technology, Finance"
                    />
                  </div>

                  <div className="form-group">
                    <label>Company Logo</label>
                    <input
                      type="file"
                      name="companyLogo"
                      className="form-control"
                      accept=".png,.jpg,.jpeg,.svg"
                      onChange={handleFileChange}
                    />
                    <small className="form-text">
                      Upload your company logo (Max 2MB)
                    </small>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions mt-3">
            <button type="submit" className="btn btn-success" disabled={saving}>
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
