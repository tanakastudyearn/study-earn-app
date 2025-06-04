import React, { createContext, useState, useContext, useEffect } from 'react';
import PointsService from '../services/points';
import StorageService from '../services/storage';
import { useAuth } from './AuthContext';

const PointsContext = createContext(null);

export const PointsProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [points, setPoints] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize points data
  useEffect(() => {
    if (isAuthenticated) {
      initializePoints();
    }
  }, [isAuthenticated]);

  const initializePoints = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user profile with points
      const profile = await StorageService.getUserProfile();
      setPoints(profile?.points || 0);

      // Calculate earnings
      const calculatedEarnings = await PointsService.calculateEarnings(profile?.points || 0);
      setEarnings(calculatedEarnings);

      // Get transaction history
      const history = await PointsService.getTransactionHistory();
      setTransactions(history);
    } catch (error) {
      console.error('Points initialization error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const awardPoints = async (type, data) => {
    try {
      setLoading(true);
      setError(null);

      const earnedPoints = await PointsService.awardPoints(type, data);
      
      // Update local state
      setPoints(prevPoints => {
        const newTotal = prevPoints + earnedPoints;
        // Update earnings
        PointsService.calculateEarnings(newTotal).then(setEarnings);
        return newTotal;
      });

      // Refresh transaction history
      const updatedHistory = await PointsService.getTransactionHistory();
      setTransactions(updatedHistory);

      return earnedPoints;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const processWithdrawal = async (amount, paymentMethod) => {
    try {
      setLoading(true);
      setError(null);

      // Check if withdrawal is possible
      const canWithdraw = await PointsService.canWithdraw(points);
      if (!canWithdraw) {
        throw new Error('Insufficient points for withdrawal');
      }

      const result = await PointsService.processWithdrawal(amount, paymentMethod);
      
      // Update local state
      setPoints(result.remainingPoints);
      setEarnings(prev => prev - amount);

      // Refresh transaction history
      const updatedHistory = await PointsService.getTransactionHistory();
      setTransactions(updatedHistory);

      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getPointsConfig = () => {
    return PointsService.getPointsConfig();
  };

  const checkWithdrawalEligibility = async () => {
    return {
      canWithdraw: await PointsService.canWithdraw(points),
      minimumPoints: PointsService.getPointsConfig().MINIMUM_WITHDRAWAL,
      currentPoints: points,
      availableEarnings: earnings,
    };
  };

  const refreshPointsData = async () => {
    await initializePoints();
  };

  const value = {
    points,
    earnings,
    transactions,
    loading,
    error,
    awardPoints,
    processWithdrawal,
    getPointsConfig,
    checkWithdrawalEligibility,
    refreshPointsData,
  };

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  );
};

// Custom hook to use points context
export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};

// Utility hook to format points and earnings
export const usePointsFormatter = () => {
  const formatPoints = (amount) => {
    return new Intl.NumberFormat().format(amount);
  };

  const formatEarnings = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return {
    formatPoints,
    formatEarnings,
  };
};

export default PointsContext;
