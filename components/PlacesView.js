import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator, Image, Dimensions, Button } from 'react-native';
import MapView from 'react-native-maps';
import { Divider } from 'react-native-elements';

import { db } from '../utils/firebase';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const DISCOUNTS = [3, 5, 8, 10, 15, 20];

const Place = ({ name, address, category, selected, onPress }) => (
  <View
    style={[
      {
        padding: 10,
      },
    ]}
  >
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      ]}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ width: 50, height: 50 }} source={{ uri: category.icon }} />
        <View style={{ marginLeft: 10 }}>
          <Text>{name}</Text>
          <Text>{category.name}</Text>
          <Text>{address}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ fontSize: 20, marginRight: 4, fontWeight: 'bold' }}>
          {DISCOUNTS[getRandomInt(DISCOUNTS.length)]}%
        </Text>
        {!selected && <Button title="Show" onPress={onPress} />}
      </View>
    </View>
    <Text style={{ marginTop: 8, color: 'grey' }}>
      {getRandomInt(9) + 1} colleagues visited this last week
    </Text>
    <Button title="Use discount" onPress={() => {}} />
  </View>
);

class PlacesView extends Component {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    profile: PropTypes.shape({}).isRequired,
  };

  state = {
    data: null,
    pending: false,
    selected: 0,
  };

  componentDidMount() {
    const {
      profile: { company },
    } = this.props;
    const places = Object.keys(company.discounts);
    this.setState({ pending: true });
    db.collection('places')
      .get()
      .then(querySnapshot => {
        const result = [];
        querySnapshot.forEach(doc => {
          if (places.includes(doc.id)) {
            result.push(doc.data());
          }
        });
        return result;
      })
      .then(data => this.setState({ data, pending: false }));
  }

  render() {
    const { data, pending, selected } = this.state;
    if (!data || pending) {
      return <ActivityIndicator />;
    }

    return (
      <View style={{ flex: 1, padding: 10, borderColor: 'red' }}>
        <Text style={{ margin: 10, fontWeight: 'bold', fontSize: 16 }}>Available Discounts:</Text>
        {data.map((p, i) => (
          <View key={p.id}>
            <Divider style={{ backgroundColor: '#e8e8e8', height: 12 }} />
            <Place
              {...p}
              selected={selected === i}
              onPress={() => this.setState({ selected: i })}
            />
            {selected === i && (
              <MapView
                style={{ flex: 1, width: Dimensions.get('window').width }}
                initialRegion={{
                  ...{ latitude: p.coordinates.lat, longitude: p.coordinates.lng },
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <MapView.Marker
                  coordinate={{ latitude: p.coordinates.lat, longitude: p.coordinates.lng }}
                />
              </MapView>
            )}
          </View>
        ))}
      </View>
    );
  }
}

export default PlacesView;
