declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
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
  }
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
declare module '*.mp4';
declare module '*.mp3';
declare module '*.ttf';
declare module '*.otf';
declare module '*.json';
