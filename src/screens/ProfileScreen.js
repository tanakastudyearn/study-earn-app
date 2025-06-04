import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  Title, 
  TextInput,
  Avatar,
  List,
  Switch,
  Divider 
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme, styles as globalStyles } from '../constants/theme';

const ProfileScreen = () => {
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    educationLevel: 'University',
    subjects: ['Mathematics', 'Physics'],
    notifications: true,
    darkMode: false
  });

  const renderProfileHeader = () => (
    <Card style={styles.headerCard}>
      <Card.Content style={styles.headerContent}>
        <Avatar.Image 
          size={100} 
          source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }} 
          style={styles.avatar}
        />
        <View style={styles.headerInfo}>
          <Title style={styles.name}>{profileData.name}</Title>
          <Text style={styles.email}>{profileData.email}</Text>
          <Button 
            mode="contained" 
            onPress={() => setEditing(!editing)}
            style={styles.editButton}
          >
            {editing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  const renderProfileDetails = () => (
    <Card style={styles.detailsCard}>
      <Card.Content>
        <Title style={styles.sectionTitle}>Profile Details</Title>
        
        <TextInput
          label="Full Name"
          value={profileData.name}
          onChangeText={(text) => setProfileData({...profileData, name: text})}
          mode="outlined"
          disabled={!editing}
          style={styles.input}
        />

        <TextInput
          label="Email"
          value={profileData.email}
          onChangeText={(text) => setProfileData({...profileData, email: text})}
          mode="outlined"
          disabled={!editing}
          style={styles.input}
        />

        <TextInput
          label="Education Level"
          value={profileData.educationLevel}
          onChangeText={(text) => setProfileData({...profileData, educationLevel: text})}
          mode="outlined"
          disabled={!editing}
          style={styles.input}
        />

        <Title style={styles.subsectionTitle}>Preferred Subjects</Title>
        <View style={styles.subjectsContainer}>
          {profileData.subjects.map((subject, index) => (
            <Button 
              key={index}
              mode="outlined"
              style={styles.subjectChip}
              disabled={!editing}
            >
              {subject}
            </Button>
          ))}
          {editing && (
            <Button 
              mode="outlined" 
              icon="plus" 
              onPress={() => {/* Add subject */}}
              style={styles.addSubjectButton}
            >
              Add Subject
            </Button>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  const renderSettings = () => (
    <Card style={styles.settingsCard}>
      <Card.Content>
        <Title style={styles.sectionTitle}>Settings</Title>
        
        <List.Item
          title="Push Notifications"
          right={() => (
            <Switch
              value={profileData.notifications}
              onValueChange={(value) => 
                setProfileData({...profileData, notifications: value})
              }
            />
          )}
        />
        <Divider />
        <List.Item
          title="Dark Mode"
          right={() => (
            <Switch
              value={profileData.darkMode}
              onValueChange={(value) => 
                setProfileData({...profileData, darkMode: value})
              }
            />
          )}
        />
        <Divider />
        <List.Item
          title="Privacy Policy"
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {/* Navigate to Privacy Policy */}}
        />
        <Divider />
        <List.Item
          title="Terms of Service"
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {/* Navigate to Terms of Service */}}
        />
      </Card.Content>
    </Card>
  );

  const renderLogoutButton = () => (
    <Button 
      mode="outlined" 
      onPress={() => {/* Handle logout */}}
      style={styles.logoutButton}
      icon="logout"
    >
      Logout
    </Button>
  );

  return (
    <ScrollView style={globalStyles.container}>
      {renderProfileHeader()}
      {renderProfileDetails()}
      {renderSettings()}
      {renderLogoutButton()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    ...globalStyles.card,
    marginBottom: theme.spacing.md,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  avatar: {
    marginBottom: theme.spacing.md,
  },
  headerInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  email: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  editButton: {
    minWidth: 150,
  },
  detailsCard: {
    ...globalStyles.card,
    marginBottom: theme.spacing.md,
  },
  settingsCard: {
    ...globalStyles.card,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: theme.spacing.md,
  },
  subsectionTitle: {
    fontSize: 16,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  input: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.xs,
  },
  subjectChip: {
    margin: theme.spacing.xs,
  },
  addSubjectButton: {
    margin: theme.spacing.xs,
  },
  logoutButton: {
    margin: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
});

export default ProfileScreen;
