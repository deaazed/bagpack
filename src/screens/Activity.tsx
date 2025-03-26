import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../navigation/types';
import { Button } from '../components';

type ActivityRouteProp = RouteProp<MainStackParamList, 'Activity'>;

const Activity = () => {
  const route = useRoute<ActivityRouteProp>();
  const { activityId, tripId } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Détail de l'activité</Text>
        <Text style={styles.subtitle}>ID de l'activité: {activityId}</Text>
        <Text style={styles.subtitle}>ID du voyage: {tripId}</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Tour Eiffel</Text>
          <Text style={styles.infoDate}>16 novembre 2023, 10:00 - 12:00</Text>
          <Text style={styles.infoLocation}>Champ de Mars, 5 Avenue Anatole France, 75007 Paris</Text>
          <Text style={styles.infoPrice}>Prix: 25€</Text>
          
          <Text style={styles.description}>
            Visite du monument emblématique de Paris. Profitez d'une vue imprenable sur la ville
            depuis le sommet de la Tour Eiffel, l'un des monuments les plus visités au monde.
          </Text>
        </View>
        
        <View style={styles.actionsContainer}>
          <Button
            title="Modifier l'activité"
            type="outline"
            style={styles.actionButton}
            onPress={() => {}}
          />
          <Button
            title="Supprimer l'activité"
            type="outline"
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => {}}
          />
        </View>
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
  subtitle: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 4,
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  infoDate: {
    fontSize: 16,
    color: '#5A67D8',
    marginBottom: 8,
  },
  infoLocation: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 8,
  },
  infoPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#48BB78',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
  },
  actionsContainer: {
    marginTop: 16,
  },
  actionButton: {
    marginBottom: 12,
  },
  deleteButton: {
    borderColor: '#E53E3E',
  },
});

export default Activity; 