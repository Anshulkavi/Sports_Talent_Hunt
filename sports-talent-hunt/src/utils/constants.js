// src/utils/constants.js
export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:8000/api'  // Development
  : 'https://api.sportstalenthunt.com'; // Production

export const SPORTS_LIST = [
  { id: 'cricket', name: 'Cricket', icon: 'fitness' },
  { id: 'football', name: 'Football', icon: 'football' },
  { id: 'basketball', name: 'Basketball', icon: 'basketball' },
  { id: 'tennis', name: 'Tennis', icon: 'tennisball' },
  { id: 'badminton', name: 'Badminton', icon: 'fitness' },
  { id: 'athletics', name: 'Athletics', icon: 'walk' },
  { id: 'volleyball', name: 'Volleyball', icon: 'fitness' },
  { id: 'hockey', name: 'Hockey', icon: 'fitness' },
  { id: 'swimming', name: 'Swimming', icon: 'water' },
  { id: 'wrestling', name: 'Wrestling', icon: 'fitness' }
];

export const USER_ROLES = {
  PLAYER: 'player',
  COACH: 'coach',
  SCOUT: 'scout',
  GOVT: 'govt',
  SPONSOR: 'sponsor'
};

export const CONTEST_STATUS = {
  UPCOMING: 'upcoming',
  ACTIVE: 'active',
  ENDED: 'ended',
  CANCELLED: 'cancelled'
};

export const ANALYSIS_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

export const NOTIFICATION_TYPES = {
  ANALYSIS_COMPLETE: 'analysis_complete',
  CONTEST_REMINDER: 'contest_reminder',
  ACHIEVEMENT: 'achievement',
  GOVT_VERIFICATION: 'govt_verification',
  SOCIAL: 'social',
  SYSTEM: 'system'
};

export const SCORE_RANGES = {
  EXCELLENT: { min: 90, max: 100, label: 'Excellent', color: '#22c55e' },
  VERY_GOOD: { min: 80, max: 89, label: 'Very Good', color: '#16a34a' },
  GOOD: { min: 70, max: 79, label: 'Good', color: '#65a30d' },
  AVERAGE: { min: 60, max: 69, label: 'Average', color: '#f97316' },
  NEEDS_WORK: { min: 0, max: 59, label: 'Needs Work', color: '#ef4444' }
};