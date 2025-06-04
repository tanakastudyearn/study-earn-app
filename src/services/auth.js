import { Alert } from 'react-native';
import { authAPI } from './api';
import StorageService from './storage';
import PointsService from './points';

class AuthService {
  static isAuthenticated = false;
  static authToken = null;

  // Initialize auth state
  static async initialize() {
    try {
      const token = await StorageService.getAuthToken();
      if (token) {
        this.authToken = token;
        this.isAuthenticated = true;
        // Update login streak
        await PointsService.updateStreak();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error initializing auth:', error);
      return false;
    }
  }

  // Login
  static async login(email, password) {
    try {
      // Validate input
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Call login API
      const response = await authAPI.login(email, password);
      
      // Save auth token
      await StorageService.setAuthToken(response.token);
      this.authToken = response.token;
      this.isAuthenticated = true;

      // Save user profile
      await StorageService.setUserProfile(response.user);

      // Award daily login points
      await PointsService.awardPoints('DAILY_LOGIN');

      return response.user;
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Failed',
        error.message || 'Please check your credentials and try again'
      );
      throw error;
    }
  }

  // Register
  static async register(userData) {
    try {
      // Validate required fields
      const requiredFields = ['email', 'password', 'name'];
      requiredFields.forEach(field => {
        if (!userData[field]) {
          throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        }
      });

      // Validate password strength
      if (userData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Call register API
      const response = await authAPI.register(userData);
      
      // Auto login after registration
      return await this.login(userData.email, userData.password);
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert(
        'Registration Failed',
        error.message || 'Unable to create account. Please try again.'
      );
      throw error;
    }
  }

  // Logout
  static async logout() {
    try {
      // Clear auth token
      await StorageService.removeAuthToken();
      
      // Clear user data
      await StorageService.clearUserData();
      
      // Reset auth state
      this.authToken = null;
      this.isAuthenticated = false;

      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // Password Reset
  static async forgotPassword(email) {
    try {
      if (!email) {
        throw new Error('Email is required');
      }

      await authAPI.forgotPassword(email);
      
      Alert.alert(
        'Reset Email Sent',
        'Please check your email for password reset instructions'
      );
    } catch (error) {
      console.error('Password reset error:', error);
      Alert.alert(
        'Password Reset Failed',
        error.message || 'Unable to send reset email. Please try again.'
      );
      throw error;
    }
  }

  // Get current user
  static async getCurrentUser() {
    try {
      return await StorageService.getUserProfile();
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Update user profile
  static async updateProfile(profileData) {
    try {
      // Get current profile
      const currentProfile = await this.getCurrentUser();
      
      // Merge with new data
      const updatedProfile = {
        ...currentProfile,
        ...profileData,
        updatedAt: new Date().toISOString(),
      };

      // Save to storage
      await StorageService.setUserProfile(updatedProfile);

      // Update on server
      await authAPI.updateProfile(updatedProfile);

      return updatedProfile;
    } catch (error) {
      console.error('Profile update error:', error);
      Alert.alert(
        'Update Failed',
        error.message || 'Unable to update profile. Please try again.'
      );
      throw error;
    }
  }

  // Check auth status
  static isLoggedIn() {
    return this.isAuthenticated && !!this.authToken;
  }

  // Get auth token
  static getToken() {
    return this.authToken;
  }

  // Refresh token
  static async refreshToken() {
    try {
      // Implement token refresh logic here
      // This would typically involve calling an API endpoint with the refresh token
      // and getting a new access token
      
      // For now, just check if the current token exists
      const token = await StorageService.getAuthToken();
      if (!token) {
        throw new Error('No refresh token available');
      }

      // Update auth state
      this.authToken = token;
      this.isAuthenticated = true;

      return token;
    } catch (error) {
      console.error('Token refresh error:', error);
      // If refresh fails, log out the user
      await this.logout();
      throw error;
    }
  }

  // Social Authentication
  static async socialAuth(provider, token) {
    try {
      // Implement social auth logic here
      // This would typically involve verifying the token with the provider
      // and then either logging in or creating a new account

      throw new Error('Social authentication not implemented');
    } catch (error) {
      console.error('Social auth error:', error);
      Alert.alert(
        'Authentication Failed',
        error.message || 'Unable to authenticate with social provider'
      );
      throw error;
    }
  }

  // Session Management
  static async validateSession() {
    try {
      if (!this.isAuthenticated || !this.authToken) {
        return false;
      }

      // Add logic to validate token expiration
      // For now, just check if token exists
      return true;
    } catch (error) {
      console.error('Session validation error:', error);
      return false;
    }
  }
}

export default AuthService;
