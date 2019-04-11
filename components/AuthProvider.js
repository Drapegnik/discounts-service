import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginView from './LoginView';

import { subscribeAuthChange } from '../utils/auth';
import { db } from '../utils/firebase';

class AuthProvider extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    showLogin: PropTypes.bool,
  };

  static defaultProps = {
    showLogin: false,
  };

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
          if (profile.role !== 'staff') {
            const res = await profile.company.get();
            profile.company = res.data();
            profile.company.id = res.id;
          }
          this.setState({ pending: false, profile, error: null });
          return;
        }
        throw new Error('Your profile is not linked, please contact your administrator');
      })
      .catch(({ message }) => this.setState({ error: message, pending: false }));
  };

  render() {
    const { children, showLogin } = this.props;
    const { user, pending, profile, error } = this.state;

    if (!user && showLogin) {
      return <LoginView />;
    }
    return children({ user, pending, profile, error });
  }
}

export default AuthProvider;
