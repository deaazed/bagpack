import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Notification } from '../types';

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'event',
    title: 'Nouvel événement à proximité',
    message: 'Visite guidée du quartier Montmartre, demain à 14h.',
    dateTime: '2023-11-17T10:30:00',
    read: false,
    actionLink: 'CommunityEventDetails:1',
  },
  {
    id: '2',
    type: 'travel',
    title: 'Rappel de voyage',
    message: 'Votre vol pour Paris décolle dans 2 jours. N\'oubliez pas votre passeport !',
    dateTime: '2023-11-15T09:00:00',
    read: true,
    actionLink: 'TripDetails:1',
  },
  {
    id: '3',
    type: 'weather',
    title: 'Alerte météo',
    message: 'Prévisions de pluie à Paris pour le 16 novembre. Pensez à prendre un parapluie !',
    dateTime: '2023-11-14T16:45:00',
    read: false,
  },
  {
    id: '4',
    type: 'community',
    title: 'Nouveau message',
    message: 'Sophie a partagé un bon plan pour visiter le Louvre à prix réduit.',
    dateTime: '2023-11-13T11:20:00',
    read: true,
  },
  {
    id: '5',
    type: 'reminder',
    title: 'Réservation à confirmer',
    message: 'N\'oubliez pas de confirmer votre réservation au restaurant Le Jules Verne avant demain.',
    dateTime: '2023-11-12T14:10:00',
    read: true,
  },
];

const Notifications = () => {
  const formatNotificationTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const now = new Date();
    
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Aujourd'hui, ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    } else if (diffDays === 1) {
      return 'Hier';
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jours`;
    } else {
      return date.toLocaleDateString('fr-FR');
    }
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'event':
        return '🎭';
      case 'travel':
        return '✈️';
      case 'weather':
        return '☂️';
      case 'community':
        return '👥';
      case 'reminder':
        return '⏰';
      default:
        return '📋';
    }
  };
  
  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity style={[styles.notificationItem, !item.read && styles.unreadNotification]}>
      <View style={styles.notificationIconContainer}>
        <Text style={styles.notificationIcon}>{getNotificationIcon(item.type)}</Text>
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{formatNotificationTime(item.dateTime)}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
      </View>
      
      <FlatList
        data={mockNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsList}
        showsVerticalScrollIndicator={false}
      />
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
  notificationsList: {
    paddingTop: 12,
    paddingBottom: 24,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  unreadNotification: {
    backgroundColor: '#EBF8FF',
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: '#718096',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5A67D8',
    marginLeft: 8,
    alignSelf: 'center',
  },
});

export default Notifications; 