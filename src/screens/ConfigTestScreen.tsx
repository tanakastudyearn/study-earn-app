import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ConfigTest from '../components/ConfigTest';

const ConfigTestScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ConfigTest />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ConfigTestScreen;
