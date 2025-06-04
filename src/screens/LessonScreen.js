import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Text, 
  Title, 
  Button, 
  Card, 
  Portal, 
  Modal, 
  ProgressBar,
  IconButton 
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import { usePoints } from '../contexts/PointsContext';
import { useAds } from '../contexts/AdContext';
import { Header } from '../components';
import { theme } from '../constants/theme';

const { width } = Dimensions.get('window');

const LessonScreen = ({ route, navigation }) => {
  const { lesson, courseId } = route.params;
  const { awardPoints } = usePoints();
  const { showInterstitial } = useAds();
  
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Track lesson start
    trackLessonProgress('start');
    return () => {
      // Track lesson exit
      trackLessonProgress('exit');
    };
  }, []);

  const trackLessonProgress = async (action) => {
    try {
      // Implement lesson progress tracking
      console.log(`Tracking lesson ${action}:`, {
        courseId,
        lessonId: lesson.id,
        progress,
      });
    } catch (error) {
      console.error('Error tracking lesson progress:', error);
    }
  };

  const handleVideoProgress = ({ currentTime, playableDuration }) => {
    const newProgress = (currentTime / playableDuration) * 100;
    setProgress(Math.floor(newProgress));

    // Auto-complete when video is almost finished (95%)
    if (newProgress >= 95 && !lesson.completed) {
      handleLessonComplete();
    }
  };

  const handleVideoError = (error) => {
    setVideoError(error);
    setLoading(false);
  };

  const handleLessonComplete = async () => {
    try {
      // Award points for lesson completion
      await awardPoints('LESSON_COMPLETION', {
        courseId,
        lessonId: lesson.id,
        lessonName: lesson.title,
      });

      // Show interstitial ad
      await showInterstitial();

      // Show completion modal
      setShowCompletionModal(true);
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const renderVideo = () => (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: lesson.videoUrl }}
        style={styles.video}
        controls={true}
        resizeMode="contain"
        onProgress={handleVideoProgress}
        onError={handleVideoError}
        onLoad={() => setLoading(false)}
        paused={isPaused}
      />
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
      {videoError && (
        <View style={styles.errorOverlay}>
          <Icon name="alert-circle" size={48} color={theme.colors.error} />
          <Text style={styles.errorText}>Failed to load video</Text>
          <Button 
            mode="contained" 
            onPress={() => setVideoError(null)}
            style={styles.retryButton}
          >
            Retry
          </Button>
        </View>
      )}
    </View>
  );

  const renderContent = () => (
    <Card style={styles.contentCard}>
      <Card.Content>
        <Title style={styles.contentTitle}>{lesson.title}</Title>
        <Text style={styles.description}>{lesson.description}</Text>

        {lesson.attachments?.length > 0 && (
          <View style={styles.attachmentsSection}>
            <Title style={styles.attachmentsTitle}>Resources</Title>
            {lesson.attachments.map((attachment, index) => (
              <Button
                key={index}
                mode="outlined"
                icon="file-download"
                onPress={() => {/* Handle download */}}
                style={styles.attachmentButton}
              >
                {attachment.name}
              </Button>
            ))}
          </View>
        )}

        {!lesson.completed && (
          <Button
            mode="contained"
            onPress={handleLessonComplete}
            style={styles.completeButton}
            disabled={progress < 95}
          >
            Complete Lesson
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  const renderCompletionModal = () => (
    <Portal>
      <Modal
        visible={showCompletionModal}
        onDismiss={() => setShowCompletionModal(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <Icon 
          name="checkmark-circle" 
          size={64} 
          color={theme.colors.success} 
        />
        <Title style={styles.modalTitle}>Lesson Completed!</Title>
        <Text style={styles.modalText}>
          You've earned {lesson.points} points for completing this lesson.
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            setShowCompletionModal(false);
            navigation.goBack();
          }}
          style={styles.modalButton}
        >
          Continue
        </Button>
      </Modal>
    </Portal>
  );

  return (
    <View style={styles.container}>
      <Header
        title={lesson.title}
        showBack
        navigation={navigation}
        rightComponent={
          <IconButton
            icon={isPaused ? "play" : "pause"}
            onPress={() => setIsPaused(!isPaused)}
          />
        }
      />

      <ScrollView>
        {renderVideo()}
        {renderContent()}
      </ScrollView>

      {renderCompletionModal()}

      <Card style={styles.progressBar} elevation={4}>
        <Card.Content>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>{progress}% Complete</Text>
            <ProgressBar
              progress={progress / 100}
              color={theme.colors.primary}
              style={styles.progress}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  retryButton: {
    minWidth: 120,
  },
  contentCard: {
    margin: theme.spacing.md,
  },
  contentTitle: {
    fontSize: 24,
    marginBottom: theme.spacing.md,
  },
  description: {
    color: theme.colors.textSecondary,
    lineHeight: 24,
    marginBottom: theme.spacing.lg,
  },
  attachmentsSection: {
    marginTop: theme.spacing.lg,
  },
  attachmentsTitle: {
    fontSize: 18,
    marginBottom: theme.spacing.md,
  },
  attachmentButton: {
    marginBottom: theme.spacing.sm,
  },
  completeButton: {
    marginTop: theme.spacing.lg,
  },
  progressBar: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  progressContainer: {
    paddingVertical: theme.spacing.sm,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  progress: {
    height: 4,
    borderRadius: 2,
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
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  modalButton: {
    minWidth: 150,
  },
});

export default LessonScreen;
