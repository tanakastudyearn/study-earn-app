# Study & Earn App

A React Native mobile application that allows users to learn and earn rewards through educational content.

## Features

- 📚 Access educational courses and lessons
- 💰 Earn points by completing lessons and activities
- 📤 Upload and share educational content
- 👛 Convert points to real rewards
- 📱 Cross-platform (iOS & Android)

## Getting Started

### Prerequisites

- Node.js >= 16
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/study-earn-app.git
cd study-earn-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies:
```bash
cd ios && pod install && cd ..
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Run the app:
```bash
# For iOS
npm run ios
# or
yarn ios

# For Android
npm run android
# or
yarn android
```

## Project Structure

```
study-earn-app/
├── src/
│   ├── assets/         # Images, fonts, and other static files
│   ├── components/     # Reusable React components
│   ├── constants/      # Constants and configuration
│   ├── contexts/       # React Context providers
│   ├── navigation/     # Navigation configuration
│   ├── screens/        # Screen components
│   ├── services/       # API and business logic
│   └── utils/          # Utility functions
├── __tests__/         # Test files
├── android/           # Android-specific files
├── ios/              # iOS-specific files
└── ...
```

## Available Scripts

- `npm start` - Start the Metro bundler
- `npm run ios` - Run the iOS app
- `npm run android` - Run the Android app
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Environment Variables

The application uses environment variables for configuration. Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Available environment variables:

### API Configuration
```env
API_URL=https://api.example.com
API_VERSION=v1
API_TIMEOUT=30000
```

### Authentication
```env
AUTH_TOKEN_KEY=@auth_token
REFRESH_TOKEN_KEY=@refresh_token
```

### AdMob Configuration
```env
ADMOB_APP_ID_IOS=ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy
ADMOB_APP_ID_ANDROID=ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy
ADMOB_BANNER_ID_IOS=ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy
ADMOB_BANNER_ID_ANDROID=ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy
ADMOB_INTERSTITIAL_ID_IOS=ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy
ADMOB_INTERSTITIAL_ID_ANDROID=ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy
ADMOB_REWARDED_ID_IOS=ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy
ADMOB_REWARDED_ID_ANDROID=ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy
```

### Points System
```env
MIN_WITHDRAWAL_AMOUNT=500
POINTS_TO_CURRENCY_RATIO=0.01
```

### Feature Flags
```env
ENABLE_SOCIAL_LOGIN=false
ENABLE_BIOMETRIC_AUTH=false
ENABLE_PUSH_NOTIFICATIONS=true
ENABLE_OFFLINE_MODE=true
```

Note: The `.env` file is not committed to version control. Make sure to keep your API keys and sensitive information secure.

## Built With

- [React Native](https://reactnative.dev/) - Mobile framework
- [React Navigation](https://reactnavigation.org/) - Navigation
- [React Native Paper](https://callstack.github.io/react-native-paper/) - UI components
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Local storage
- [React Native Video](https://github.com/react-native-video/react-native-video) - Video playback
- [React Native Admob](https://github.com/sbugert/react-native-admob) - Ad integration

## Code Style

This project uses ESLint and Prettier for code formatting. Configuration files are included in the repository.

To maintain code quality:
- Follow the ESLint rules
- Write tests for new features
- Document new components and functions
- Use TypeScript for type safety

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors
- Inspired by educational platforms and reward systems
- Built with modern React Native best practices

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/study-earn-app](https://github.com/yourusername/study-earn-app)
