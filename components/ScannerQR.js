import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

class ScannerQR extends Component {
  state = {
    hasCameraPermission: null,
  };

  componentDidMount() {
    this.requestCameraPermission();
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  handleBarCodeScan = ({ data }) => {
    const { onScan } = this.props;
    onScan(data);
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <BarCodeScanner
        style={{ height: 300, width: 300 }}
        onBarCodeScanned={this.handleBarCodeScan}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
      />
    );
  }
}

export default ScannerQR;
