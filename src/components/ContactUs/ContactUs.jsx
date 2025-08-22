import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import { MapPin } from "lucide-react";
import Navbar from "../../pages/homePage/components/Navbar";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUp,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
    } catch (error) {
      console.log(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Mon-Fri 9:00 AM - 6:00 PM",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["info@hirehaven.com", "support@hirehaven.com"],
      description: "We'll respond within 24 hours",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office",
      details: ["123 Business Avenue", "Suite 456, City, State 12345"],
      description: "Visit us during business hours",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
      ],
      description: "Closed on Sundays",
    },
  ];

  const faqData = [
    {
      question: "How do I post a job on your portal?",
      answer:
        "To post a job, simply create an employer account by clicking 'Sign Up' and selecting 'Employer'. Once registered, you can access our intuitive job posting dashboard where you can create detailed job listings, set requirements, manage applications, and track candidate progress. Our step-by-step wizard makes it easy to post your first job in under 5 minutes.",
    },
    {
      question: "Is the job portal free for job seekers?",
      answer:
        "Yes, absolutely! Job seekers can create profiles, search for jobs, apply to unlimited positions, and access our career resources completely free of charge. We believe in empowering job seekers with the tools they need to advance their careers without any financial barriers.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, go to the login page and click on 'Forgot Password'. Enter your registered email address, and we'll send you a secure reset link within minutes. Follow the instructions in the email to create a new password. If you don't receive the email, check your spam folder or contact our support team.",
    },
    {
      question: "What types of jobs are available on your platform?",
      answer:
        "Our platform hosts a diverse range of opportunities across all industries and experience levels. From entry-level positions and internships to senior executive roles, we feature jobs in technology, healthcare, finance, education, creative fields, remote work opportunities, and much more. We also support both full-time and part-time positions.",
    },
    {
      question: "How does your matching algorithm work?",
      answer:
        "Our advanced AI-powered matching system analyzes your skills, experience, preferences, and career goals to recommend the most relevant job opportunities. It considers factors like location preferences, salary expectations, company culture fit, and career progression paths to ensure you see positions that align with your professional aspirations.",
    },
    {
      question: "Can I edit my application after submission?",
      answer:
        "Once submitted, applications cannot be directly edited to maintain the integrity of the hiring process. However, you can contact the employer directly through our messaging system to provide additional information or clarifications. For future applications, make sure to review all details before submitting.",
    },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      <Navbar />
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute top-60 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-25 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header Section with Animation */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-30 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-2 h-2 bg-white opacity-30 rounded-full animate-ping"></div>
            <div
              className="absolute top-20 right-20 w-1 h-1 bg-white opacity-40 rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-white opacity-20 rounded-full animate-ping"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            className="text-center transform transition-all duration-1000 ease-out"
            style={{
              transform: "translateY(0)",
              opacity: 1,
            }}
          >
            <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
              Get In Touch
            </h1>
            <p
              className="text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Have questions about our job portal? Need support or want to
              partner with us? We're here to help you succeed in your career
              journey.
            </p>
            <div
              className="mt-8 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="inline-flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">We're online</span>
                </div>
                <div className="text-sm opacity-75">
                  Average response time: 2 hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div
            id="contact-info"
            data-animate
            className={`space-y-8 transform transition-all duration-1000 ${
              isVisible["contact-info"]
                ? "translate-x-0 opacity-100"
                : "-translate-x-16 opacity-0"
            }`}
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p className="text-gray-400 text-lg">
                Choose the best way to reach us. We're committed to providing
                excellent support for job seekers and employers alike.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <div className="space-y-1 mb-2">
                    {item.details.map((detail, idx) => (
                      <p
                        key={idx}
                        className="text-gray-900 group-hover:text-gray-700 transition-colors duration-300"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Interactive FAQ Section */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-6 text-xl">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="font-medium text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0">
                        {expandedFAQ === index ? (
                          <ChevronUp className="w-5 h-5 text-blue-600 transform transition-transform duration-200" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 transform transition-transform duration-200" />
                        )}
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedFAQ === index
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-4 text-gray-600 bg-gray-50 border-t border-gray-100">
                        <p className="pt-4 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            id="contact-form"
            data-animate
            className={`transform transition-all duration-1000 ${
              isVisible["contact-form"]
                ? "translate-x-0 opacity-100"
                : "translate-x-16 opacity-0"
            }`}
          >
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              {/* Success/Error Messages with Animation */}
              {submitStatus === "success" && (
                <div className="mb-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4 flex items-center animate-fade-in-up">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 animate-bounce" />
                  <div>
                    <p className="font-medium text-green-800">
                      Message sent successfully!
                    </p>
                    <p className="text-sm text-green-600">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-4 flex items-center animate-shake">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                  <div>
                    <p className="font-medium text-red-800">
                      Failed to send message
                    </p>
                    <p className="text-sm text-red-600">
                      Please try again or contact us directly.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Form Fields with Enhanced Styling */}
                <div className="group">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                    placeholder="Your full name"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="inquiryType"
                    className="block text-sm font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="employer">Employer Services</option>
                    <option value="jobseeker">Job Seeker Help</option>
                    <option value="partnership">Partnership</option>
                    <option value="billing">Billing Question</option>
                  </select>
                </div>

                <div className="group">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-vertical transition-all duration-300 hover:border-blue-300"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                {/* Enhanced Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:from-blue-400 disabled:to-blue-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform duration-200" />
                      Send Message
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-400">
                <p>* Required fields</p>
                <p className="mt-1">
                  By submitting this form, you agree to our privacy policy and
                  terms of service.
                </p>
              </div>
            </div>
            <div className="w-full bg-white shadow-lg rounded-xl p-10 border border-gray-200 mt-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ⚡ Quick Response Guarantee
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li>
                  • <span className="font-medium">Emergency calls:</span>{" "}
                  Immediate response
                </li>
                <li>
                  • <span className="font-medium">WhatsApp messages:</span>{" "}
                  Within 30 minutes
                </li>
                <li>
                  • <span className="font-medium">Email inquiries:</span> Within
                  24 hours
                </li>
                <li>
                  • <span className="font-medium">Partnership requests:</span>{" "}
                  Within 48 hours
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Map Section */}
      <div
        id="map-section"
        data-animate
        className={`bg-gradient-to-br from-gray-50 to-gray-100 py-16 transform transition-all duration-1000 ${
          isVisible["map-section"]
            ? "translate-y-0 opacity-100"
            : "translate-y-16 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Located in the heart of the business district, easily accessible
              by public transport. Come visit us for a coffee and discuss your
              career goals in person.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden ">
            <div className="h-80 relative overflow-hidden rounded-2xl">
              {/* Google Map Embed */}
              <iframe
                title="Accra Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8969557749186!2d-0.2035820847406116!3d5.603717796243382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9e6b1dcaa8a1%3A0xa19f5c98e8b7d5a0!2sAccra!5e0!3m2!1sen!2sgh!4v1692599999999!5m2!1sen!2sgh"
                width="100%"
                height="100%"
                className="absolute inset-0"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 opacity-30"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
                <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-bounce" />
                <p className="text-gray-700 text-lg font-medium">
                  Our Accra Office
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Visit us or get directions
                </p>
                <div className="mt-4 inline-flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>We're here to help</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">HH</span>
                </div>
                <span className="text-xl font-bold">HireHaven</span>
              </div>
              <p className="text-gray-400">
                Connecting talented individuals with amazing opportunities. Your
                career journey starts here.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-200" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-200" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-200" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-200" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Find Jobs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Post a Job
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Browse Companies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Career Advice
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Resume Builder
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4" />
                  <span>info@hirehaven.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 mt-1" />
                  <span>
                    123 Business Avenue
                    <br />
                    Suite 456, City, State 12345
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Hire Haven. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">
                Made with ❤️ for your career success
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all duration-300 transform ${
          showScrollTop
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-16 opacity-0 scale-75"
        }`}
        style={{ zIndex: 50 }}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
