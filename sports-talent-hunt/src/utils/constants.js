// src/utils/constants.js

export const SPORTS = [
  { id: 'cricket', name: 'Cricket', icon: 'baseball' },
  { id: 'football', name: 'Football', icon: 'football' },
  { id: 'basketball', name: 'Basketball', icon: 'basketball' },
  { id: 'tennis', name: 'Tennis', icon: 'tennisball' },
  { id: 'badminton', name: 'Badminton', icon: 'disc' },
  { id: 'swimming', name: 'Swimming', icon: 'water' },
  { id: 'athletics', name: 'Athletics', icon: 'walk' },
  { id: 'hockey', name: 'Hockey', icon: 'american-football' },
];

export const USER_ROLES = {
  PLAYER: 'player',
  COACH: 'coach',
  SCOUT: 'scout',
  GOVT: 'govt',
  SPONSOR: 'sponsor',
};

export const VIDEO_TYPES = [
  { id: 'drill', name: 'Practice Drill', description: 'Training exercises and drills' },
  { id: 'match', name: 'Match Highlight', description: 'Game performance clips' },
  { id: 'technique', name: 'Technique Demo', description: 'Specific skill demonstration' },
  { id: 'fitness', name: 'Fitness Test', description: 'Physical conditioning assessment' },
];

export const ANALYSIS_METRICS = [
  'technique',
  'speed',
  'accuracy',
  'consistency',
  'power',
  'agility',
  'endurance',
  'coordination',
];

export const CONTEST_TYPES = [
  'monthly_challenge',
  'skill_contest',
  'regional_championship',
  'national_qualifier',
  'scholarship_hunt',
];

export const NOTIFICATION_TYPES = {
  ANALYSIS_COMPLETE: 'analysis_complete',
  CONTEST_INVITE: 'contest_invite',
  SCORE_IMPROVEMENT: 'score_improvement',
  COACH_MESSAGE: 'coach_message',
  GOVT_VERIFICATION: 'govt_verification',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    REFRESH: '/auth/refresh',
  },
  VIDEO: {
    UPLOAD: '/video/upload',
    ANALYZE: '/video/analyze',
    LIST: '/video/list',
    DELETE: '/video/delete',
  },
  CONTESTS: {
    LIST: '/contests',
    JOIN: '/contests/join',
    LEADERBOARD: '/contests/leaderboard',
  },
  USER: {
    PROFILE: '/user/profile',
    STATS: '/user/stats',
    HISTORY: '/user/history',
  },
};

export const THEME_COLORS = {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    900: '#14532d',
  },
  secondary: {
    50: '#fff7ed',
    100: '#ffedd5',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    900: '#9a3412',
  },
};
