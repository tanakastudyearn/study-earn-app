declare global {
  namespace NodeJS {
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
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
