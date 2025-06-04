import { Alert } from 'react-native';
import StorageService from './storage';
import { walletAPI } from './api';

// Points configuration
const POINTS_CONFIG = {
  // Learning activities
  COURSE_COMPLETION: 100,
  LESSON_COMPLETION: 20,
  QUIZ_COMPLETION: 30,
  PERFECT_QUIZ_SCORE: 50,
  DAILY_LOGIN: 10,
  STREAK_BONUS: 20, // Additional points for maintaining streak

  // Content creation
  CONTENT_UPLOAD: 50,
  CONTENT_APPROVED: 100,
  CONTENT_VIEW: 1,
  CONTENT_DOWNLOAD: 5,
  CONTENT_LIKE: 2,

  // Engagement
  COMMENT: 5,
  HELPFUL_COMMENT_VOTE: 2,
  SHARE_CONTENT: 10,

  // Ad engagement
  WATCH_REWARDED_AD: 20,

  // Conversion rates
  POINTS_TO_CURRENCY: 0.01, // 100 points = $1
  MINIMUM_WITHDRAWAL: 500, // Minimum points needed for withdrawal
};

class PointsService {
  static async awardPoints(type, data = {}) {
    try {
      let pointsToAward = 0;
      let reason = '';

      switch (type) {
        case 'COURSE_COMPLETION':
          pointsToAward = POINTS_CONFIG.COURSE_COMPLETION;
          reason = `Completed course: ${data.courseName}`;
          break;

        case 'LESSON_COMPLETION':
          pointsToAward = POINTS_CONFIG.LESSON_COMPLETION;
          reason = `Completed lesson: ${data.lessonName}`;
          break;

        case 'QUIZ_COMPLETION':
          pointsToAward = POINTS_CONFIG.QUIZ_COMPLETION;
          if (data.score === 100) {
            pointsToAward += POINTS_CONFIG.PERFECT_QUIZ_SCORE;
          }
          reason = `Completed quiz with score: ${data.score}%`;
          break;

        case 'CONTENT_UPLOAD':
          pointsToAward = POINTS_CONFIG.CONTENT_UPLOAD;
          reason = 'Uploaded educational content';
          break;

        case 'CONTENT_APPROVED':
          pointsToAward = POINTS_CONFIG.CONTENT_APPROVED;
          reason = 'Content approved by moderators';
          break;

        case 'WATCH_REWARDED_AD':
          pointsToAward = POINTS_CONFIG.WATCH_REWARDED_AD;
          reason = 'Watched rewarded advertisement';
          break;

        default:
          console.warn('Unknown points type:', type);
          return;
      }

      // Get current points from storage
      const profile = await StorageService.getUserProfile();
      const currentPoints = profile?.points || 0;
      const newTotal = currentPoints + pointsToAward;

      // Update points in storage and API
      await this.updatePoints(newTotal, {
        type,
        amount: pointsToAward,
        reason,
        timestamp: new Date().toISOString(),
      });

      // Show success message
      Alert.alert(
        'Points Earned!',
        `You earned ${pointsToAward} points for ${reason.toLowerCase()}`
      );

      return pointsToAward;
    } catch (error) {
      console.error('Error awarding points:', error);
      throw error;
    }
  }

  static async updatePoints(newTotal, transaction) {
    try {
      // Update local storage
      const profile = await StorageService.getUserProfile();
      await StorageService.setUserProfile({
        ...profile,
        points: newTotal,
      });

      // Add transaction to history
      const transactions = await this.getTransactionHistory();
      transactions.unshift(transaction);
      await StorageService.setSettings({
        ...await StorageService.getSettings(),
        pointsTransactions: transactions,
      });

      // Sync with backend
      // await walletAPI.updatePoints(newTotal, transaction);
    } catch (error) {
      console.error('Error updating points:', error);
      throw error;
    }
  }

  static async getTransactionHistory() {
    try {
      const settings = await StorageService.getSettings();
      return settings.pointsTransactions || [];
    } catch (error) {
      console.error('Error getting transaction history:', error);
      return [];
    }
  }

  static async calculateEarnings(points) {
    return points * POINTS_CONFIG.POINTS_TO_CURRENCY;
  }

  static async canWithdraw(points) {
    return points >= POINTS_CONFIG.MINIMUM_WITHDRAWAL;
  }

  static async processWithdrawal(amount, paymentMethod) {
    try {
      const profile = await StorageService.getUserProfile();
      const currentPoints = profile?.points || 0;
      const pointsNeeded = Math.ceil(amount / POINTS_CONFIG.POINTS_TO_CURRENCY);

      if (currentPoints < pointsNeeded) {
        throw new Error('Insufficient points for withdrawal');
      }

      // Process withdrawal through API
      await walletAPI.withdraw(amount, paymentMethod);

      // Update local points
      const newTotal = currentPoints - pointsNeeded;
      await this.updatePoints(newTotal, {
        type: 'WITHDRAWAL',
        amount: -pointsNeeded,
        reason: `Withdrawal of $${amount} via ${paymentMethod}`,
        timestamp: new Date().toISOString(),
      });

      return {
        success: true,
        remainingPoints: newTotal,
        withdrawnAmount: amount,
      };
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      throw error;
    }
  }

  static getPointsConfig() {
    return POINTS_CONFIG;
  }

  // Streak management
  static async updateStreak() {
    try {
      const settings = await StorageService.getSettings();
      const lastLogin = new Date(settings.lastLogin || 0);
      const today = new Date();
      
      // Check if last login was yesterday
      const isConsecutiveDay = 
        lastLogin.getDate() === today.getDate() - 1 &&
        lastLogin.getMonth() === today.getMonth() &&
        lastLogin.getFullYear() === today.getFullYear();

      if (isConsecutiveDay) {
        const currentStreak = (settings.loginStreak || 0) + 1;
        await StorageService.setSettings({
          ...settings,
          loginStreak: currentStreak,
          lastLogin: today.toISOString(),
        });

        // Award streak bonus every 5 days
        if (currentStreak % 5 === 0) {
          await this.awardPoints('STREAK_BONUS', {
            streak: currentStreak,
          });
        }

        return currentStreak;
      } else {
        // Reset streak
        await StorageService.setSettings({
          ...settings,
          loginStreak: 1,
          lastLogin: today.toISOString(),
        });
        return 1;
      }
    } catch (error) {
      console.error('Error updating streak:', error);
      return 1;
    }
  }
}

export default PointsService;
