/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Ignore specific LogBox warnings
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
  'Require cycle:', // Ignore require cycles in node_modules
  'AsyncStorage has been extracted', // Ignore AsyncStorage migration warning
]);

// Register the app
AppRegistry.registerComponent(appName, () => App);

// Register web-specific entry point
if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('app');
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag,
  });
}
