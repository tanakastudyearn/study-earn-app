module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|react-native-paper' +
      '|react-native-vector-icons' +
      '|react-native-safe-area-context' +
      '|@react-native-community' +
      ')/)',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '^@components/(.*)': '<rootDir>/src/components/$1',
    '^@screens/(.*)': '<rootDir>/src/screens/$1',
    '^@navigation/(.*)': '<rootDir>/src/navigation/$1',
    '^@services/(.*)': '<rootDir>/src/services/$1',
    '^@contexts/(.*)': '<rootDir>/src/contexts/$1',
    '^@constants/(.*)': '<rootDir>/src/constants/$1',
    '^@assets/(.*)': '<rootDir>/src/assets/$1',
    '^@utils/(.*)': '<rootDir>/src/utils/$1',
    '^@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '^@types/(.*)': '<rootDir>/src/types/$1',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/android/',
    '<rootDir>/ios/',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**/*',
    '!src/**/__mocks__/**/*',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  globals: {
    __DEV__: true,
  },
  clearMocks: true,
  resetMocks: false,
  restoreMocks: true,
  timers: 'modern',
  verbose: true,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
