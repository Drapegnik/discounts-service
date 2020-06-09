import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Text, Image } from 'react-native-elements';

import ScannerQR from './ScannerQR';

import { validate, decode } from '../utils/qr';
import { db } from '../utils/firebase';

const DiscountCard = ({ name, discounts, place, logo }) => (
  <View style={styles.discount}>
    <Image
      source={{ uri: logo }}
      style={{ height: 50, width: 100 }}
      resizeMode="contain"
      PlaceholderContent={<ActivityIndicator />}
    />
    <Text h3>Company:</Text>
    <Text h3 style={styles.bold}>
      {name}
    </Text>

    {discounts[place] && (
      <Text h3>
        Discount:
        <Text h3 style={styles.bold}>
          {discounts[place]}%
        </Text>
      </Text>
    )}
    {!discounts[place] && <Text h4>no discount!</Text>}
    {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
    <Text h3>{discounts[place] ? '🎉' : '😿'}</Text>
  </View>
);

class ServiceView extends Component {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    profile: PropTypes.shape({}).isRequired,
  };

  state = {
    opened: false,
    company: null,
  };

  toggleScanner = () => {
    this.setState(({ opened }) => ({ opened: !opened, company: null }));
  };

  showError = () => {
    Alert.alert('Invalid QR Code!');
    this.setState({ opened: false });
  };

  handleScan = value => {
    if (!validate(value)) {
      this.showError();
      return;
    }
    const companyId = decode(value);
    db.collection('companies')
      .doc(companyId)
      .get()
      .then(doc => {
        if (!doc.exists) {
          this.showError();
          return;
        }
        const company = doc.data();
        this.setState({ opened: false, company });
      });
  };

  render() {
    const { user, profile } = this.props;
    const { opened, company } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hi, {user.email}!</Text>
        <Text style={styles.text}>
          Please, scan discount QR code that you received from the customer.
        </Text>
        {opened && <ScannerQR onScan={this.handleScan} />}
        {company && <DiscountCard {...company} place={profile.place} />}
        <View style={styles.actions}>
          <Button
            style={styles.button}
            title={opened ? 'Close' : 'Scan 📸'}
            onPress={this.toggleScanner}
          />
          {company && (
            <Button
              style={styles.button}
              title="Clear"
              onPress={() => this.setState({ company: null })}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
    width: 250,
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
    margin: 15,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default ServiceView;
