import './App.css'
import HomePage from './pages/homePage/HomePage.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import JsignUp from './components/JobSeeker/JsignUp.jsx'
import JLogin from './components/JobSeeker/JLogin.jsx'
import ESignup from './components/Employer/ESignup.jsx'
import ELogin from './components/Employer/ELogin.jsx'
import ASignup from './components/Admin/ASignup.jsx'
import ALogin from './components/Admin/ALogin.jsx'




function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/jsignup',
      element: <JsignUp />
    },
    {
      path: 'jlogin',
      element: <JLogin />
    },
    {
      path: 'esignup',
      element:<ESignup />
    },
    {
      path: 'elogin',
      element: <ELogin />
    },
    {
      path: 'asignup',
      element: <ASignup />
    },
    {
      path: 'alogin',
      element: <ALogin />
    },
  ]);

  return <RouterProvider router={router}/>

  
}

export default App
