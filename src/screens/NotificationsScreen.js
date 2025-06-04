import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { 
  List, 
  Text, 
  Button, 
  IconButton, 
  Menu, 
  Divider,
  Badge,
  Portal,
  Dialog 
} from 'react-native-paper';
import { Header, EmptyState } from '../components';
import { theme } from '../constants/theme';

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockNotifications = [
        {
          id: '1',
          type: 'course',
          title: 'New Course Available',
          message: 'Check out our new Mathematics course!',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          read: false,
          data: {
            courseId: '123',
          },
        },
        {
          id: '2',
          type: 'points',
          title: 'Points Earned!',
          message: 'You earned 50 points from completing a lesson.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          read: true,
          data: {
            points: 50,
          },
        },
        {
          id: '3',
          type: 'reward',
          title: 'Withdrawal Successful',
          message: 'Your withdrawal of $10.00 has been processed.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          read: true,
          data: {
            amount: 10.00,
          },
        },
      ];

      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  const markAsRead = async (notificationId) => {
    try {
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );
      // Implement API call to update read status
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleNotificationPress = (notification) => {
    markAsRead(notification.id);
    
    // Navigate based on notification type
    switch (notification.type) {
      case 'course':
        navigation.navigate('CourseDetail', { courseId: notification.data.courseId });
        break;
      case 'points':
        navigation.navigate('Wallet');
        break;
      case 'reward':
        navigation.navigate('Wallet');
        break;
      default:
        console.log('Unknown notification type:', notification.type);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      setNotifications(prev => 
        prev.filter(notification => notification.id !== notificationId)
      );
      // Implement API call to delete notification
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'course':
        return 'book-outline';
      case 'points':
        return 'star-outline';
      case 'reward':
        return 'gift-outline';
      default:
        return 'notifications-outline';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 1000 * 60) {
      return 'Just now';
    } else if (diff < 1000 * 60 * 60) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m ago`;
    } else if (diff < 1000 * 60 * 60 * 24) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      return `${hours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderNotificationItem = ({ item }) => (
    <List.Item
      title={item.title}
      description={item.message}
      left={props => (
        <View style={styles.iconContainer}>
          <List.Icon {...props} icon={getNotificationIcon(item.type)} />
          {!item.read && <Badge size={8} style={styles.unreadBadge} />}
        </View>
      )}
      right={props => (
        <>
          <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
          <IconButton
            icon="dots-vertical"
            onPress={() => {
              setSelectedNotification(item);
              setMenuVisible(true);
            }}
          />
        </>
      )}
      onPress={() => handleNotificationPress(item)}
      style={[
        styles.notificationItem,
        !item.read && styles.unreadItem
      ]}
    />
  );

  const renderEmpty = () => (
    <EmptyState
      title="No Notifications"
      message="You're all caught up! Check back later for updates."
      icon="notifications-outline"
    />
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Notifications" 
        showBack 
        navigation={navigation}
        rightComponent={
          notifications.length > 0 ? (
            <Button
              mode="text"
              onPress={() => {
                setNotifications(prev =>
                  prev.map(notification => ({ ...notification, read: true }))
                );
              }}
            >
              Mark all read
            </Button>
          ) : null
        }
      />

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
          />
        }
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={() => <Divider />}
        contentContainerStyle={styles.listContent}
      />

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={{ x: 0, y: 0 }}
      >
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            markAsRead(selectedNotification?.id);
          }}
          title="Mark as read"
          disabled={selectedNotification?.read}
        />
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            setShowDeleteDialog(true);
          }}
          title="Delete"
        />
      </Menu>

      <Portal>
        <Dialog
          visible={showDeleteDialog}
          onDismiss={() => setShowDeleteDialog(false)}
        >
          <Dialog.Title>Delete Notification</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this notification?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button 
              onPress={() => deleteNotification(selectedNotification?.id)}
              textColor={theme.colors.error}
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    flexGrow: 1,
  },
  notificationItem: {
    paddingRight: theme.spacing.sm,
  },
  unreadItem: {
    backgroundColor: theme.colors.surface,
  },
  iconContainer: {
    position: 'relative',
  },
  unreadBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: theme.colors.notification,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    alignSelf: 'center',
    marginRight: theme.spacing.sm,
  },
});

export default NotificationsScreen;
