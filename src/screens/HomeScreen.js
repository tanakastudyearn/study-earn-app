import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Title, Paragraph, Avatar } from 'react-native-paper';
import { theme, styles as globalStyles } from '../constants/theme';

const HomeScreen = () => {
  const renderWelcomeCard = () => (
    <Card style={styles.welcomeCard}>
      <Card.Content>
        <Title style={styles.welcomeTitle}>Welcome to Study & Earn!</Title>
        <Paragraph style={styles.welcomeText}>
          Learn, share knowledge, and earn rewards. Start your educational journey today!
        </Paragraph>
        <Button
          mode="contained"
          style={styles.getStartedButton}
          onPress={() => {/* Navigate to Study Screen */}}
        >
          Start Learning
        </Button>
      </Card.Content>
    </Card>
  );

  const renderEarningStats = () => (
    <Card style={styles.statsCard}>
      <Card.Content>
        <Title style={styles.statsTitle}>Your Stats</Title>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>$0</Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Uploads</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const renderRecommendedCourses = () => (
    <View style={styles.sectionContainer}>
      <Title style={styles.sectionTitle}>Recommended for You</Title>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[1, 2, 3].map((item) => (
          <Card key={item} style={styles.courseCard}>
            <Card.Cover 
              source={{ uri: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg' }} 
              style={styles.courseCover}
            />
            <Card.Content>
              <Title style={styles.courseTitle}>Mathematics 101</Title>
              <Paragraph style={styles.courseDetails}>
                Basic Algebra • 10 Lessons
              </Paragraph>
              <View style={styles.courseStats}>
                <Text style={styles.coursePoints}>+50 pts</Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.actionsContainer}>
      <Title style={styles.sectionTitle}>Quick Actions</Title>
      <View style={styles.actionButtonsContainer}>
        <Button
          mode="outlined"
          icon="cloud-upload"
          style={styles.actionButton}
          onPress={() => {/* Navigate to Upload Screen */}}
        >
          Upload Content
        </Button>
        <Button
          mode="outlined"
          icon="wallet"
          style={styles.actionButton}
          onPress={() => {/* Navigate to Wallet Screen */}}
        >
          View Earnings
        </Button>
      </View>
    </View>
  );

  return (
    <ScrollView style={globalStyles.container}>
      {renderWelcomeCard()}
      {renderEarningStats()}
      {renderRecommendedCourses()}
      {renderQuickActions()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  welcomeCard: {
    ...globalStyles.card,
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  welcomeTitle: {
    color: theme.colors.surface,
    fontSize: 24,
    marginBottom: theme.spacing.sm,
  },
  welcomeText: {
    color: theme.colors.surface,
    opacity: 0.9,
    marginBottom: theme.spacing.md,
  },
  getStartedButton: {
    backgroundColor: theme.colors.surface,
    marginTop: theme.spacing.sm,
  },
  statsCard: {
    ...globalStyles.card,
    marginBottom: theme.spacing.md,
  },
  statsTitle: {
    fontSize: 20,
    marginBottom: theme.spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.sm,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  sectionContainer: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...globalStyles.heading,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  courseCard: {
    width: 280,
    marginHorizontal: theme.spacing.sm,
    marginVertical: theme.spacing.sm,
  },
  courseCover: {
    height: 140,
  },
  courseTitle: {
    fontSize: 16,
    marginTop: theme.spacing.xs,
  },
  courseDetails: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.xs,
  },
  coursePoints: {
    color: theme.colors.success,
    fontWeight: 'bold',
  },
  actionsContainer: {
    marginBottom: theme.spacing.xl,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
});

export default HomeScreen;
