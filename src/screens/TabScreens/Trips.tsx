import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TripsScreenNavigationProp } from '../../navigation/types';
import { Button, Card } from '../../components';
import { Trip } from '../../types';

// Données fictives pour les voyages
const trips: Trip[] = [
  {
    id: '1',
    destination: 'Paris',
    startDate: '2023-11-15',
    endDate: '2023-11-22',
    numberOfPeople: 2,
  },
  {
    id: '2',
    destination: 'Tokyo',
    startDate: '2024-03-10',
    endDate: '2024-03-20',
    numberOfPeople: 1,
  },
  {
    id: '3',
    destination: 'New York',
    startDate: '2024-07-05',
    endDate: '2024-07-12',
    numberOfPeople: 4,
  },
];

// Données fictives pour les voyages passés
const pastTrips: Trip[] = [
  {
    id: '4',
    destination: 'Rome',
    startDate: '2023-05-10',
    endDate: '2023-05-17',
    numberOfPeople: 2,
  },
  {
    id: '5',
    destination: 'Barcelone',
    startDate: '2022-08-20',
    endDate: '2022-08-27',
    numberOfPeople: 3,
  },
];

const Trips = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const navigation = useNavigation<TripsScreenNavigationProp>();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('fr-FR', options);
  };
  
  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const handleTripPress = (tripId: string) => {
    navigation.navigate('TripDetails', { tripId });
  };
  const handleAddTrip = () => {
    navigation.navigate('AddTrip' as never);
  };
  
  const renderTripItem = ({ item }: { item: Trip }) => {
    const days = calculateDays(item.startDate, item.endDate);
    
    return (
      <Card
        style={styles.tripCard}
        onPress={() => handleTripPress(item.id)}
      >
        <View style={styles.tripHeader}>
          <View style={styles.destinationContainer}>
            <Text style={styles.destinationText}>{item.destination}</Text>
            <Text style={styles.tripDates}>
              {formatDate(item.startDate)} - {formatDate(item.endDate)}
            </Text>
          </View>
          <View style={styles.daysContainer}>
            <Text style={styles.daysNumber}>{days}</Text>
            <Text style={styles.daysText}>jours</Text>
          </View>
        </View>
        
        <View style={styles.tripDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>👥</Text>
            <Text style={styles.detailText}>
              {item.numberOfPeople} {item.numberOfPeople > 1 ? 'personnes' : 'personne'}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🏨</Text>
            <Text style={styles.detailText}>
              {item.accommodations ? item.accommodations.length : 0} hébergements
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🚆</Text>
            <Text style={styles.detailText}>
              {item.transportations ? item.transportations.length : 0} transports
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🎭</Text>
            <Text style={styles.detailText}>
              {item.activities ? item.activities.length : 0} activités
            </Text>
          </View>
        </View>
      </Card>
    );
  };
  
  const EmptyTripsView = () => (
    <View style={styles.emptyContainer}>
      <Image 
        style={styles.emptyImage} 
        resizeMode="contain" 
      />
      <Text style={styles.emptyTitle}>
        Aucun voyage {activeTab === 'upcoming' ? 'à venir' : 'passé'}
      </Text>
      <Text style={styles.emptyDescription}>
        {activeTab === 'upcoming' 
          ? 'Commencez à planifier votre prochain voyage dès maintenant!' 
          : 'Vos voyages passés apparaîtront ici.'
        }
      </Text>
      {activeTab === 'upcoming' && (
        <Button 
          title="Ajouter un voyage" 
          onPress={handleAddTrip} 
          style={styles.addButton}
        />
      )}
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Voyages</Text>
        <Button
          title="+ Ajouter"
          onPress={handleAddTrip}
          type="outline"
          size="small"
        />
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'upcoming' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.activeTabText,
            ]}
          >
            À venir
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'past' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'past' && styles.activeTabText,
            ]}
          >
            Passés
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'upcoming' ? (
        trips.length > 0 ? (
          <FlatList
            data={trips}
            renderItem={renderTripItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.tripsList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyTripsView />
        )
      ) : (
        pastTrips.length > 0 ? (
          <FlatList
            data={pastTrips}
            renderItem={renderTripItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.tripsList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyTripsView />
        )
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
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
  tripsList: {
    paddingBottom: 24,
  },
  tripCard: {
    marginBottom: 16,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  destinationContainer: {
    flex: 1,
  },
  destinationText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  tripDates: {
    fontSize: 14,
    color: '#718096',
  },
  daysContainer: {
    backgroundColor: '#5A67D8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  daysNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  daysText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  tripDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#4A5568',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
  },
  addButton: {
    width: 200,
  },
});

export default Trips; 