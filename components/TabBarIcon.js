import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const prefix = Platform.OS === 'ios' ? 'ios' : 'md';

const TabBarIcon = ({ name, focused }) => (
  <Ionicons
    name={`${prefix}-${name}`}
    size={26}
    style={{ marginBottom: -3 }}
    color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />
);

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};

export default TabBarIcon;
