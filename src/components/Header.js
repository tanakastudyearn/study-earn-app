import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Avatar, Menu, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../constants/theme';

const Header = ({ 
  title,
  subtitle,
  showBack,
  showProfile = true,
  showNotification = true,
  onBack,
  onProfilePress,
  navigation,
  style,
  rightComponent,
}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [notificationsVisible, setNotificationsVisible] = React.useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const openNotifications = () => setNotificationsVisible(true);
  const closeNotifications = () => setNotificationsVisible(false);

  const renderRight = () => {
    if (rightComponent) {
      return rightComponent;
    }

    return (
      <View style={styles.rightContainer}>
        {showNotification && (
          <Menu
            visible={notificationsVisible}
            onDismiss={closeNotifications}
            anchor={
              <Appbar.Action
                icon={props => (
                  <View>
                    <Icon name="notifications-outline" size={24} color={theme.colors.text} />
                    <View style={styles.notificationBadge}>
                      <Text style={styles.badgeText}>2</Text>
                    </View>
                  </View>
                )}
                onPress={openNotifications}
              />
            }
          >
            <Menu.Item 
              onPress={() => {
                closeNotifications();
                // Handle notification
              }} 
              title="New course available"
              description="Check out our latest Mathematics course"
            />
            <Menu.Item 
              onPress={() => {
                closeNotifications();
                // Handle notification
              }} 
              title="Points earned!"
              description="You earned 50 points from your upload"
            />
          </Menu>
        )}

        {showProfile && (
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <Appbar.Action
                icon={props => (
                  <Avatar.Image
                    size={35}
                    source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
                  />
                )}
                onPress={openMenu}
              />
            }
          >
            <Menu.Item 
              onPress={() => {
                closeMenu();
                navigation?.navigate('Profile');
              }} 
              title="Profile"
              icon="account"
            />
            <Menu.Item 
              onPress={() => {
                closeMenu();
                navigation?.navigate('Settings');
              }} 
              title="Settings"
              icon="cog"
            />
            <Menu.Item 
              onPress={() => {
                closeMenu();
                // Handle logout
              }} 
              title="Logout"
              icon="logout"
            />
          </Menu>
        )}
      </View>
    );
  };

  return (
    <Appbar.Header style={[styles.header, style]}>
      {showBack && (
        <Appbar.BackAction onPress={onBack || navigation?.goBack} />
      )}
      
      <View style={styles.titleContainer}>
        <Appbar.Content
          title={title}
          subtitle={subtitle}
          titleStyle={styles.title}
          subtitleStyle={styles.subtitle}
        />
      </View>

      {renderRight()}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.surface,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    right: -2,
    top: -2,
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  badgeText: {
    color: theme.colors.surface,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Header;
