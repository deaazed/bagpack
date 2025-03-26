import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../navigation/types';

type MapViewRouteProp = RouteProp<MainStackParamList, 'MapView'>;

type Props = {
  route: MapViewRouteProp;
};

const MapView = ({ route }: Props) => {
  const { destination } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Carte de {destination}</Text>
      </View>
      
      <View style={styles.mapContainer}>
        {/* Ici, nous simulons une carte avec un simple conteneur */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>Carte interactive de {destination}</Text>
          <Text style={styles.mapNote}>
            Dans une version réelle, cette vue utiliserait une bibliothèque comme react-native-maps pour afficher une carte interactive.
          </Text>
        </View>
      </View>
      
      <View style={styles.infoPanel}>
        <Text style={styles.infoPanelTitle}>Points d'intérêt à proximité</Text>
        
        <View style={styles.poiItem}>
          <Text style={styles.poiName}>🏛️ Musée du Louvre</Text>
          <Text style={styles.poiDistance}>1.2 km</Text>
        </View>
        
        <View style={styles.poiItem}>
          <Text style={styles.poiName}>🗼 Tour Eiffel</Text>
          <Text style={styles.poiDistance}>3.5 km</Text>
        </View>
        
        <View style={styles.poiItem}>
          <Text style={styles.poiName}>🕍 Notre-Dame</Text>
          <Text style={styles.poiDistance}>2.0 km</Text>
        </View>
        
        <View style={styles.poiItem}>
          <Text style={styles.poiName}>🍽️ Le Café Marly</Text>
          <Text style={styles.poiDistance}>1.3 km</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
  },
  mapContainer: {
    height: Dimensions.get('window').height * 0.4,
    width: '100%',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mapPlaceholderText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 8,
  },
  mapNote: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
  infoPanel: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    flex: 1,
  },
  infoPanelTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
  },
  poiItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  poiName: {
    fontSize: 16,
    color: '#4A5568',
  },
  poiDistance: {
    fontSize: 16,
    color: '#718096',
  },
});

export default MapView; 