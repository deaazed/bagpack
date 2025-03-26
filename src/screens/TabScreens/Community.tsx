import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  FlatList, 
  Image,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommunityScreenNavigationProp } from '../../navigation/types';
import { Card, Button } from '../../components';
import { CommunityEvent } from '../../types';

// Données fictives pour les événements de la communauté
const communityEvents: CommunityEvent[] = [
  {
    id: '1',
    creator: {
      id: '101',
      name: 'Sophie Martin',
    },
    title: 'Visite guidée du quartier Montmartre',
    description: 'Découverte des petites rues pittoresques et des spots secrets de Montmartre, suivie d\'un verre ensemble.',
    dateTime: '2023-11-18T14:00:00',
    location: 'Place des Abbesses, Paris',
    maxParticipants: 8,
    participants: [
      {
        id: '101',
        name: 'Sophie Martin',
      },
      {
        id: '102',
        name: 'Thomas Dubois',
      },
      {
        id: '103',
        name: 'Emma Laurent',
      },
    ],
  },
  {
    id: '2',
    creator: {
      id: '104',
      name: 'Nicolas Moreau',
    },
    title: 'Dîner découverte de la cuisine japonaise',
    description: 'Soirée conviviale autour d\'un repas japonais traditionnel. Parfait pour les amateurs de cuisine et les voyageurs solitaires.',
    dateTime: '2023-11-20T19:30:00',
    location: 'Restaurant Sakura, Tokyo',
    maxParticipants: 6,
    participants: [
      {
        id: '104',
        name: 'Nicolas Moreau',
      },
      {
        id: '105',
        name: 'Julie Petit',
      },
    ],
  },
  {
    id: '3',
    creator: {
      id: '106',
      name: 'Alexandre Rousseau',
    },
    title: 'Randonnée dans Central Park',
    description: 'Balade matinale à travers Central Park pour découvrir les points d\'intérêt et prendre quelques photos ensemble.',
    dateTime: '2023-11-25T09:00:00',
    location: 'Entrée sud de Central Park, New York',
    maxParticipants: 10,
    participants: [
      {
        id: '106',
        name: 'Alexandre Rousseau',
      },
      {
        id: '107',
        name: 'Marie Lefevre',
      },
      {
        id: '108',
        name: 'Paul Dupont',
      },
      {
        id: '109',
        name: 'Camille Bernard',
      },
    ],
  },
];

// Données fictives pour les conseils de voyageurs
const travelerTips = [
  {
    id: '1',
    user: {
      id: '101',
      name: 'Sophie Martin',
      avatar: "",
    },
    destination: 'Paris',
    tip: 'Le musée d\'Orsay est gratuit chaque premier dimanche du mois. Pensez à réserver vos billets à l\'avance !',
    likes: 42,
    comments: 5,
    date: '2023-11-10',
  },
  {
    id: '2',
    user: {
      id: '104',
      name: 'Nicolas Moreau',
      avatar: "",
    },
    destination: 'Tokyo',
    tip: 'Achetez une carte Suica rechargeable pour vous déplacer facilement dans toute la ville. C\'est bien plus pratique que d\'acheter des tickets individuels.',
    likes: 28,
    comments: 3,
    date: '2023-11-08',
  },
  {
    id: '3',
    user: {
      id: '106',
      name: 'Alexandre Rousseau',
      avatar: "",
    },
    destination: 'New York',
    tip: 'Le ferry pour Staten Island est gratuit et offre une vue imprenable sur la statue de la Liberté et la skyline de Manhattan.',
    likes: 35,
    comments: 7,
    date: '2023-11-05',
  },
];

const Community = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'tips'>('events');
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigation = useNavigation<CommunityScreenNavigationProp>();
  
  const handleEventPress = (eventId: string) => {
    navigation.navigate('CommunityEventDetails', { eventId });
  };
  
  const handleCreateEvent = () => {
    // Logique pour créer un nouvel événement
    // Pourrait naviguer vers un écran de création d'événement
  };
  
  const handleJoinEvent = () => {
    // Logique pour rejoindre un événement
  };
  
  const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const renderEventItem = ({ item }: { item: CommunityEvent }) => (
    <Card 
      style={styles.eventCard}
      onPress={() => handleEventPress(item.id)}
    >
      <View style={styles.eventHeader}>
        <View style={styles.creatorInfo}>
          <View style={styles.creatorAvatar}>
            <Text style={styles.creatorInitial}>{item.creator.name.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.creatorName}>{item.creator.name}</Text>
            <Text style={styles.eventDateTime}>
              {formatDate(item.dateTime)} à {formatTime(item.dateTime)}
            </Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.eventLocation}>
        <Text style={styles.locationIcon}>📍</Text>
        <Text style={styles.locationText}>{item.location}</Text>
      </View>
      
      <View style={styles.eventFooter}>
        <View style={styles.participantsContainer}>
          <Text style={styles.participantsText}>
            {item.participants.length}/{item.maxParticipants} participants
          </Text>
          <View style={styles.participantsAvatars}>
            {item.participants.slice(0, 3).map((participant, index) => (
              <View 
                key={participant.id} 
                style={[styles.participantAvatar, { zIndex: 3 - index, marginLeft: index > 0 ? -10 : 0 }]}
              >
                <Text style={styles.participantInitial}>{participant.name.charAt(0)}</Text>
              </View>
            ))}
            {item.participants.length > 3 && (
              <View style={[styles.participantAvatar, styles.moreParticipants, { marginLeft: -10 }]}>
                <Text style={styles.moreParticipantsText}>+{item.participants.length - 3}</Text>
              </View>
            )}
          </View>
        </View>
        
        <Button
          title="Rejoindre"
          onPress={handleJoinEvent}
          size="small"
          style={styles.joinButton}
        />
      </View>
    </Card>
  );
  
  const renderTipItem = ({ item }: any) => (
    <Card style={styles.tipCard}>
      <View style={styles.tipHeader}>
        <View style={styles.userInfo}>
          <Image source={item.user.avatar} style={styles.userAvatar} />
          <View>
            <Text style={styles.userName}>{item.user.name}</Text>
            <Text style={styles.tipDate}>{item.date}</Text>
          </View>
        </View>
        <View style={styles.destinationTag}>
          <Text style={styles.destinationText}>{item.destination}</Text>
        </View>
      </View>
      
      <Text style={styles.tipContent}>{item.tip}</Text>
      
      <View style={styles.tipActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>❤️</Text>
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>🔗</Text>
          <Text style={styles.actionText}>Partager</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Communauté</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher des événements, conseils..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'events' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('events')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'events' && styles.activeTabText,
            ]}
          >
            Événements
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'tips' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('tips')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'tips' && styles.activeTabText,
            ]}
          >
            Conseils
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'events' ? (
        <View style={styles.eventsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Événements à venir</Text>
            <Button
              title="+ Créer"
              onPress={handleCreateEvent}
              type="outline"
              size="small"
            />
          </View>
          
          <FlatList
            data={communityEvents}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.eventsList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={styles.tipsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Conseils des voyageurs</Text>
            <Button
              title="+ Ajouter"
              onPress={() => {}}
              type="outline"
              size="small"
            />
          </View>
          
          <FlatList
            data={travelerTips}
            renderItem={renderTipItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.tipsList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2D3748',
  },
  searchButton: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#5A67D8',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  eventsContainer: {
    flex: 1,
  },
  tipsContainer: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  eventsList: {
    paddingBottom: 24,
  },
  tipsList: {
    paddingBottom: 24,
  },
  eventCard: {
    marginBottom: 16,
  },
  eventHeader: {
    marginBottom: 12,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5A67D8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  creatorInitial: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  creatorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 2,
  },
  eventDateTime: {
    fontSize: 14,
    color: '#718096',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 12,
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#718096',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 12,
  },
  participantsContainer: {
    flex: 1,
  },
  participantsText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 6,
  },
  participantsAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F6AD55',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  participantInitial: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  moreParticipants: {
    backgroundColor: '#CBD5E0',
  },
  moreParticipantsText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4A5568',
  },
  joinButton: {
    width: 100,
  },
  tipCard: {
    marginBottom: 16,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 2,
  },
  tipDate: {
    fontSize: 14,
    color: '#718096',
  },
  destinationTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#EBF8FF',
    borderRadius: 4,
  },
  destinationText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4299E1',
  },
  tipContent: {
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 16,
    lineHeight: 24,
  },
  tipActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#718096',
  },
});

export default Community; 