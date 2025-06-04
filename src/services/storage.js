import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_PROFILE: '@user_profile',
  SETTINGS: '@app_settings',
  COURSE_PROGRESS: '@course_progress',
  CACHED_COURSES: '@cached_courses',
  LAST_SYNC: '@last_sync',
};

class StorageService {
  // Authentication
  static setAuthToken = async (token) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Error saving auth token:', error);
      throw error;
    }
  };

  static getAuthToken = async () => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  };

  static removeAuthToken = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error removing auth token:', error);
      throw error;
    }
  };

  // User Profile
  static setUserProfile = async (profile) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER_PROFILE,
        JSON.stringify(profile)
      );
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  };

  static getUserProfile = async () => {
    try {
      const profile = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return profile ? JSON.parse(profile) : null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  };

  // App Settings
  static setSettings = async (settings) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.SETTINGS,
        JSON.stringify(settings)
      );
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  };

  static getSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : {
        notifications: true,
        darkMode: false,
        language: 'en',
      };
    } catch (error) {
      console.error('Error getting settings:', error);
      return null;
    }
  };

  // Course Progress
  static setCourseProgress = async (courseId, progress) => {
    try {
      const key = `${STORAGE_KEYS.COURSE_PROGRESS}_${courseId}`;
      await AsyncStorage.setItem(key, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving course progress:', error);
      throw error;
    }
  };

  static getCourseProgress = async (courseId) => {
    try {
      const key = `${STORAGE_KEYS.COURSE_PROGRESS}_${courseId}`;
      const progress = await AsyncStorage.getItem(key);
      return progress ? JSON.parse(progress) : null;
    } catch (error) {
      console.error('Error getting course progress:', error);
      return null;
    }
  };

  // Cache Management
  static setCachedCourses = async (courses) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.CACHED_COURSES,
        JSON.stringify(courses)
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.LAST_SYNC,
        new Date().toISOString()
      );
    } catch (error) {
      console.error('Error caching courses:', error);
      throw error;
    }
  };

  static getCachedCourses = async () => {
    try {
      const courses = await AsyncStorage.getItem(STORAGE_KEYS.CACHED_COURSES);
      return courses ? JSON.parse(courses) : [];
    } catch (error) {
      console.error('Error getting cached courses:', error);
      return [];
    }
  };

  static getLastSyncTime = async () => {
    try {
      const lastSync = await AsyncStorage.getItem(STORAGE_KEYS.LAST_SYNC);
      return lastSync ? new Date(lastSync) : null;
    } catch (error) {
      console.error('Error getting last sync time:', error);
      return null;
    }
  };

  // Clear All Data
  static clearAll = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  };

  // Clear Specific Data
  static clearUserData = async () => {
    try {
      const keysToRemove = [
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_PROFILE,
        STORAGE_KEYS.COURSE_PROGRESS,
        STORAGE_KEYS.CACHED_COURSES,
        STORAGE_KEYS.LAST_SYNC,
      ];
      await AsyncStorage.multiRemove(keysToRemove);
    } catch (error) {
      console.error('Error clearing user data:', error);
      throw error;
    }
  };

  // Storage Space Management
  static getStorageUsage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      const usage = items.reduce((total, [key, value]) => {
        return total + (value ? value.length : 0);
      }, 0);
      return usage; // Returns size in bytes
    } catch (error) {
      console.error('Error calculating storage usage:', error);
      return 0;
    }
  };

  // Check if storage needs cleanup (over 5MB)
  static checkStorageCleanup = async () => {
    const STORAGE_LIMIT = 5 * 1024 * 1024; // 5MB
    const usage = await this.getStorageUsage();
    if (usage > STORAGE_LIMIT) {
      // Clear cached data but keep essential user data
      const keysToRemove = [
        STORAGE_KEYS.CACHED_COURSES,
        STORAGE_KEYS.LAST_SYNC,
      ];
      await AsyncStorage.multiRemove(keysToRemove);
    }
  };
}

export default StorageService;
