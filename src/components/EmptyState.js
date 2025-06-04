import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../constants/theme';

const EmptyState = ({ 
  title = 'No Content',
  message = 'Nothing to display at the moment',
  icon = 'documents-outline',
  action,
  actionLabel,
  imageUrl
}) => {
  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <Icon 
          name={icon} 
          size={80} 
          color={theme.colors.textSecondary}
          style={styles.icon}
        />
      )}
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      
      {action && actionLabel && (
        <Button 
          mode="contained"
          onPress={action}
          style={styles.button}
        >
          {actionLabel}
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
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
    minHeight: 300,
  },
  icon: {
    marginBottom: theme.spacing.lg,
    opacity: 0.8,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  button: {
    minWidth: 200,
  },
});

export default EmptyState;
