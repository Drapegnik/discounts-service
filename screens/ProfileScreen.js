import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { Header, Avatar } from 'react-native-elements';

import LoginView from '../components/LoginView';

import { subscribeAuthChange, logout } from '../utils/auth';
import { db } from '../utils/firebase';

class ProfileScreen extends Component {
  state = {
    user: null,
    userData: null,
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
      this.setState({ userData: null, error: null });
      return;
    }
    this.setState({ pending: true });
    db.collection('users')
      .doc(user.email)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({ pending: false, userData: doc.data(), error: null });
          return;
        }
        throw new Error('Your profile is not linked, please contact your administrator');
      })
      .catch(({ message }) => this.setState({ error: message, pending: false }));
  };

  render() {
    const { user, pending, userData, error } = this.state;

    if (!user) {
      return <LoginView />;
    }

    return (
      <View>
        <Header
          centerComponent={{ text: user.displayName || user.email }}
          rightComponent={
            <Avatar
              rounded
              source={user.photoURL && { uri: user.photoURL }}
              icon={{ name: 'user', type: 'font-awesome' }}
            />
          }
        />
        <View>
          {pending && <Text>pending...</Text>}
          {error && <Text>{error}</Text>}
          {userData && <Text>{userData.company}</Text>}
          <Button onPress={logout} title="Log out" />
        </View>
      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  header: null,
};

export default ProfileScreen;
