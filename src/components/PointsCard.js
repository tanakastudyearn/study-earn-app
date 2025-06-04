import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Text, Button, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../constants/theme';

const PointsCard = ({
  points = 0,
  earnings = 0,
  nextMilestone = 1000,
  onViewDetails,
  compact = false,
  style
}) => {
  const progress = Math.min(points / nextMilestone, 1);
  const remainingPoints = nextMilestone - points;

  return (
    <Card style={[styles.card, compact && styles.compactCard, style]}>
      <Card.Content>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.label}>Total Points</Text>
            <View style={styles.pointsContainer}>
              <Icon 
                name="star" 
                size={24} 
                color={theme.colors.primary} 
                style={styles.pointsIcon}
              />
              <Title style={styles.pointsValue}>{points}</Title>
            </View>
          </View>
          
          {!compact && (
            <View>
              <Text style={styles.label}>Earnings</Text>
              <Title style={styles.earningsValue}>
                ${earnings.toFixed(2)}
              </Title>
            </View>
          )}
        </View>

        <View style={styles.milestoneContainer}>
          <View style={styles.milestoneHeader}>
            <Text style={styles.milestoneLabel}>
              Next Milestone: {nextMilestone} points
            </Text>
            <Text style={styles.remainingPoints}>
              {remainingPoints} points to go
            </Text>
          </View>
          
          <ProgressBar
            progress={progress}
            color={theme.colors.primary}
            style={styles.progressBar}
          />
          
          {!compact && (
            <Text style={styles.milestoneHint}>
              Earn more points by completing courses and uploading content
            </Text>
          )}
        </View>

        {!compact && onViewDetails && (
          <Button
            mode="outlined"
            onPress={onViewDetails}
            style={styles.detailsButton}
          >
            View Details
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    elevation: theme.elevation.small,
  },
  compactCard: {
    marginHorizontal: 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsIcon: {
    marginRight: theme.spacing.xs,
  },
  pointsValue: {
    fontSize: 28,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  earningsValue: {
    fontSize: 28,
    color: theme.colors.success,
    fontWeight: 'bold',
  },
  milestoneContainer: {
    marginBottom: theme.spacing.md,
  },
  milestoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  milestoneLabel: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '500',
  },
  remainingPoints: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.background,
  },
  milestoneHint: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  detailsButton: {
    marginTop: theme.spacing.md,
  },
});

export default PointsCard;
