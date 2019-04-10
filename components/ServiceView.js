import React, { Component } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';

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
      <View style={styles.container}>
        <Text style={styles.text}>Hi, there!</Text>
        <Text style={styles.text}>
          Please, scan discount QR code that you received from the customer.
        </Text>
        {opened && <ScannerQR onScan={this.handleScan} />}
        {data && <Text>{data}</Text>}
        {data && (
          <View style={styles.discount}>
            <Text h3>Company:</Text>
            <Text h3 style={styles.bold}>
              Wargaming
            </Text>
            <Text h3>Discount:</Text>
            <Text h3 style={styles.bold}>
              10%
            </Text>
            <Text h3>🎉</Text>
          </View>
        )}
        <Button style={styles.button} title={opened ? 'Close' : 'Scan 📸'} onPress={this.toggleScanner} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 60,
  },
  discount: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    margin: 15,
    height: 'auto',
  },
  bold: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    paddingBottom: 15,
  },
  button: {
    marginTop: 15,
  }
});

export default ServiceView;
