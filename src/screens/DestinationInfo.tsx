import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../navigation/types';

type DestinationInfoRouteProp = RouteProp<MainStackParamList, 'DestinationInfo'>;

const DestinationInfo = () => {
  const route = useRoute<DestinationInfoRouteProp>();
  const { destination } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{destination}</Text>
        <Text style={styles.description}>
          Informations détaillées sur la destination. Cette section contiendra une description
          complète, des informations sur les quartiers, les transports, et d'autres conseils pratiques.
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
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
  },
});

export default DestinationInfo; 