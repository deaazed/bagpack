import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/types';
import { Button } from '../components';

type SettingsNavigationProp = StackNavigationProp<MainStackParamList, 'Settings'>;

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  
  const navigation = useNavigation<SettingsNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Paramètres</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Général</Text>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingDescription}>Activer les notifications push</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#CBD5E0', true: '#5A67D8' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Mode sombre</Text>
              <Text style={styles.settingDescription}>Activer le thème sombre</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#CBD5E0', true: '#5A67D8' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Confidentialité</Text>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Services de localisation</Text>
              <Text style={styles.settingDescription}>Permettre à l'application d'accéder à votre position</Text>
            </View>
            <Switch
              value={locationServices}
              onValueChange={setLocationServices}
              trackColor={{ false: '#CBD5E0', true: '#5A67D8' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Données</Text>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Mode hors-ligne</Text>
              <Text style={styles.settingDescription}>Télécharger les données pour une utilisation sans internet</Text>
            </View>
            <Switch
              value={offlineMode}
              onValueChange={setOfflineMode}
              trackColor={{ false: '#CBD5E0', true: '#5A67D8' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          
          <Button
            title="Modifier le profil"
            type="outline"
            onPress={() => navigation.navigate('Profile' as never)}
            style={styles.accountButton}
          />
          
          <Button
            title="Changer le mot de passe"
            type="outline"
            onPress={() => {}}
            style={styles.accountButton}
          />
        </View>
        
        <Button
          title="Se déconnecter"
          type="outline"
          onPress={() => navigation.navigate('Auth')}
          style={styles.logoutButton}
        />
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
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3748',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#718096',
  },
  accountButton: {
    marginBottom: 12,
  },
  logoutButton: {
    marginTop: 8,
    borderColor: '#E53E3E',
  },
});

export default Settings; 