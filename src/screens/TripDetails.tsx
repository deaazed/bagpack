import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../navigation/types';

type TripDetailsRouteProp = RouteProp<MainStackParamList, 'TripDetails'>;

const TripDetails = () => {
  const route = useRoute<TripDetailsRouteProp>();
  const { tripId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Détails du voyage</Text>
      <Text style={styles.tripId}>ID du voyage: {tripId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
  },
  text: {
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 10,
  },
  tripId: {
    fontSize: 16,
    color: '#718096',
  },
});

export default TripDetails; 