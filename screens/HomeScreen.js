import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

import ServiceView from '../components/ServiceView';

const HomeScreen = () => (
  <View style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.welcomeContainer}>
        {/* eslint-disable global-require */}
        <Image
          source={
            __DEV__
              ? require('../assets/images/robot-dev.png')
              : require('../assets/images/robot-prod.png')
          }
          style={styles.welcomeImage}
        />
        {/* eslint-enable */}
      </View>

      <View style={styles.getStartedContainer}>
        <ServiceView />
      </View>
    </ScrollView>
  </View>
);

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
    alignItems: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
});

export default HomeScreen;
