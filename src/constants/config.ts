import { Dimensions, Platform } from 'react-native';

// Define environment variable types
type EnvVars = {
  API_URL: string;
  API_VERSION: string;
  API_TIMEOUT: string;
  AUTH_TOKEN_KEY: string;
  REFRESH_TOKEN_KEY: string;
  ADMOB_APP_ID_IOS: string;
  ADMOB_APP_ID_ANDROID: string;
  ADMOB_BANNER_ID_IOS: string;
  ADMOB_BANNER_ID_ANDROID: string;
  ADMOB_INTERSTITIAL_ID_IOS: string;
  ADMOB_INTERSTITIAL_ID_ANDROID: string;
  ADMOB_REWARDED_ID_IOS: string;
  ADMOB_REWARDED_ID_ANDROID: string;
  MIN_WITHDRAWAL_AMOUNT: string;
  POINTS_TO_CURRENCY_RATIO: string;
  ENABLE_SOCIAL_LOGIN: string;
  ENABLE_BIOMETRIC_AUTH: string;
  ENABLE_PUSH_NOTIFICATIONS: string;
  ENABLE_OFFLINE_MODE: string;
};

// Mock environment variables for development
const mockEnv: EnvVars = {
  API_URL: 'https://api.studyearn.app',
  API_VERSION: 'v1',
  API_TIMEOUT: '30000',
  AUTH_TOKEN_KEY: '@auth_token',
  REFRESH_TOKEN_KEY: '@refresh_token',
  ADMOB_APP_ID_IOS: 'ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy',
  ADMOB_APP_ID_ANDROID: 'ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy',
  ADMOB_BANNER_ID_IOS: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
  ADMOB_BANNER_ID_ANDROID: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
  ADMOB_INTERSTITIAL_ID_IOS: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
  ADMOB_INTERSTITIAL_ID_ANDROID: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
  ADMOB_REWARDED_ID_IOS: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
  ADMOB_REWARDED_ID_ANDROID: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
  MIN_WITHDRAWAL_AMOUNT: '500',
  POINTS_TO_CURRENCY_RATIO: '0.01',
  ENABLE_SOCIAL_LOGIN: 'false',
  ENABLE_BIOMETRIC_AUTH: 'false',
  ENABLE_PUSH_NOTIFICATIONS: 'true',
  ENABLE_OFFLINE_MODE: 'true',
};

const { width, height } = Dimensions.get('window');

const getEnvVar = (key: keyof EnvVars): string => {
  try {
    // Try to get from process.env first
    const value = process.env[key];
    if (value !== undefined) return value;
    
    // Fallback to mock values in development
    if (__DEV__) {
      return mockEnv[key];
    }
    
    throw new Error(`Environment variable ${key} is not defined`);
  } catch (error) {
    // In production, throw error for missing env vars
    if (!__DEV__) {
      throw error;
    }
    // In development, use mock value
    return mockEnv[key];
  }
};

export const APP_CONFIG = {
  // App Information
  VERSION: '1.0.0',
  BUILD_NUMBER: '1',
  APP_NAME: 'Study & Earn',
  SUPPORT_EMAIL: 'support@studyearn.app',
  
  // API Configuration
  API: {
    BASE_URL: getEnvVar('API_URL'),
    VERSION: getEnvVar('API_VERSION'),
    TIMEOUT: parseInt(getEnvVar('API_TIMEOUT'), 10),
    RETRY_ATTEMPTS: 3,
    CACHE_TIME: 5 * 60 * 1000, // 5 minutes
  },

  // Authentication
  AUTH: {
    TOKEN_KEY: getEnvVar('AUTH_TOKEN_KEY'),
    REFRESH_TOKEN_KEY: getEnvVar('REFRESH_TOKEN_KEY'),
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
    MIN_PASSWORD_LENGTH: 8,
  },

  // AdMob
  ADMOB: {
    APP_ID: {
      ios: getEnvVar('ADMOB_APP_ID_IOS'),
      android: getEnvVar('ADMOB_APP_ID_ANDROID'),
    },
    BANNER_ID: {
      ios: getEnvVar('ADMOB_BANNER_ID_IOS'),
      android: getEnvVar('ADMOB_BANNER_ID_ANDROID'),
    },
    INTERSTITIAL_ID: {
      ios: getEnvVar('ADMOB_INTERSTITIAL_ID_IOS'),
      android: getEnvVar('ADMOB_INTERSTITIAL_ID_ANDROID'),
    },
    REWARDED_ID: {
      ios: getEnvVar('ADMOB_REWARDED_ID_IOS'),
      android: getEnvVar('ADMOB_REWARDED_ID_ANDROID'),
    },
  },

  // Points System
  POINTS: {
    MIN_WITHDRAWAL: parseInt(getEnvVar('MIN_WITHDRAWAL_AMOUNT'), 10),
    CONVERSION_RATE: parseFloat(getEnvVar('POINTS_TO_CURRENCY_RATIO')),
    DAILY_BONUS: 10,
    STREAK_BONUS: 20,
    REFERRAL_BONUS: 100,
  },

  // Content
  CONTENT: {
    MAX_UPLOAD_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_FILE_TYPES: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'mp4', 'mp3'] as const,
    MAX_VIDEO_DURATION: 30 * 60, // 30 minutes
    THUMBNAIL_QUALITY: 0.8,
  },

  // Cache
  CACHE: {
    MAX_SIZE: 50 * 1024 * 1024, // 50MB
    EXPIRY: {
      PROFILE: 5 * 60 * 1000, // 5 minutes
      COURSES: 15 * 60 * 1000, // 15 minutes
      LESSONS: 30 * 60 * 1000, // 30 minutes
    },
  },

  // UI Constants
  UI: {
    SCREEN_WIDTH: width,
    SCREEN_HEIGHT: height,
    IS_IOS: Platform.OS === 'ios',
    IS_ANDROID: Platform.OS === 'android',
    HEADER_HEIGHT: 56,
    TAB_BAR_HEIGHT: 60,
    CARD_BORDER_RADIUS: 8,
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 3000,
  },

  // Navigation
  NAVIGATION: {
    TRANSITION_CONFIG: {
      duration: 300,
    },
    DEEP_LINKING: {
      PREFIX: 'studyearn://',
      SCREENS: {
        COURSE: 'course',
        LESSON: 'lesson',
        PROFILE: 'profile',
      } as const,
    },
  },

  // Storage Keys
  STORAGE_KEYS: {
    USER_PROFILE: '@user_profile',
    SETTINGS: '@settings',
    COURSE_PROGRESS: '@course_progress',
    NOTIFICATIONS: '@notifications',
    POINTS_HISTORY: '@points_history',
  } as const,

  // Feature Flags
  FEATURES: {
    SOCIAL_LOGIN: getEnvVar('ENABLE_SOCIAL_LOGIN') === 'true',
    BIOMETRIC_AUTH: getEnvVar('ENABLE_BIOMETRIC_AUTH') === 'true',
    PUSH_NOTIFICATIONS: getEnvVar('ENABLE_PUSH_NOTIFICATIONS') === 'true',
    OFFLINE_MODE: getEnvVar('ENABLE_OFFLINE_MODE') === 'true',
  },

  // Error Messages
  ERRORS: {
    NETWORK: 'Network error. Please check your connection.',
    SERVER: 'Server error. Please try again later.',
    AUTH: 'Authentication failed. Please login again.',
    UPLOAD: 'Upload failed. Please try again.',
    POINTS: 'Error processing points. Please try again.',
    WITHDRAWAL: 'Withdrawal failed. Please try again.',
  } as const,

  // Analytics Events
  ANALYTICS: {
    EVENTS: {
      LOGIN: 'user_login',
      REGISTER: 'user_register',
      COURSE_VIEW: 'course_view',
      LESSON_COMPLETE: 'lesson_complete',
      POINTS_EARNED: 'points_earned',
      AD_VIEWED: 'ad_viewed',
    } as const,
  },

  // URLs
  URLS: {
    TERMS: 'https://studyearn.app/terms',
    PRIVACY: 'https://studyearn.app/privacy',
    HELP: 'https://studyearn.app/help',
    ABOUT: 'https://studyearn.app/about',
  } as const,
} as const;

export type AppConfig = typeof APP_CONFIG;
export default APP_CONFIG;
