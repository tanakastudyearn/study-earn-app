import { Platform } from 'react-native';
import { AdMobRewarded, AdMobInterstitial, AdMobBanner } from 'react-native-admob';

// Replace these with your actual AdMob IDs
const AD_UNIT_IDS = {
  android: {
    banner: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyyyy',
    interstitial: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyyyy',
    rewarded: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyyyy',
  },
  ios: {
    banner: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyyyy',
    interstitial: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyyyy',
    rewarded: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyyyy',
  },
};

class AdService {
  static isInitialized = false;
  static lastInterstitialTime = 0;
  static interstitialCounter = 0;
  
  // Initialize AdMob
  static initialize = async () => {
    if (this.isInitialized) return;

    try {
      // Initialize Interstitial Ads
      await AdMobInterstitial.setAdUnitID(
        Platform.select({
          ios: AD_UNIT_IDS.ios.interstitial,
          android: AD_UNIT_IDS.android.interstitial,
        })
      );

      // Initialize Rewarded Ads
      await AdMobRewarded.setAdUnitID(
        Platform.select({
          ios: AD_UNIT_IDS.ios.rewarded,
          android: AD_UNIT_IDS.android.rewarded,
        })
      );

      this.isInitialized = true;
      console.log('AdMob initialized successfully');
    } catch (error) {
      console.error('Error initializing AdMob:', error);
      throw error;
    }
  };

  // Banner Ad Component Props
  static getBannerProps = () => ({
    adSize: "smartBannerPortrait",
    adUnitID: Platform.select({
      ios: AD_UNIT_IDS.ios.banner,
      android: AD_UNIT_IDS.android.banner,
    }),
    testDevices: [AdMobBanner.simulatorId],
    onAdFailedToLoad: (error) => console.error('Banner ad failed to load:', error),
  });

  // Show Interstitial Ad
  static showInterstitial = async () => {
    try {
      const now = Date.now();
      const MIN_INTERVAL = 60000; // Minimum 1 minute between ads
      const MAX_ADS_PER_SESSION = 10;

      // Check if we should show an ad
      if (
        now - this.lastInterstitialTime < MIN_INTERVAL ||
        this.interstitialCounter >= MAX_ADS_PER_SESSION
      ) {
        return false;
      }

      await AdMobInterstitial.requestAd();
      await AdMobInterstitial.showAd();
      
      this.lastInterstitialTime = now;
      this.interstitialCounter++;
      
      return true;
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
      return false;
    }
  };

  // Show Rewarded Ad
  static showRewardedAd = () => {
    return new Promise(async (resolve, reject) => {
      try {
        // Set up reward callback
        const rewardHandler = reward => {
          AdMobRewarded.removeEventListener('rewarded', rewardHandler);
          AdMobRewarded.removeEventListener('adClosed', closeHandler);
          resolve(reward);
        };

        // Set up close callback
        const closeHandler = () => {
          AdMobRewarded.removeEventListener('rewarded', rewardHandler);
          AdMobRewarded.removeEventListener('adClosed', closeHandler);
          resolve(null);
        };

        // Add event listeners
        AdMobRewarded.addEventListener('rewarded', rewardHandler);
        AdMobRewarded.addEventListener('adClosed', closeHandler);

        // Load and show the ad
        await AdMobRewarded.requestAd();
        await AdMobRewarded.showAd();
      } catch (error) {
        console.error('Error showing rewarded ad:', error);
        reject(error);
      }
    });
  };

  // Reset Counters
  static resetCounters = () => {
    this.interstitialCounter = 0;
    this.lastInterstitialTime = 0;
  };

  // Clean up
  static cleanup = async () => {
    try {
      await AdMobRewarded.removeAllListeners();
      await AdMobInterstitial.removeAllListeners();
      this.isInitialized = false;
    } catch (error) {
      console.error('Error cleaning up AdService:', error);
    }
  };

  // Check if ads should be shown (e.g., for premium users)
  static shouldShowAds = async () => {
    // Implement your logic here to check if the user is premium
    // For now, always return true
    return true;
  };

  // Get Banner Ad Height
  static getBannerHeight = () => {
    // Returns the height of the banner in pixels
    const screenWidth = Platform.select({
      ios: 320,
      android: 320,
    });
    
    return Platform.select({
      ios: screenWidth / 6.4, // Approximate banner height ratio
      android: 50, // Standard banner height
    });
  };

  // Track Ad Performance
  static trackAdImpression = async (adType) => {
    // Implement your analytics tracking here
    console.log(`Ad impression tracked: ${adType}`);
  };

  // Check if rewarded ad is ready
  static isRewardedAdReady = async () => {
    try {
      await AdMobRewarded.requestAd();
      return true;
    } catch (error) {
      return false;
    }
  };

  // Check if interstitial ad is ready
  static isInterstitialReady = async () => {
    try {
      await AdMobInterstitial.requestAd();
      return true;
    } catch (error) {
      return false;
    }
  };
}

export default AdService;
