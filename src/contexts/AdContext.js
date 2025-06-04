import React, { createContext, useState, useContext, useEffect } from 'react';
import AdService from '../services/ads';
import { usePoints } from './PointsContext';
import { Alert } from 'react-native';

const AdContext = createContext(null);

export const AdProvider = ({ children }) => {
  const { awardPoints } = usePoints();
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastAdTime, setLastAdTime] = useState(0);
  const [adFrequency, setAdFrequency] = useState({
    interstitial: 300000, // 5 minutes between interstitial ads
    rewarded: 60000, // 1 minute between rewarded ads
  });

  // Initialize AdMob
  useEffect(() => {
    initializeAds();
  }, []);

  const initializeAds = async () => {
    try {
      setLoading(true);
      await AdService.initialize();
      setIsInitialized(true);
    } catch (error) {
      console.error('Ad initialization error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const canShowAd = (adType) => {
    const now = Date.now();
    const timeSinceLastAd = now - lastAdTime;
    return timeSinceLastAd >= adFrequency[adType];
  };

  const showInterstitial = async () => {
    try {
      if (!isInitialized) {
        throw new Error('Ad service not initialized');
      }

      if (!canShowAd('interstitial')) {
        console.log('Too soon to show another interstitial ad');
        return false;
      }

      setLoading(true);
      const shown = await AdService.showInterstitial();
      
      if (shown) {
        setLastAdTime(Date.now());
        await AdService.trackAdImpression('interstitial');
      }

      return shown;
    } catch (error) {
      console.error('Show interstitial error:', error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const showRewardedAd = async () => {
    try {
      if (!isInitialized) {
        throw new Error('Ad service not initialized');
      }

      if (!canShowAd('rewarded')) {
        Alert.alert(
          'Ad Not Available',
          'Please wait a moment before watching another ad.'
        );
        return false;
      }

      setLoading(true);
      
      // Check if rewarded ad is ready
      const isReady = await AdService.isRewardedAdReady();
      if (!isReady) {
        throw new Error('Rewarded ad not ready');
      }

      // Show the ad
      const reward = await AdService.showRewardedAd();
      
      if (reward) {
        setLastAdTime(Date.now());
        await AdService.trackAdImpression('rewarded');
        
        // Award points for watching the ad
        await awardPoints('WATCH_REWARDED_AD', {
          adType: 'rewarded',
          timestamp: new Date().toISOString(),
        });

        return true;
      }

      return false;
    } catch (error) {
      console.error('Show rewarded ad error:', error);
      setError(error.message);
      Alert.alert(
        'Ad Error',
        'Unable to show ad at this time. Please try again later.'
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getBannerProps = () => {
    if (!isInitialized) {
      return null;
    }
    return AdService.getBannerProps();
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (isInitialized) {
        AdService.cleanup();
      }
    };
  }, [isInitialized]);

  const value = {
    loading,
    error,
    isInitialized,
    showInterstitial,
    showRewardedAd,
    getBannerProps,
    adFrequency,
    setAdFrequency,
  };

  return (
    <AdContext.Provider value={value}>
      {children}
    </AdContext.Provider>
  );
};

// Custom hook to use ad context
export const useAds = () => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAds must be used within an AdProvider');
  }
  return context;
};

// Banner Ad Component
export const BannerAd = ({ style }) => {
  const { getBannerProps } = useAds();
  const bannerProps = getBannerProps();

  if (!bannerProps) {
    return null;
  }

  const { AdMobBanner } = require('react-native-admob');

  return (
    <AdMobBanner
      {...bannerProps}
      style={style}
    />
  );
};

export default AdContext;
