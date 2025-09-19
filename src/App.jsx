import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import HomePage from "./pages/homePage/HomePage.jsx";
import Header from "./components/Header.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import JsignUp from "./components/JobSeeker/JsignUp.jsx";
import JLogin from "./components/JobSeeker/JLogin.jsx";
import ESignup from "./components/Employer/ESignup.jsx";
import ELogin from "./components/Employer/ELogin.jsx";
import ASignup from "./components/Admin/ASignup.jsx";
import ALogin from "./components/Admin/ALogin.jsx";
import Jobs from "./pages/Jobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import Profile from "./pages/Profile.jsx";
import Applications from "./pages/Applications.jsx";
import JobSeekerDashboard from "./components/Dashboard/JobSeekerDashboard.jsx";
import EmployerDashboard from "./components/Dashboard/EmployerDashboard.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";

import RootLayout from "./layout/RootLayout.jsx";
import Applicants from "./pages/adminDashboard/components/Applicants.jsx";
import Employers from "./pages/adminDashboard/components/Employers.jsx";
import Statistics from "./pages/adminDashboard/components/Statistics.jsx";
import Welcome from "./pages/adminDashboard/Welcome.jsx";
import About from "./pages/aboutPage/About.jsx";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoadingSpinner } from "./components/LoadingSpinner";

// Context for user authentication (legacy) - removed duplicate export

const AppContent = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <LoadingSpinner size="large" message="Loading HireHaven..." />
      </div>
    );
  }

  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/jsignup", element: <JsignUp /> },
    { path: "/jlogin", element: <JLogin /> },
    { path: "/esignup", element: <ESignup /> },
    { path: "/elogin", element: <ELogin /> },
    { path: "/asignup", element: <ASignup /> },
    { path: "/alogin", element: <ALogin /> },
    { path: "/about", element: <About /> },
    { path: "/contactus", element: <ContactUs /> },

    {
      path: "/rootlayout",
      element: <RootLayout />,
      children: [
        { index: true, element: <Welcome /> },
        { path: "applicants", element: <Applicants /> },
        { path: "employers", element: <Employers /> },
        { path: "statistics", element: <Statistics /> },
      ],
    },
    {
      path: "/dashboard",
      element: loading ? (
        <LoadingSpinner />
      ) : user?.userType === "jobseeker" ? (
        <JobSeekerDashboard />
      ) : user?.userType === "employer" ? (
        <EmployerDashboard />
      ) : (
        <Navigate to="/jlogin" />
      ),
    },
    {
      path: "/jobseeker/dashboard",
      element: loading ? (
        <LoadingSpinner />
      ) : user?.userType === "jobseeker" ? (
        <JobSeekerDashboard />
      ) : (
        <Navigate to="/jlogin" />
      ),
    },
    {
      path: "/employer/dashboard",
      element:
        user?.userType === "employer" ? (
          <EmployerDashboard />
        ) : (
          <Navigate to="/elogin" />
        ),
    },
    {
      path: "/profile",
      element: user ? <Profile /> : <Navigate to="/jlogin" />,
    },
    {
      path: "/applications",
      element:
        user && user.userType === "jobseeker" ? (
          <Applications />
        ) : (
          <Navigate to="/jlogin" />
        ),
    },
  ]);

  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <AuthProvider>
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          lineHeight: 1.5,
          color: "#1e293b",
        }}
      >
        <AppContent />
      </div>
    </AuthProvider>
  );
};

export default App;
