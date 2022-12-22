import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {UsuarioContext} from '../../context/UsuarioProvider';

const Localizacao = () => {
  const [mapType, setMapType] = useState('standard');
  const [markers, setMarkers] = useState([]);
  const {usuarios} = useContext(UsuarioContext);

  useEffect(() => {
    let m = [];
    usuarios.map(u => {
      m.push({
        key: u.uid,
        coords: {
          latitude: Number(u.latitude),
          longitude: Number(u.longitude),
        },
        title: u.nome,
        description: `${u.idade}`,
        image: require('../../assets/images/MapPoint.png'),
      });
    });
    setMarkers(m);
    console.log(m);
  }, [usuarios]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={map => (this.map = map)}
        style={styles.map}
        mapType={mapType}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={e => {
          Alert.alert(
            'Coordenadas',
            'latitude= ' +
              e.nativeEvent.coordinate.latitude +
              ' longitude= ' +
              e.nativeEvent.coordinate.longitude,
          );
        }}
        initialRegion={{
          //local da pizzaria
          latitude: -31.760244055778372,
          longitude: -52.33989341303205,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {markers.map(marker => {
          console.log(marker);
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
