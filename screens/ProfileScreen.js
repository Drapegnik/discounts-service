import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Header, Avatar } from 'react-native-elements';

import LoginView from '../components/LoginView';
import CompanyQR from '../components/CompanyQR';

import { subscribeAuthChange, logout } from '../utils/auth';
import { getUserName, getAvatar } from '../utils/user';
import { db } from '../utils/firebase';

class ProfileScreen extends Component {
  state = {
    user: null,
    profile: null,
    pending: false,
  };

  componentDidMount() {
    subscribeAuthChange(user => {
      this.setState({ user }, this.fetchUserData);
    });
  }

  fetchUserData = () => {
    const { user } = this.state;
    if (!user) {
      this.setState({ profile: null, error: null });
      return;
    }
    this.setState({ pending: true });
    db.collection('users')
      .doc(user.email)
      .get()
      .then(async doc => {
        if (doc.exists) {
          const profile = doc.data();
          const res = await profile.company.get();
          profile.company = res.data();
          profile.company.id = res.id;
          this.setState({ pending: false, profile, error: null });
          return;
        }
        throw new Error('Your profile is not linked, please contact your administrator');
      })
      .catch(({ message }) => this.setState({ error: message, pending: false }));
  };

  render() {
    const { user, pending, profile, error } = this.state;

    if (!user) {
      return <LoginView />;
    }

    return (
      <View>
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
          {pending && <Text>pending...</Text>}
          {error && <Text>{error}</Text>}
          <Button onPress={logout} title="Log out" />
          {profile && <CompanyQR {...profile.company} />}
        </View>
      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default ProfileScreen;
