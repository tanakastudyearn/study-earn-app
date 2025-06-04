import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Share } from 'react-native';
import { 
  Text, 
  Title, 
  Button, 
  Card, 
  Chip, 
  List, 
  Portal, 
  Modal,
  ProgressBar 
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { usePoints } from '../contexts/PointsContext';
import { useAds } from '../contexts/AdContext';
import { Header } from '../components';
import { theme } from '../constants/theme';

const CourseDetailScreen = ({ route, navigation }) => {
  const { course = {} } = route.params;
  const { awardPoints } = usePoints();
  const { showRewardedAd } = useAds();
  const [showModal, setShowModal] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  const {
    title,
    description,
    thumbnail,
    instructor,
    duration,
    lessons = [],
    points,
    requirements = [],
    learningOutcomes = [],
    category,
    level,
    progress = 0,
  } = course;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this course: ${title} on Study & Earn App!`,
        // Add your app's deep linking URL here
        url: 'https://studyearn.app/course/' + course.id,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      
      // Show rewarded ad before enrollment
      const adWatched = await showRewardedAd();
      
      if (adWatched) {
        // Award bonus points for watching ad
        await awardPoints('WATCH_REWARDED_AD');
      }

      // Show success modal
      setShowModal(true);
      
      // Navigate to first lesson after delay
      setTimeout(() => {
        setShowModal(false);
        navigation.navigate('Lesson', {
          lesson: lessons[0],
          courseId: course.id,
        });
      }, 2000);
    } catch (error) {
      console.error('Error enrolling:', error);
    } finally {
      setEnrolling(false);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      <View style={styles.headerContent}>
        <Title style={styles.title}>{title}</Title>
        
        <View style={styles.metaContainer}>
          <Chip icon="account" style={styles.chip}>{instructor}</Chip>
          <Chip icon="clock" style={styles.chip}>{duration}</Chip>
          <Chip icon="star" style={styles.chip}>+{points} pts</Chip>
        </View>

        {progress > 0 && (
          <View style={styles.progressContainer}>
            <ProgressBar 
              progress={progress / 100} 
              color={theme.colors.primary}
              style={styles.progressBar}
            />
            <Text style={styles.progressText}>{progress}% Complete</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderDescription = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>About this Course</Title>
        <Text style={styles.description}>{description}</Text>
        
        <View style={styles.tagsContainer}>
          <Chip style={styles.tag}>{category}</Chip>
          <Chip style={styles.tag}>{level}</Chip>
        </View>
      </Card.Content>
    </Card>
  );

  const renderLearningOutcomes = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>What You'll Learn</Title>
        {learningOutcomes.map((outcome, index) => (
          <List.Item
            key={index}
            title={outcome}
            left={props => <List.Icon {...props} icon="check" />}
            titleNumberOfLines={2}
          />
        ))}
      </Card.Content>
    </Card>
  );

  const renderRequirements = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>Requirements</Title>
        {requirements.map((requirement, index) => (
          <List.Item
            key={index}
            title={requirement}
            left={props => <List.Icon {...props} icon="arrow-right" />}
            titleNumberOfLines={2}
          />
        ))}
      </Card.Content>
    </Card>
  );

  const renderLessons = () => (
    <Card style={styles.section}>
      <Card.Content>
        <Title style={styles.sectionTitle}>Course Content</Title>
        {lessons.map((lesson, index) => (
          <List.Item
            key={index}
            title={lesson.title}
            description={`${lesson.duration} • ${lesson.points} points`}
            left={props => (
              <List.Icon 
                {...props} 
                icon={lesson.completed ? "check-circle" : "play-circle"} 
                color={lesson.completed ? theme.colors.success : theme.colors.primary}
              />
            )}
            onPress={() => navigation.navigate('Lesson', { 
              lesson,
              courseId: course.id
            })}
            style={styles.lessonItem}
          />
        ))}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header
        title=""
        showBack
        navigation={navigation}
        rightComponent={
          <Button
            icon="share"
            onPress={handleShare}
            mode="text"
            compact
          />
        }
      />

      <ScrollView>
        {renderHeader()}
        {renderDescription()}
        {renderLearningOutcomes()}
        {renderRequirements()}
        {renderLessons()}
      </ScrollView>

      <Card style={styles.bottomBar} elevation={4}>
        <Card.Content style={styles.bottomBarContent}>
          <View>
            <Text style={styles.pointsLabel}>Earn up to</Text>
            <Text style={styles.pointsValue}>{points} points</Text>
          </View>
          <Button
            mode="contained"
            onPress={handleEnroll}
            loading={enrolling}
            disabled={enrolling}
            style={styles.enrollButton}
          >
            {progress > 0 ? 'Continue Learning' : 'Start Learning'}
          </Button>
        </Card.Content>
      </Card>

      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Icon 
            name="checkmark-circle" 
            size={64} 
            color={theme.colors.success} 
          />
          <Title style={styles.modalTitle}>Enrolled Successfully!</Title>
          <Text style={styles.modalText}>
            You're all set to start learning and earning points.
          </Text>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  headerContent: {
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 24,
    marginBottom: theme.spacing.md,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.md,
  },
  chip: {
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  progressContainer: {
    marginTop: theme.spacing.sm,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  section: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: theme.spacing.md,
  },
  description: {
    color: theme.colors.textSecondary,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: theme.spacing.sm,
  },
  tag: {
    marginRight: theme.spacing.sm,
  },
  lessonItem: {
    paddingVertical: theme.spacing.sm,
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  bottomBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  pointsValue: {
    color: theme.colors.success,
    fontSize: 18,
    fontWeight: 'bold',
  },
  enrollButton: {
    minWidth: 150,
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
  },
});

export default CourseDetailScreen;
