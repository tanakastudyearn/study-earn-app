import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Text, 
  Card, 
  TextInput, 
  Button, 
  Title, 
  Paragraph,
  Chip,
  Portal,
  Modal,
  ActivityIndicator 
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme, styles as globalStyles } from '../constants/theme';

const UploadScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const subjects = [
    'Mathematics',
    'Science',
    'Language',
    'History',
    'Computer Science',
    'Arts',
    'Music'
  ];

  const gradeLevels = [
    'Elementary',
    'Middle School',
    'High School',
    'College',
    'Professional'
  ];

  const renderUploadCard = () => (
    <Card style={styles.uploadCard}>
      <Card.Content>
        <Title style={styles.cardTitle}>Share Your Knowledge</Title>
        <Paragraph style={styles.cardDescription}>
          Upload educational content and earn points when others learn from your materials.
        </Paragraph>
        
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          mode="outlined"
          multiline
          numberOfLines={3}
        />

        <Title style={styles.sectionTitle}>Subject</Title>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.chipsContainer}
        >
          {subjects.map((item) => (
            <Chip
              key={item}
              selected={subject === item}
              onPress={() => setSubject(item)}
              style={styles.chip}
              selectedColor={theme.colors.primary}
            >
              {item}
            </Chip>
          ))}
        </ScrollView>

        <Title style={styles.sectionTitle}>Grade Level</Title>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.chipsContainer}
        >
          {gradeLevels.map((item) => (
            <Chip
              key={item}
              selected={gradeLevel === item}
              onPress={() => setGradeLevel(item)}
              style={styles.chip}
              selectedColor={theme.colors.primary}
            >
              {item}
            </Chip>
          ))}
        </ScrollView>

        <View style={styles.uploadButtonsContainer}>
          <Button
            mode="outlined"
            icon="file-document"
            onPress={() => {/* Handle document upload */}}
            style={styles.uploadButton}
          >
            Upload Document
          </Button>
          <Button
            mode="outlined"
            icon="video"
            onPress={() => {/* Handle video upload */}}
            style={styles.uploadButton}
          >
            Upload Video
          </Button>
        </View>

        <Button
          mode="contained"
          onPress={() => {
            setUploading(true);
            // Simulate upload
            setTimeout(() => {
              setUploading(false);
              setShowSuccessModal(true);
            }, 2000);
          }}
          style={styles.submitButton}
          disabled={!title || !description || !subject || !gradeLevel || uploading}
        >
          {uploading ? 'Uploading...' : 'Submit Content'}
        </Button>
      </Card.Content>
    </Card>
  );

  const renderEarningInfo = () => (
    <Card style={styles.earningCard}>
      <Card.Content>
        <View style={styles.earningHeader}>
          <Icon name="information-circle" size={24} color={theme.colors.primary} />
          <Title style={styles.earningTitle}>Earning Information</Title>
        </View>
        <View style={styles.earningItem}>
          <Text style={styles.earningLabel}>Upload Bonus:</Text>
          <Text style={styles.earningValue}>+50 points</Text>
        </View>
        <View style={styles.earningItem}>
          <Text style={styles.earningLabel}>Per View:</Text>
          <Text style={styles.earningValue}>+1 point</Text>
        </View>
        <View style={styles.earningItem}>
          <Text style={styles.earningLabel}>Per Download:</Text>
          <Text style={styles.earningValue}>+5 points</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={globalStyles.container}>
      {renderUploadCard()}
      {renderEarningInfo()}

      <Portal>
        <Modal
          visible={showSuccessModal}
          onDismiss={() => setShowSuccessModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Icon name="checkmark-circle" size={64} color={theme.colors.success} />
          <Title style={styles.modalTitle}>Upload Successful!</Title>
          <Paragraph style={styles.modalText}>
            Your content has been submitted for review. You'll earn points once it's approved.
          </Paragraph>
          <Button
            mode="contained"
            onPress={() => setShowSuccessModal(false)}
            style={styles.modalButton}
          >
            Continue
          </Button>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  uploadCard: {
    ...globalStyles.card,
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    fontSize: 24,
    marginBottom: theme.spacing.sm,
  },
  cardDescription: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  input: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  chipsContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  chip: {
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  uploadButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  uploadButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  submitButton: {
    marginTop: theme.spacing.md,
  },
  earningCard: {
    ...globalStyles.card,
    marginBottom: theme.spacing.xl,
  },
  earningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  earningTitle: {
    fontSize: 18,
    marginLeft: theme.spacing.sm,
  },
  earningItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  earningLabel: {
    color: theme.colors.textSecondary,
  },
  earningValue: {
    color: theme.colors.success,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.xl,
    margin: theme.spacing.lg,
    borderRadius: theme.roundness,
    alignItems: 'center',
  },
  modalTitle: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  modalText: {
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  modalButton: {
    width: '100%',
  },
});

export default UploadScreen;
