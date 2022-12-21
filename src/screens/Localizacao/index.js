import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const Localizacao = () => {
  const [mapType, setMapType] = useState('standard');
  const [markers, setMarkers] = useState([]);

  // useEffect(() => {
  //   key: ,
  //   coords: {
  //     latitude: Number(),
  //     longitude: Number(),
  //   },
  //   title: ,
  //   description: ,
  //   image: require('../../assets/images/MapPoint.png'),
  //   setMarkers();
  // }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={map => (this.map = map)}
        style={styles.map}
        mapType={mapType}
        initialRegion={{
          //local da pizzaria
          latitude: -31.760244055778372,
          longitude: -52.33989341303205,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {markers.map(marker => {
          return (
            <Marker
              key={marker.key}
              coordinate={marker.coords}
              title={marker.title}
              description={marker.description}
              draggable
              image={marker.image}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export default Localizacao;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
