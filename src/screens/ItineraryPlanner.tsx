import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../navigation/types';

type ItineraryPlannerRouteProp = RouteProp<MainStackParamList, 'ItineraryPlanner'>;

const ItineraryPlanner = () => {
  const route = useRoute<ItineraryPlannerRouteProp>();
  const { tripId } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Planification d'itinéraire</Text>
        <Text style={styles.tripId}>ID du voyage: {tripId}</Text>
        <Text style={styles.description}>
          Cet écran permettra de planifier en détail votre itinéraire, d'ajouter des activités,
          des réservations et de générer un rétroplanning complet pour votre voyage.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 8,
  },
  tripId: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
  },
});

export default ItineraryPlanner; 