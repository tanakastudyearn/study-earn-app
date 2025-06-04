import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navigation
import TabNavigator from './src/navigation/TabNavigator';

// Contexts
import { AuthProvider } from './src/contexts/AuthContext';
import { PointsProvider } from './src/contexts/PointsContext';
import { AdProvider } from './src/contexts/AdContext';

// Theme
import { theme } from './src/constants/theme';

// Auth Screens
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import ForgotPasswordScreen from './src/screens/auth/ForgotPasswordScreen';

// Additional Screens
import CourseDetailScreen from './src/screens/CourseDetailScreen';
import LessonScreen from './src/screens/LessonScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';

// Ignore specific LogBox warnings
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle="light-content"
        />
        <AuthProvider>
          <PointsProvider>
            <AdProvider>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: theme.colors.background }
                  }}
                >
                  <Stack.Group>
                    <Stack.Screen 
                      name="MainTabs" 
                      component={TabNavigator} 
                    />
                    <Stack.Screen 
                      name="CourseDetail" 
                      component={CourseDetailScreen}
                      options={{
                        headerShown: true,
                        title: '',
                        headerTransparent: true,
                      }}
                    />
                    <Stack.Screen 
                      name="Lesson" 
                      component={LessonScreen}
                      options={{
                        headerShown: true,
                        headerTransparent: true,
                      }}
                    />
                    <Stack.Screen 
                      name="Settings" 
                      component={SettingsScreen}
                      options={{
                        headerShown: true,
                        title: 'Settings',
                      }}
                    />
                    <Stack.Screen 
                      name="Notifications" 
                      component={NotificationsScreen}
                      options={{
                        headerShown: true,
                        title: 'Notifications',
                      }}
                    />
                  </Stack.Group>

                  <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen 
                      name="Login" 
                      component={LoginScreen}
                    />
                    <Stack.Screen 
                      name="Register" 
                      component={RegisterScreen}
                    />
                    <Stack.Screen 
                      name="ForgotPassword" 
                      component={ForgotPasswordScreen}
                    />
                  </Stack.Group>
                </Stack.Navigator>
              </NavigationContainer>
            </AdProvider>
          </PointsProvider>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
