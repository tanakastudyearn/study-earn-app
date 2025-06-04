import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Text, Button, ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../constants/theme';

const CourseCard = ({ 
  course, 
  onPress, 
  showProgress = true,
  compact = false 
}) => {
  const {
    title,
    description,
    thumbnail,
    duration,
    points,
    progress = 0,
    category,
    author
  } = course;

  return (
    <Card 
      style={[styles.card, compact && styles.compactCard]} 
      onPress={onPress}
    >
      <Card.Cover 
        source={{ uri: thumbnail }} 
        style={[styles.cover, compact && styles.compactCover]}
      />
      
      <Card.Content style={styles.content}>
        {category && (
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{category}</Text>
          </View>
        )}

        <Title style={[styles.title, compact && styles.compactTitle]}>
          {title}
        </Title>

        {!compact && (
          <Paragraph style={styles.description} numberOfLines={2}>
            {description}
          </Paragraph>
        )}

        <View style={styles.metadataContainer}>
          {duration && (
            <View style={styles.metadata}>
              <Icon name="time-outline" size={16} color={theme.colors.textSecondary} />
              <Text style={styles.metadataText}>{duration}</Text>
            </View>
          )}
          
          {points && (
            <View style={styles.metadata}>
              <Icon name="star-outline" size={16} color={theme.colors.success} />
              <Text style={styles.pointsText}>+{points} pts</Text>
            </View>
          )}
        </View>

        {showProgress && progress > 0 && (
          <View style={styles.progressContainer}>
            <ProgressBar 
              progress={progress / 100} 
              color={theme.colors.primary}
              style={styles.progressBar}
            />
            <Text style={styles.progressText}>{progress}% Complete</Text>
          </View>
        )}

        {author && (
          <View style={styles.authorContainer}>
            <Icon name="person-outline" size={16} color={theme.colors.textSecondary} />
            <Text style={styles.authorText}>By {author}</Text>
          </View>
        )}
      </Card.Content>

      {!compact && (
        <Card.Actions style={styles.actions}>
          <Button 
            mode="contained"
            onPress={onPress}
            style={styles.button}
          >
            {progress > 0 ? 'Continue Learning' : 'Start Learning'}
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    elevation: theme.elevation.small,
  },
  compactCard: {
    width: 280,
    marginRight: theme.spacing.md,
  },
  cover: {
    height: 180,
  },
  compactCover: {
    height: 140,
  },
  content: {
    paddingTop: theme.spacing.md,
  },
  categoryContainer: {
    marginBottom: theme.spacing.xs,
  },
  category: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 18,
    marginBottom: theme.spacing.xs,
  },
  compactTitle: {
    fontSize: 16,
  },
  description: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  metadataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataText: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  pointsText: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.success,
    fontWeight: '500',
    fontSize: 14,
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
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  authorText: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  actions: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  button: {
    flex: 1,
  },
});

export default CourseCard;
