// src/utils/helpers.js
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getTimeAgo = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
};

export const getScoreColor = (score) => {
  const ranges = Object.values(SCORE_RANGES);
  const range = ranges.find(r => score >= r.min && score <= r.max);
  return range ? range.color : SCORE_RANGES.NEEDS_WORK.color;
};

export const getScoreLabel = (score) => {
  const ranges = Object.values(SCORE_RANGES);
  const range = ranges.find(r => score >= r.min && score <= r.max);
  return range ? range.label : SCORE_RANGES.NEEDS_WORK.label;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[+]?[0-9]{10,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER_TOKEN: '@sports_talent_hunt:user_token',
  USER_DATA: '@sports_talent_hunt:user_data',
  USER_ROLE: '@sports_talent_hunt:user_role',
  ONBOARDING_COMPLETE: '@sports_talent_hunt:onboarding_complete',
  THEME_PREFERENCE: '@sports_talent_hunt:theme',
  NOTIFICATION_SETTINGS: '@sports_talent_hunt:notifications',
};

export const storage = {
  // Token management
  setToken: async (token) => {
    try {
      await AsyncStorage.setItem(KEYS.USER_TOKEN, token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  },

  getToken: async () => {
    try {
      return await AsyncStorage.getItem(KEYS.USER_TOKEN);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  removeToken: async () => {
    try {
      await AsyncStorage.removeItem(KEYS.USER_TOKEN);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },

  // User data management
  setUserData: async (userData) => {
    try {
      await AsyncStorage.setItem(KEYS.USER_DATA, JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  },

  getUserData: async () => {
    try {
      const data = await AsyncStorage.getItem(KEYS.USER_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  // Role management
  setUserRole: async (role) => {
    try {
      await AsyncStorage.setItem(KEYS.USER_ROLE, role);
    } catch (error) {
      console.error('Error storing user role:', error);
    }
  },

  getUserRole: async () => {
    try {
      return await AsyncStorage.getItem(KEYS.USER_ROLE);
    } catch (error) {
      console.error('Error getting user role:', error);
      return null;
    }
  },

  // Settings management
  setNotificationSettings: async (settings) => {
    try {
      await AsyncStorage.setItem(KEYS.NOTIFICATION_SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error storing notification settings:', error);
    }
  },

  getNotificationSettings: async () => {
    try {
      const settings = await AsyncStorage.getItem(KEYS.NOTIFICATION_SETTINGS);
      return settings ? JSON.parse(settings) : {
        push: true,
        email: true,
        sms: false,
        analysis: true,
        contests: true,
        social: true
      };
    } catch (error) {
      console.error('Error getting notification settings:', error);
      return null;
    }
  },

  // Clear all data
  clearAll: async () => {
    try {
      await AsyncStorage.multiRemove(Object.values(KEYS));
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};