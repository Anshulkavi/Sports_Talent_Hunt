// src/hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { loginUser, logoutUser, registerUser } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, userRole, loading, error } = useSelector(state => state.auth);

  const login = useCallback(async (credentials) => {
    return dispatch(loginUser(credentials));
  }, [dispatch]);

  const register = useCallback(async (userData) => {
    return dispatch(registerUser(userData));
  }, [dispatch]);

  const logout = useCallback(async () => {
    return dispatch(logoutUser());
  }, [dispatch]);

  return {
    user,
    token,
    isAuthenticated,
    userRole,
    loading,
    error,
    login,
    register,
    logout,
  };
};