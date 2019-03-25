import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}

export default SettingsScreen;
