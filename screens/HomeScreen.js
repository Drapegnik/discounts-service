import React from 'react';
import { Image, ScrollView, StyleSheet, View, Text } from 'react-native';
import { Header, Button } from 'react-native-elements';

import AuthProvider from '../components/AuthProvider';
import ServiceView from '../components/ServiceView';
import PlacesView from '../components/PlacesView';

const HeaderText = ({ children }) => (
  <Text style={{ fontWeight: 'bold', color: 'white' }}>{children}</Text>
);

const HomeScreen = ({ navigation }) => (
  <AuthProvider>
    {({ user, profile, pending }) => (
      <>
        <Header
          centerComponent={<HeaderText>Home</HeaderText>}
          centerContainerStyles={{ fontWeight: 'bold' }}
        />
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
                style={[user && profile && profile.role !== 'staff' ? styles.welcomeImageSmall : styles.welcomeImage]}
              />
              {/* eslint-enable */}
            </View>

            <View style={styles.getStartedContainer}>
              {!user && !pending && (
                <View>
                  <Button
                    style={styles.text}
                    title="Please, login"
                    onPress={() => navigation.navigate('Profile')}
                  />
                </View>
              )}
              {pending && <Text style={styles.text}>loading...</Text>}
              {user && profile && profile.role !== 'customer' && (
                <ServiceView user={user} profile={profile} />
              )}
              {user && profile && profile.role !== 'staff' && (
                <PlacesView user={user} profile={profile} />
              )}
            </View>
          </ScrollView>
        </View>
      </>
    )}
  </AuthProvider>
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
  welcomeImageSmall: {
    display: 'none',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  text: {
    marginTop: 20,
    borderRadius: 12,
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    paddingBottom: 15,
  },
});

export default HomeScreen;
