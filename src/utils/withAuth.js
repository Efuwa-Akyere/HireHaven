// utils/withAuth.js - HOC for protecting routes
import { useAuth } from './AuthContext';

export const withAuth = (Component, allowedRoles = []) => {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <div>Loading...</div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <h2>Authentication Required</h2>
          <p>Please log in to access this page.</p>
        </div>
      );
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.userType)) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      );
    }

    return <Component {...props} />;
  };
};
