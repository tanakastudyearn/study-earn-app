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
                ₱{earnings.toFixed(2)}
              </Title>
            </View>
          )}
        </View>
        {/* ...rest of component unchanged */}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  // ...styles unchanged
});

export default PointsCard;
