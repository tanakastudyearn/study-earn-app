import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-paper
jest.mock('react-native-paper', () => {
  const actual = jest.requireActual('react-native-paper');
  return {
    ...actual,
    useTheme: () => ({
      colors: {
        primary: '#2563EB',
        background: '#FFFFFF',
        surface: '#F8FAFC',
        text: '#1E293B',
        error: '#EF4444',
        // Add other colors as needed
      },
    }),
  };
});

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// Mock react-native-video
jest.mock('react-native-video', () => 'Video');

// Mock react-native-admob
jest.mock('react-native-admob', () => ({
  AdMobBanner: 'AdMobBanner',
  AdMobInterstitial: {
    setAdUnitID: jest.fn(),
    setTestDevices: jest.fn(),
    requestAd: jest.fn(),
    showAd: jest.fn(),
  },
  AdMobRewarded: {
    setAdUnitID: jest.fn(),
    requestAd: jest.fn(),
    showAd: jest.fn(),
  },
}));

// Global mocks
global.__reanimatedWorkletInit = jest.fn();
global.window = {};
global.window = global;
global.ReanimatedDataMock = {
  now: () => 0,
};

// Mock console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Please update the following components:') ||
      args[0].includes('Warning:'))
  ) {
    return;
  }
  originalConsoleError.call(console, ...args);
};

console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('componentWillReceiveProps') ||
      args[0].includes('componentWillMount'))
  ) {
    return;
  }
  originalConsoleWarn.call(console, ...args);
};

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

// Mock dimensions
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Mock platform
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: obj => obj.ios,
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Setup for handling React Navigation testing
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      setOptions: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
  };
});

// Add any custom matchers
expect.extend({
  toHaveTextContent(received, text) {
    const textContent = received.props.children;
    const pass = textContent === text;
    return {
      pass,
      message: () =>
        `expected ${received} to have text content "${text}", but received "${textContent}"`,
    };
  },
});
