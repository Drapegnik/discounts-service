import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Header, Avatar } from 'react-native-elements';

import LoginView from '../components/LoginView';

import { subscribeAuthChange, logout } from '../utils/auth';

class ProfileScreen extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    subscribeAuthChange(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return <LoginView />;
    }

    return (
      <View>
        <Header
          centerComponent={{ text: user.displayName }}
          rightComponent={
            <Avatar
              rounded
              source={{ uri: user.photoURL }}
              icon={{ name: 'user', type: 'font-awesome' }}
            />
          }
        />
        <View>
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
