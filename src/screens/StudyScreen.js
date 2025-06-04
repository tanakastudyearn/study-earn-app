import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Text, 
  Card, 
  Chip, 
  Searchbar, 
  Title, 
  Paragraph,
  ActivityIndicator,
  Button 
} from 'react-native-paper';
import { theme, styles as globalStyles } from '../constants/theme';

const StudyScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Mathematics',
    'Science',
    'Language',
    'History',
    'Computer Science'
  ];

  const courses = [
    {
      id: 1,
      title: 'Introduction to Algebra',
      category: 'Mathematics',
      description: 'Learn the fundamentals of algebra with interactive lessons',
      duration: '2 hours',
      points: 100,
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
      progress: 0,
    },
    {
      id: 2,
      title: 'Basic Physics',
      category: 'Science',
      description: 'Understand the basic principles of physics',
      duration: '3 hours',
      points: 150,
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
      progress: 0,
    },
    // Add more mock courses as needed
  ];

  const renderCategories = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}
    >
      {categories.map((category) => (
        <Chip
          key={category}
          selected={selectedCategory === category}
          onPress={() => setSelectedCategory(category)}
          style={styles.categoryChip}
          selectedColor={theme.colors.primary}
        >
          {category}
        </Chip>
      ))}
    </ScrollView>
  );

  const renderCourseCard = (course) => (
    <Card key={course.id} style={styles.courseCard}>
      <Card.Cover source={{ uri: course.image }} style={styles.courseCover} />
      <Card.Content>
        <Title style={styles.courseTitle}>{course.title}</Title>
        <Paragraph style={styles.courseDescription}>{course.description}</Paragraph>
        <View style={styles.courseMetadata}>
          <View style={styles.metadataItem}>
            <Text style={styles.metadataLabel}>Duration:</Text>
            <Text style={styles.metadataValue}>{course.duration}</Text>
          </View>
          <View style={styles.metadataItem}>
            <Text style={styles.metadataLabel}>Points:</Text>
            <Text style={styles.pointsValue}>+{course.points}</Text>
          </View>
        </View>
        {course.progress > 0 && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${course.progress}%` }]} />
            <Text style={styles.progressText}>{course.progress}% Complete</Text>
          </View>
        )}
      </Card.Content>
      <Card.Actions>
        <Button 
          mode="contained" 
          onPress={() => {/* Navigate to course details */}}
          style={styles.startButton}
        >
          {course.progress > 0 ? 'Continue' : 'Start Learning'}
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search courses..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
      {renderCategories()}
      <ScrollView style={styles.content}>
        <View style={styles.coursesContainer}>
          {courses
            .filter(course => 
              (selectedCategory === 'All' || course.category === selectedCategory) &&
              (course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               course.description.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map(renderCourseCard)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: theme.colors.background,
  },
  categoriesContainer: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  categoryChip: {
    marginRight: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  coursesContainer: {
    padding: theme.spacing.md,
  },
  courseCard: {
    ...globalStyles.card,
    marginBottom: theme.spacing.md,
  },
  courseCover: {
    height: 180,
  },
  courseTitle: {
    fontSize: 18,
    marginTop: theme.spacing.sm,
  },
  courseDescription: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  courseMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataLabel: {
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.xs,
  },
  metadataValue: {
    fontWeight: '500',
  },
  pointsValue: {
    color: theme.colors.success,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.roundness,
    height: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  startButton: {
    flex: 1,
    marginTop: theme.spacing.sm,
  },
});

export default StudyScreen;
