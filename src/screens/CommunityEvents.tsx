import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const CommunityEvents = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Événements communautaires</Text>
        <Text style={styles.description}>
          Cette page affichera la liste complète des événements communautaires à venir.
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

export default CommunityEvents; 