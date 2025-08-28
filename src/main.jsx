import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { EmployerAuthProvider } from './context/EmployerAuthContext.jsx'
import { Toaster } from 'react-hot-toast'
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <EmployerAuthProvider>
     <AdminAuthProvider>
      <App />
     <Toaster />
     </AdminAuthProvider>
   </EmployerAuthProvider>
  </StrictMode>,
)
