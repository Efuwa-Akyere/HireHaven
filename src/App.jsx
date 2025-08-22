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
import About from "./pages/aboutPage/about.jsx";

// Context for user authentication
export const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      const response = await axios.get("/api/auth/verify");
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/jsignup",
      element: <JsignUp />,
    },
    {
      path: "jlogin",
      element: <JLogin />,
    },
    {
      path: "esignup",
      element: <ESignup />,
    },
    {
      path: "elogin",
      element: <ELogin />,
    },
    {
      path: "asignup",
      element: <ASignup />,
    },
    {
      path: "alogin",
      element: <ALogin />,
    },
    {
      path: "about",
      element: <About />,
    },
    {
      path: "contactus",
      element: <ContactUs />,
    },

    {
      path: "rootlayout",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Welcome />,
        },
        {
          path: "applicants",
          element: <Applicants />,
        },
        {
          path: "employers",
          element: <Employers />,
        },
        {
          path: "statistics",
          element: <Statistics />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        // user ? (
        //   user.userType === "jobseeker" ? (
        <JobSeekerDashboard />
      ),
      //   ) : (
      //     <EmployerDashboard />
      //   )
      // ) : (
      //   <Navigate to="/jlogin" />
      // ),
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

  return (
    <div className="App">
      <RouterProvider router={router} />{" "}
    </div>
  );
}

export default App;
