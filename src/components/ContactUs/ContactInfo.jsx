import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Mon-Fri 9:00 AM - 6:00 PM"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["info@jobportal.com", "support@jobportal.com"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office",
      details: ["123 Business Avenue", "Suite 456, City, State 12345"],
      description: "Visit us during business hours"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM"],
      description: "Closed on Sundays"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
        <p className="text-gray-400 text-lg">
          Choose the best way to reach us. We're committed to providing excellent support 
          for job seekers and employers alike.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {contactInfo.map((item, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                {item.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
            </div>
            <div className="space-y-1 mb-2">
              {item.details.map((detail, idx) => (
                <p key={idx} className="text-gray-900">{detail}</p>
              ))}
            </div>
            <p className="text-sm text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-medium text-gray-900">How do I post a job?</p>
            <p className="text-gray-400">Create an employer account and follow our simple job posting process.</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">Is the job portal free for job seekers?</p>
            <p className="text-gray-400">Yes, creating a profile and applying to jobs is completely free.</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">How do I reset my password?</p>
            <p className="text-gray-400">Click "Forgot Password" on the login page and follow the instructions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;