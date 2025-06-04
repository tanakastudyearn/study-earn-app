import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import APP_CONFIG from '../constants/config';

export const ConfigTest = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Environment Configuration Test</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>API Configuration:</Text>
        <Text>Base URL: {APP_CONFIG.API.BASE_URL}</Text>
        <Text>Version: {APP_CONFIG.API.VERSION}</Text>
        <Text>Timeout: {APP_CONFIG.API.TIMEOUT}ms</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feature Flags:</Text>
        <Text>Social Login: {APP_CONFIG.FEATURES.SOCIAL_LOGIN ? 'Enabled' : 'Disabled'}</Text>
        <Text>Biometric Auth: {APP_CONFIG.FEATURES.BIOMETRIC_AUTH ? 'Enabled' : 'Disabled'}</Text>
        <Text>Push Notifications: {APP_CONFIG.FEATURES.PUSH_NOTIFICATIONS ? 'Enabled' : 'Disabled'}</Text>
        <Text>Offline Mode: {APP_CONFIG.FEATURES.OFFLINE_MODE ? 'Enabled' : 'Disabled'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Points System:</Text>
        <Text>Min Withdrawal: {APP_CONFIG.POINTS.MIN_WITHDRAWAL}</Text>
        <Text>Conversion Rate: {APP_CONFIG.POINTS.CONVERSION_RATE}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ConfigTest;
