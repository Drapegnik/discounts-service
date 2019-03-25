import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

const ProfileScreen = () => (
  <ScrollView style={styles.container}>
    <Text>Profile</Text>
  </ScrollView>
);

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
