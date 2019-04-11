import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator, Image, Dimensions, Button } from 'react-native';
import { MapView } from 'expo';

import { db } from '../utils/firebase';

const Place = ({ name, address, category, selected, onPress }) => (
  <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
    <Image style={{ width: 50, height: 50 }} source={{ uri: category.icon }} />
    <View style={{ marginLeft: 10 }}>
      <Text>{name}</Text>
      <Text>{category.name}</Text>
      <Text>{address}</Text>
    </View>
    {!selected && <Button title="show" onPress={onPress} />}
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
    const activePlace = data[selected];
    const { lat, lng } = activePlace.coordinates;
    const coordinate = { latitude: lat, longitude: lng };
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ margin: 20, fontWeight: 'bold' }}>Available Discounts:</Text>
        {data.map((p, i) => (
          <Place
            key={p.id}
            {...p}
            selected={selected === i}
            onPress={() => this.setState({ selected: i })}
          />
        ))}
        <View>
          <MapView
            key={selected}
            style={{ flex: 1, width: Dimensions.get('window').width }}
            initialRegion={{
              ...coordinate,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker coordinate={coordinate} />
          </MapView>
        </View>
      </View>
    );
  }
}

export default PlacesView;
