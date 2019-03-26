import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import FacebookButton from './FacebookButton';

import { loginWithFacebook } from '../utils/auth';

class LoginView extends Component {
  state = {
    pending: false,
  };

  componentWillUnmount() {
    this.unmounted = true;
  }

  handleFacebookLogin = () => {
    loginWithFacebook().then(() => {
      if (!this.unmounted) {
        this.setState({ pending: false });
      }
    });
    this.setState({ pending: true });
  };

  render() {
    const { pending } = this.state;
    return (
      <View style={styles.container}>
        <FacebookButton pending={pending} onPress={this.handleFacebookLogin} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginView;
