// contexts/AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        profile: action.payload.profile,
        error: null
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        profile: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        profile: null,
        error: null
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: { ...state.profile, ...action.payload }
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  profile: null,
  loading: true,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        dispatch({ type: 'AUTH_START' });
        const result = await authService.getCurrentUser();
        if (result.success) {
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: {
              user: result.data.user,
              profile: result.data.profile
            }
          });
        } else {
          dispatch({ type: 'AUTH_FAILURE', payload: result.error });
        }
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: null });
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
  dispatch({ type: 'AUTH_START' });
  const result = await authService.login(email, password);

  if (result.success) {
    // Make sure userType exists
    const user = {
      ...result.data.user,
      userType: result.data.user.userType || "jobseeker" // fallback if backend doesn't return
    };

    dispatch({
      type: 'AUTH_SUCCESS',
      payload: {
        user,
        profile: result.data.profile
      }
    });

    // Optional: persist user to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true };
  } else {
    dispatch({ type: 'AUTH_FAILURE', payload: result.error });
    return { success: false, error: result.error };
  }
};


  const register = async (userData) => {
    dispatch({ type: 'AUTH_START' });
    const result = await authService.register(userData);
    
    if (result.success) {
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: result.data.user,
          profile: result.data.profile
        }
      });
      return { success: true };
    } else {
      dispatch({ type: 'AUTH_FAILURE', payload: result.error });
      return { success: false, error: result.error };
    }
  };

  const logout = async () => {
    await authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = (profileData) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profileData });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


