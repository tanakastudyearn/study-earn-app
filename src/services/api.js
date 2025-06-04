import { Alert } from 'react-native';

const BASE_URL = 'https://api.example.com'; // Replace with your actual API URL

// Utility function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Authentication APIs
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },
};

// Course APIs
export const courseAPI = {
  getAllCourses: async (filters = {}) => {
    try {
      const queryString = new URLSearchParams(filters).toString();
      const response = await fetch(`${BASE_URL}/courses?${queryString}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Get courses error:', error);
      throw error;
    }
  },

  getCourseById: async (courseId) => {
    try {
      const response = await fetch(`${BASE_URL}/courses/${courseId}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Get course error:', error);
      throw error;
    }
  },

  updateProgress: async (courseId, progress) => {
    try {
      const response = await fetch(`${BASE_URL}/courses/${courseId}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Update progress error:', error);
      throw error;
    }
  },
};

// Upload APIs
export const uploadAPI = {
  uploadFile: async (file, metadata) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      Object.keys(metadata).forEach(key => {
        formData.append(key, metadata[key]);
      });

      const response = await fetch(`${BASE_URL}/uploads`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },

  getUploads: async () => {
    try {
      const response = await fetch(`${BASE_URL}/uploads`);
      return handleResponse(response);
    } catch (error) {
      console.error('Get uploads error:', error);
      throw error;
    }
  },
};

// Wallet APIs
export const walletAPI = {
  getBalance: async () => {
    try {
      const response = await fetch(`${BASE_URL}/wallet/balance`);
      return handleResponse(response);
    } catch (error) {
      console.error('Get balance error:', error);
      throw error;
    }
  },

  getTransactions: async () => {
    try {
      const response = await fetch(`${BASE_URL}/wallet/transactions`);
      return handleResponse(response);
    } catch (error) {
      console.error('Get transactions error:', error);
      throw error;
    }
  },

  withdraw: async (amount, paymentMethod) => {
    try {
      const response = await fetch(`${BASE_URL}/wallet/withdraw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, paymentMethod }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Withdrawal error:', error);
      throw error;
    }
  },
};

// Profile APIs
export const profileAPI = {
  getProfile: async () => {
    try {
      const response = await fetch(`${BASE_URL}/profile`);
      return handleResponse(response);
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await fetch(`${BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  updateAvatar: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('avatar', imageFile);

      const response = await fetch(`${BASE_URL}/profile/avatar`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Update avatar error:', error);
      throw error;
    }
  },
};

// Error handling middleware
export const handleAPIError = (error) => {
  const message = error.message || 'Something went wrong. Please try again.';
  Alert.alert('Error', message);
  return Promise.reject(error);
};
