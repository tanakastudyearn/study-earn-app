declare module '@env' {
  // Environment variables interface
  export interface EnvVariables {
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

  // Re-export environment variables from ProcessEnv
  export const NODE_ENV: NodeJS.ProcessEnv['NODE_ENV'];
  export const API_URL: NodeJS.ProcessEnv['API_URL'];
  export const API_VERSION: NodeJS.ProcessEnv['API_VERSION'];
  export const API_TIMEOUT: NodeJS.ProcessEnv['API_TIMEOUT'];
  export const AUTH_TOKEN_KEY: NodeJS.ProcessEnv['AUTH_TOKEN_KEY'];
  export const REFRESH_TOKEN_KEY: NodeJS.ProcessEnv['REFRESH_TOKEN_KEY'];
  export const ADMOB_APP_ID_IOS: NodeJS.ProcessEnv['ADMOB_APP_ID_IOS'];
  export const ADMOB_APP_ID_ANDROID: NodeJS.ProcessEnv['ADMOB_APP_ID_ANDROID'];
  export const ADMOB_BANNER_ID_IOS: NodeJS.ProcessEnv['ADMOB_BANNER_ID_IOS'];
  export const ADMOB_BANNER_ID_ANDROID: NodeJS.ProcessEnv['ADMOB_BANNER_ID_ANDROID'];
  export const ADMOB_INTERSTITIAL_ID_IOS: NodeJS.ProcessEnv['ADMOB_INTERSTITIAL_ID_IOS'];
  export const ADMOB_INTERSTITIAL_ID_ANDROID: NodeJS.ProcessEnv['ADMOB_INTERSTITIAL_ID_ANDROID'];
  export const ADMOB_REWARDED_ID_IOS: NodeJS.ProcessEnv['ADMOB_REWARDED_ID_IOS'];
  export const ADMOB_REWARDED_ID_ANDROID: NodeJS.ProcessEnv['ADMOB_REWARDED_ID_ANDROID'];
  export const MIN_WITHDRAWAL_AMOUNT: NodeJS.ProcessEnv['MIN_WITHDRAWAL_AMOUNT'];
  export const POINTS_TO_CURRENCY_RATIO: NodeJS.ProcessEnv['POINTS_TO_CURRENCY_RATIO'];
  export const ENABLE_SOCIAL_LOGIN: NodeJS.ProcessEnv['ENABLE_SOCIAL_LOGIN'];
  export const ENABLE_BIOMETRIC_AUTH: NodeJS.ProcessEnv['ENABLE_BIOMETRIC_AUTH'];
  export const ENABLE_PUSH_NOTIFICATIONS: NodeJS.ProcessEnv['ENABLE_PUSH_NOTIFICATIONS'];
  export const ENABLE_OFFLINE_MODE: NodeJS.ProcessEnv['ENABLE_OFFLINE_MODE'];
}
