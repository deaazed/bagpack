import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/types';
import { Button } from '../components';

type ProfileNavigationProp = StackNavigationProp<MainStackParamList, 'Profile'>;

const mockUser = {
  name: 'Sophie Martin',
  email: 'sophie.martin@example.com',
  avatar: "",
  trips: 5,
  reviews: 12,
  photos: 24,
};

const Profile = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  
  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{mockUser.name.charAt(0)}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{mockUser.name}</Text>
            <Text style={styles.userEmail}>{mockUser.email}</Text>
          </View>
        </View>
        
        <Button
          title="Paramètres"
          onPress={handleSettingsPress}
          type="outline"
          size="small"
        />
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{mockUser.trips}</Text>
          <Text style={styles.statLabel}>Voyages</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{mockUser.reviews}</Text>
          <Text style={styles.statLabel}>Avis</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{mockUser.photos}</Text>
          <Text style={styles.statLabel}>Photos</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mes préférences de voyage</Text>
        <View style={styles.preferencesContainer}>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceIcon}>🏖️</Text>
            <Text style={styles.preferenceText}>Plage</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceIcon}>🏛️</Text>
            <Text style={styles.preferenceText}>Culture</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceIcon}>🍽️</Text>
            <Text style={styles.preferenceText}>Gastronomie</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mes destinations préférées</Text>
        <View style={styles.destinationsContainer}>
          <TouchableOpacity style={styles.destinationItem}>
            <Text style={styles.destinationName}>Paris</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.destinationItem}>
            <Text style={styles.destinationName}>Tokyo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.destinationItem}>
            <Text style={styles.destinationName}>Rome</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Button
        title="Se déconnecter"
        onPress={() => navigation.navigate('Auth')}
        type="outline"
        style={styles.logoutButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5A67D8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#718096',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5A67D8',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#718096',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#E2E8F0',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
  },
  preferencesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  preferenceIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  preferenceText: {
    fontSize: 14,
    color: '#4A5568',
  },
  destinationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  destinationItem: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  destinationName: {
    fontSize: 14,
    color: '#4A5568',
  },
  logoutButton: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
});

export default Profile; 