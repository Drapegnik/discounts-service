import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import { StyleSheet } from 'react-native';

const FacebookButton = ({ pending, onPress }) => (
  <Button
    buttonStyle={styles.facebookButton}
    underlayColor={styles.facebookButton.backgroundColor}
    onPress={onPress}
    loading={pending}
    title="Log in with Facebook"
  />
);

FacebookButton.propTypes = {
  pending: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

FacebookButton.defaultProps = {
  pending: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookButton: {
    width: 375 * 0.75,
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B5998',
  },
});

export default FacebookButton;
