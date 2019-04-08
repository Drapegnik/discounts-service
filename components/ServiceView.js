import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';

import ScannerQR from './ScannerQR';

import { validate, decode } from '../utils/qr';

class ServiceView extends Component {
  static propTypes = {};

  state = {
    opened: false,
    data: null,
  };

  toggleScanner = () => {
    this.setState(({ opened }) => ({ opened: !opened, data: null }));
  };

  handleScan = value => {
    if (!validate(value)) {
      Alert.alert('Invalid QR Code!');
      this.setState({ opened: false });
      return;
    }
    this.setState({ opened: false, data: decode(value) });
  };

  render() {
    const { opened, data } = this.state;
    return (
      <View>
        {opened && <ScannerQR onScan={this.handleScan} />}
        {data && <Text>{data}</Text>}
        <Button title={opened ? 'Close' : 'Scan'} onPress={this.toggleScanner} />
      </View>
    );
  }
}

export default ServiceView;
