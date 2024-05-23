// Location.js
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function LocationScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestPhoneNumber, setNearestPhoneNumber] = useState(null);

  useEffect(() => {
    handleGetLocation();
  }, []);

  const handleGetLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Fetch the nearest phone number and update the state
      const nearestNumber = {
        latitude: 37.7749,
        longitude: -122.4194,
        number: '555-1234',
      };
      setNearestPhoneNumber(nearestNumber);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.latitude || 0,
          longitude: userLocation?.longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
          />
        )}
        {nearestPhoneNumber && (
          <Marker
            coordinate={{
              latitude: nearestPhoneNumber.latitude,
              longitude: nearestPhoneNumber.longitude,
            }}
            title={`Nearest Phone Number: ${nearestPhoneNumber.number}`}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
