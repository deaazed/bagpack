import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../navigation/types';
import { Button } from '../components';

type CommunityEventDetailsRouteProp = RouteProp<MainStackParamList, 'CommunityEventDetails'>;

const CommunityEventDetails = () => {
  const route = useRoute<CommunityEventDetailsRouteProp>();
  const { eventId } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Détails de l'événement</Text>
        <Text style={styles.eventId}>ID de l'événement: {eventId}</Text>
        
        <View style={styles.eventContainer}>
          <Text style={styles.eventTitle}>Visite guidée du quartier Montmartre</Text>
          <Text style={styles.eventOrganizer}>Organisé par Sophie Martin</Text>
          <Text style={styles.eventDateTime}>18 novembre 2023 à 14:00</Text>
          <Text style={styles.eventLocation}>Place des Abbesses, Paris</Text>
          
          <Text style={styles.eventDescription}>
            Découverte des petites rues pittoresques et des spots secrets de Montmartre, 
            suivie d'un verre ensemble. Parfait pour les amateurs d'art et d'histoire !
          </Text>
          
          <View style={styles.participantsInfo}>
            <Text style={styles.participantsTitle}>Participants (3/8)</Text>
            <Text style={styles.participant}>• Sophie Martin (Organisateur)</Text>
            <Text style={styles.participant}>• Thomas Dubois</Text>
            <Text style={styles.participant}>• Emma Laurent</Text>
          </View>
          
          <Button
            title="Rejoindre l'événement"
            onPress={() => {}}
            style={styles.joinButton}
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
  eventId: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 24,
  },
  eventContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  eventOrganizer: {
    fontSize: 16,
    color: '#5A67D8',
    marginBottom: 8,
  },
  eventDateTime: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 16,
  },
  eventDescription: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
    marginBottom: 24,
  },
  participantsInfo: {
    marginBottom: 24,
  },
  participantsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
  },
  participant: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 8,
  },
  joinButton: {
    marginTop: 8,
  },
});

export default CommunityEventDetails; 