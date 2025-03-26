import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/types';
import { Button, Input } from '../components';

type EditTripRouteProp = RouteProp<MainStackParamList, 'EditTrip'>;
type EditTripNavigationProp = StackNavigationProp<MainStackParamList, 'EditTrip'>;

const EditTrip = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  
  const route = useRoute<EditTripRouteProp>();
  const navigation = useNavigation<EditTripNavigationProp>();
  const { tripId } = route.params;
  
  useEffect(() => {
    // Simuler le chargement des données du voyage
    // Dans une application réelle, on récupérerait ces données depuis une API ou une base de données
    setDestination('Paris');
    setStartDate('15/11/2023');
    setEndDate('22/11/2023');
    setNumberOfPeople('2');
  }, [tripId]);
  
  const handleSaveTrip = () => {
    // Simuler la sauvegarde des modifications
    // Dans une application réelle, on enverrait ces données à une API ou une base de données
    navigation.navigate('TripDetails', { tripId });
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Modifier le voyage</Text>
      <Text style={styles.tripId}>ID du voyage: {tripId}</Text>
      
      <Input
        label="Destination"
        placeholder="Ex: Paris, Tokyo, New York..."
        value={destination}
        onChangeText={setDestination}
      />
      
      <Input
        label="Date de début"
        placeholder="JJ/MM/AAAA"
        value={startDate}
        onChangeText={setStartDate}
      />
      
      <Input
        label="Date de fin"
        placeholder="JJ/MM/AAAA"
        value={endDate}
        onChangeText={setEndDate}
      />
      
      <Input
        label="Nombre de personnes"
        placeholder="Ex: 2"
        value={numberOfPeople}
        onChangeText={setNumberOfPeople}
        keyboardType="numeric"
      />
      
      <Button
        title="Enregistrer les modifications"
        onPress={handleSaveTrip}
        style={styles.button}
      />
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
    marginBottom: 24,
  },
  button: {
    marginTop: 24,
  },
});

export default EditTrip; 