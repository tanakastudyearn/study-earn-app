import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  List, 
  Switch, 
  Divider, 
  Button, 
  Portal, 
  Modal, 
  Text,
  Title,
  TextInput 
} from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import StorageService from '../services/storage';
import { Header } from '../components';
import { theme } from '../constants/theme';

const SettingsScreen = ({ navigation }) => {
  const { logout, user } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    darkMode: false,
    soundEffects: true,
    autoPlay: true,
    downloadOverWifi: true,
    language: 'English',
  });
  
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showStorageModal, setShowStorageModal] = useState(false);
  const [storageUsage, setStorageUsage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSettingChange = async (setting, value) => {
    try {
      const updatedSettings = {
        ...settings,
        [setting]: value,
      };
      setSettings(updatedSettings);
      await StorageService.setSettings(updatedSettings);
    } catch (error) {
      console.error('Error updating settings:', error);
      Alert.alert('Error', 'Failed to update settings');
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await logout();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout');
            }
          },
        },
      ],
    );
  };

  const handleClearCache = async () => {
    try {
      setLoading(true);
      await StorageService.clearAll();
      Alert.alert('Success', 'Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
      Alert.alert('Error', 'Failed to clear cache');
    } finally {
      setLoading(false);
      setShowStorageModal(false);
    }
  };

  const checkStorageUsage = async () => {
    try {
      const usage = await StorageService.getStorageUsage();
      setStorageUsage(usage);
      setShowStorageModal(true);
    } catch (error) {
      console.error('Error checking storage:', error);
      Alert.alert('Error', 'Failed to check storage usage');
    }
  };

  const renderNotificationSettings = () => (
    <>
      <List.Item
        title="Push Notifications"
        description="Receive updates and reminders"
        right={() => (
          <Switch
            value={settings.notifications}
            onValueChange={(value) => handleSettingChange('notifications', value)}
          />
        )}
      />
      <Divider />
      <List.Item
        title="Email Updates"
        description="Receive email newsletters"
        right={() => (
          <Switch
            value={settings.emailUpdates}
            onValueChange={(value) => handleSettingChange('emailUpdates', value)}
          />
        )}
      />
    </>
  );

  const renderAppSettings = () => (
    <>
      <List.Item
        title="Dark Mode"
        description="Use dark theme"
        right={() => (
          <Switch
            value={settings.darkMode}
            onValueChange={(value) => handleSettingChange('darkMode', value)}
          />
        )}
      />
      <Divider />
      <List.Item
        title="Sound Effects"
        description="Play sounds for actions"
        right={() => (
          <Switch
            value={settings.soundEffects}
            onValueChange={(value) => handleSettingChange('soundEffects', value)}
          />
        )}
      />
      <Divider />
      <List.Item
        title="Auto-play Videos"
        description="Automatically play lesson videos"
        right={() => (
          <Switch
            value={settings.autoPlay}
            onValueChange={(value) => handleSettingChange('autoPlay', value)}
          />
        )}
      />
      <Divider />
      <List.Item
        title="Download over Wi-Fi only"
        description="Save mobile data"
        right={() => (
          <Switch
            value={settings.downloadOverWifi}
            onValueChange={(value) => handleSettingChange('downloadOverWifi', value)}
          />
        )}
      />
    </>
  );

  const renderStorageModal = () => (
    <Portal>
      <Modal
        visible={showStorageModal}
        onDismiss={() => setShowStorageModal(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <Title style={styles.modalTitle}>Storage Usage</Title>
        <Text style={styles.storageText}>
          Used Space: {(storageUsage / 1024 / 1024).toFixed(2)} MB
        </Text>
        <Button
          mode="contained"
          onPress={handleClearCache}
          loading={loading}
          style={styles.clearButton}
        >
          Clear Cache
        </Button>
        <Button
          mode="text"
          onPress={() => setShowStorageModal(false)}
          style={styles.cancelButton}
        >
          Close
        </Button>
      </Modal>
    </Portal>
  );

  return (
    <View style={styles.container}>
      <Header title="Settings" showBack navigation={navigation} />
      
      <ScrollView>
        <List.Section>
          <List.Subheader>Notifications</List.Subheader>
          {renderNotificationSettings()}
        </List.Section>

        <List.Section>
          <List.Subheader>App Settings</List.Subheader>
          {renderAppSettings()}
        </List.Section>

        <List.Section>
          <List.Subheader>Language & Storage</List.Subheader>
          <List.Item
            title="Language"
            description={settings.language}
            onPress={() => setShowLanguageModal(true)}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Storage & Cache"
            description="Manage app storage"
            onPress={checkStorageUsage}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </List.Section>

        <List.Section>
          <List.Subheader>About</List.Subheader>
          <List.Item
            title="Privacy Policy"
            onPress={() => {/* Navigate to Privacy Policy */}}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Terms of Service"
            onPress={() => {/* Navigate to Terms */}}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="App Version"
            description="1.0.0"
          />
        </List.Section>

        <View style={styles.logoutContainer}>
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
            icon="logout"
          >
            Logout
          </Button>
        </View>
      </ScrollView>

      {renderStorageModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  logoutContainer: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  logoutButton: {
    borderColor: theme.colors.error,
    borderWidth: 1,
  },
  modalContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.xl,
    margin: theme.spacing.lg,
    borderRadius: theme.roundness,
  },
  modalTitle: {
    marginBottom: theme.spacing.lg,
  },
  storageText: {
    marginBottom: theme.spacing.xl,
    fontSize: 16,
  },
  clearButton: {
    marginBottom: theme.spacing.md,
  },
  cancelButton: {
    marginTop: theme.spacing.sm,
  },
});

export default SettingsScreen;
