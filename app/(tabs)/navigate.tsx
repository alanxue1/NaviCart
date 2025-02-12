import React from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { MiMapView } from '@mappedin/react-native-sdk';

// Declare types for our credentials and options
interface Credentials {
  key: "mik_yeBk0Vf0nNJtpesfu560e07e5";
  secret: "mis_2g9ST8ZcSFb5R9fPnsvYhrX3RyRwPtDGbMGweCYKEq385431022";
}

interface MapOptions {
  venue: string;
  perspective: "2d" | "3d";
}

export default function NavigateScreen() {
  const options = {
    clientId: '5eab30aa91b055001a68e996',
    clientSecret: 'RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1',
    venue: 'mappedin-demo-campus'
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MiMapView 
        style={{ flex: 1 }} 
        key="mappedin" 
        options={options} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
}); 