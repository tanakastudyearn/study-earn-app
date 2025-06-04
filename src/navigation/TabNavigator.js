import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../constants/theme';

// Screens
import HomeScreen from '../screens/HomeScreen';
import StudyScreen from '../screens/StudyScreen';
import UploadScreen from '../screens/UploadScreen';
import WalletScreen from '../screens/WalletScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ConfigTestScreen from '../screens/ConfigTestScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { user } = useAuth();

  const getTabBarIcon = (route, focused, color, size) => {
    let iconName;

    switch (route.name) {
      case 'Home':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'Study':
        iconName = focused ? 'book' : 'book-outline';
        break;
      case 'Upload':
        iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
        break;
      case 'Wallet':
        iconName = focused ? 'wallet' : 'wallet-outline';
        break;
      case 'Profile':
        iconName = focused ? 'person' : 'person-outline';
        break;
      case 'Config':
        iconName = focused ? 'settings' : 'settings-outline';
        break;
      default:
        iconName = 'help-outline';
    }

    return (
      <>
        <Icon name={iconName} size={size} color={color} />
        {route.name === 'Wallet' && user?.pendingPoints > 0 && (
          <Badge
            size={16}
            style={{
              position: 'absolute',
              top: -5,
              right: -10,
              backgroundColor: theme.colors.notification,
            }}
          >
            {user.pendingPoints > 99 ? '99+' : user.pendingPoints}
          </Badge>
        )}
      </>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => 
          getTabBarIcon(route, focused, color, size),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen 
        name="Study" 
        component={StudyScreen}
        options={{
          title: 'Study',
        }}
      />
      <Tab.Screen 
        name="Upload" 
        component={UploadScreen}
        options={{
          title: 'Upload',
        }}
      />
      <Tab.Screen 
        name="Wallet" 
        component={WalletScreen}
        options={{
          title: 'Wallet',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Tab.Screen 
        name="Config" 
        component={ConfigTestScreen}
        options={{
          title: 'Config Test',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
