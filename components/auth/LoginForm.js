import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';

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
        <Text h2 style={styles.loginTitle}>Discounts Service</Text>
        <Input
          containerStyle={styles.loginInput}
          leftIconContainerStyle={styles.loginInputIcon}
          placeholder="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={email => this.setState({ email })}
          autoComplete="email"
        />
        <Input
          containerStyle={styles.loginInput}
          leftIconContainerStyle={styles.loginInputIcon}
          placeholder="Password"
          leftIcon={{ type: 'font-awesome', name: 'unlock' }}
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
  loginTitle: {
    marginBottom: 15,
  },
  loginInput: {
    width: '75%',
  },  
  loginInputIcon: {
    marginRight: 10,
  },
  loginButton: {
    width: 375 * 0.75,
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CFC00',
    marginTop: 15,
  },
});

export default LoginForm;
