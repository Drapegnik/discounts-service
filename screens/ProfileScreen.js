import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Avatar, Button } from 'react-native-elements';

import AuthProvider from '../components/AuthProvider';
import CompanyQR from '../components/CompanyQR';

import { logout } from '../utils/auth';
import { getUserName, getAvatar } from '../utils/user';

const ProfileScreen = () => (
  <View style={{ flex: 1 }}>
    <AuthProvider showLogin>
      {({ user, profile, pending, error }) => (
        <>
          <Header
            centerComponent={{ text: getUserName(user, profile) }}
            rightComponent={
              <Avatar
                rounded
                source={getAvatar(user, profile)}
                icon={{ name: 'user', type: 'font-awesome' }}
              />
            }
          />
          <View style={styles.container}>
            {pending && <Text style={styles.margin}>Loading Profile...</Text>}
            {error && <Text style={styles.margin}>{error}</Text>}
            {profile && profile.role !== 'staff' && (
              <View style={styles.qrArea}>
                <CompanyQR {...profile.company} />
              </View>
            )}
          </View>

          <View style={styles.bottom}>
            <Button buttonStyle={styles.logoutButton} onPress={logout} title="Log out" />
          </View>
        </>
      )}
    </AuthProvider>
  </View>
);

ProfileScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  margin: {
    margin: 10,
  },
  qrArea: {
    margin: 30,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    alignItems: 'center',
  },
  logoutButton: {
    width: 375 * 0.75,
    height: 48,
    borderRadius: 50,
    marginTop: 15,
  },
});

export default ProfileScreen;
