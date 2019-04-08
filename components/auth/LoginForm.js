import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { login } from '../../utils/auth';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    pending: false,
    error: null,
  };

  componentWillUnmount() {
    this.unmounted = true;
  }

  handleSubmit = () => {
    const { email, password } = this.state;
    login(email, password)
      .then(() => {
        if (!this.unmounted) {
          this.setState({ pending: false });
        }
      })
      .catch(({ message }) => this.setState({ pending: false, error: message, password: '' }));
    this.setState({ pending: true, error: null });
  };

  render() {
    const { pending, error, password: p, email: e } = this.state;
    const formFilled = p && e;
    return (
      <>
        <Input
          placeholder="email"
          leftIcon={{ type: 'octicon', name: 'mail' }}
          onChangeText={email => this.setState({ email })}
          autoComplete="email"
        />
        <Input
          placeholder="password"
          leftIcon={{ type: 'octicon', name: 'lock' }}
          onChangeText={password => this.setState({ password })}
          errorMessage={error}
          autoComplete="password"
          secureTextEntry
        />
        <Button
          buttonStyle={styles.loginButton}
          underlayColor={styles.loginButton.backgroundColor}
          onPress={this.handleSubmit}
          loading={pending}
          disabled={!formFilled}
          title="Sign In"
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  loginButton: {
    width: 375 * 0.75,
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CFC00',
  },
});

export default LoginForm;
