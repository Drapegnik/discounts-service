import React from 'react';
import { Text } from 'react-native';

export const MonoText = ({ style, ...props }) => (
  <Text {...props} style={[style, { fontFamily: 'space-mono' }]} />
);
