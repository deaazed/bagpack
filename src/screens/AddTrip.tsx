import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/types';
import { Button, Input } from '../components';

type AddTripNavigationProp = StackNavigationProp<MainStackParamList, 'AddTrip'>;

const AddTrip = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  
  const navigation = useNavigation<AddTripNavigationProp>();
  
  const handleAddTrip = () => {
    // Simuler l'ajout d'un voyage
    // Dans une application réelle, on enregistrerait ces données dans une base de données
    navigation.navigate('Home');
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Ajouter un nouveau voyage</Text>
      
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
        title="Créer le voyage"
        onPress={handleAddTrip}
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
    marginBottom: 24,
  },
  button: {
    marginTop: 24,
  },
});

export default AddTrip; 