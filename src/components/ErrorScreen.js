import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../constants/theme';

const ErrorScreen = ({ 
  message = 'Something went wrong', 
  onRetry,
  showRetry = true,
  icon = 'alert-circle'
}) => {
  return (
    <View style={styles.container}>
      <Icon 
        name={icon} 
        size={64} 
        color={theme.colors.error} 
        style={styles.icon}
      />
      <Text style={styles.message}>{message}</Text>
      {showRetry && onRetry && (
        <Button 
          mode="contained" 
          onPress={onRetry}
          style={styles.retryButton}
          icon="refresh"
        >
          Try Again
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },
  icon: {
    marginBottom: theme.spacing.md,
  },
  message: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  retryButton: {
    minWidth: 150,
  },
});

export default ErrorScreen;
