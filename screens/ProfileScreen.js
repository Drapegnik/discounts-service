import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Avatar, Button } from 'react-native-elements';

import AuthProvider from '../components/AuthProvider';
import CompanyQR from '../components/CompanyQR';

import { logout } from '../utils/auth';
import { getUserName, getAvatar } from '../utils/user';

const HeaderText = ({ children }) => (
  <Text style={{ fontWeight: 'bold', color: 'white' }}>{children}</Text>
);

const ProfileScreen = () => (
  <View style={{ flex: 1 }}>
    <AuthProvider showLogin>
      {({ user, profile, pending, error }) => (
        <>
          <Header
            centerComponent={<HeaderText>Profile</HeaderText>}
            rightComponent={
              <Avatar
                rounded
                source={getAvatar(user, profile)}
                icon={{ name: 'user', type: 'font-awesome' }}
              />
            }
            centerContainerStyles={{ fontWeight: 'bold' }}
          />
          <View style={styles.container}>
            {pending && <Text style={styles.margin}>Loading Profile...</Text>}
            {error && <Text style={styles.margin}>{error}</Text>}
            {profile && profile.role !== 'staff' && (
              <View style={styles.qrArea}>
                <Text style={{ fontSize: 16 }}>
                  Welcome, {getUserName(user, profile)}!{'\n'}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  Please, show this QR-code to an employee of the facility of company partners.
                  {'\n'}
                </Text>
                <View style={{ alignItems: 'center' }}>
                  <CompanyQR {...profile.company} />
                  <View style={{ margin: 10, flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16 }}>Remaining time before expiring: </Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>08:43</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Button
                      buttonStyle={styles.smallButton}
                      onPress={() => {}}
                      title="Regenerate"
                      type="outline"
                    />
                    <Button
                      buttonStyle={styles.smallButton}
                      onPress={() => {}}
                      title="Revoke"
                      type="outline"
                    />
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={styles.bottom}>
            <Button
              buttonStyle={styles.logoutButton}
              onPress={logout}
              title="Log out"
              type="outline"
            />
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
    margin: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    alignItems: 'center',
  },
  logoutButton: {
    width: 375 * 0.5,
    height: 48,
    borderRadius: 8,
    marginTop: 15,
  },
  smallButton: {
    height: 48,
    borderRadius: 8,
    margin: 15,
  },
});

export default ProfileScreen;
