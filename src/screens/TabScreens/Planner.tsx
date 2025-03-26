import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  FlatList,
  Image
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { PlannerScreenNavigationProp } from '../../navigation/types';
import { Card, Button } from '../../components';
import { Trip, Activity } from '../../types';

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
];

// Données fictives pour les activités
const activities: Activity[] = [
  {
    id: '1',
    name: 'Tour Eiffel',
    description: 'Visite du monument emblématique de Paris',
    location: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris',
    date: '2023-11-16',
    startTime: '10:00',
    endTime: '12:00',
    price: 25,
    category: 'tourist',
  },
  {
    id: '2',
    name: 'Musée du Louvre',
    description: 'Découverte des collections du plus grand musée du monde',
    location: 'Rue de Rivoli, 75001 Paris',
    date: '2023-11-17',
    startTime: '14:00',
    endTime: '17:00',
    price: 15,
    category: 'cultural',
  },
  {
    id: '3',
    name: 'Croisière sur la Seine',
    description: 'Balade en bateau pour admirer les monuments de Paris',
    location: 'Port de la Conférence, Pont de l\'Alma, 75008 Paris',
    date: '2023-11-18',
    startTime: '19:00',
    endTime: '21:00',
    price: 35,
    category: 'tourist',
  },
];

const Planner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(trips[0] || null);
  
  const navigation = useNavigation<PlannerScreenNavigationProp>();
  
  // Préparation des dates marquées pour le calendrier
  const getMarkedDates = () => {
    if (!selectedTrip) return {};
    
    const markedDates: any = {};
    
    // Marquer les dates de début et de fin du voyage
    markedDates[selectedTrip.startDate] = { 
      startingDay: true, 
      color: '#5A67D8', 
      textColor: 'white'
    };
    markedDates[selectedTrip.endDate] = { 
      endingDay: true, 
      color: '#5A67D8', 
      textColor: 'white'
    };
    
    // Marquer les jours entre le début et la fin
    const start = new Date(selectedTrip.startDate);
    const end = new Date(selectedTrip.endDate);
    const currentDate = new Date(start);
    currentDate.setDate(currentDate.getDate() + 1);
    
    while (currentDate < end) {
      const dateStr = currentDate.toISOString().split('T')[0];
      markedDates[dateStr] = { 
        color: '#5A67D8', 
        textColor: 'white'
      };
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Marquer la date sélectionnée
    if (selectedDate >= selectedTrip.startDate && selectedDate <= selectedTrip.endDate) {
      markedDates[selectedDate] = { 
        ...markedDates[selectedDate],
        selected: true,
        selectedColor: '#F6AD55',
      };
    }
    
    return markedDates;
  };
  
  // Filtrer les activités pour la date sélectionnée
  const getActivitiesForDate = () => {
    return activities.filter(activity => activity.date === selectedDate);
  };
  
  const formatTime = (time: string) => {
    return time;
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tourist':
        return '🏛️';
      case 'cultural':
        return '🎭';
      case 'local':
        return '🍷';
      case 'gastronomic':
        return '🍽️';
      case 'outdoors':
        return '🌳';
      default:
        return '📍';
    }
  };
  
  const handleTripSelect = (trip: Trip) => {
    setSelectedTrip(trip);
    setSelectedDate(trip.startDate);
  };
  
  const handleAddActivity = () => {
    if (selectedTrip) {
      navigation.navigate('ItineraryPlanner', { tripId: selectedTrip.id });
    }
  };
  
  const ActivityItem = ({ item }: { item: Activity }) => (
    <Card style={styles.activityCard}>
      <View style={styles.activityHeader}>
        <Text style={styles.categoryIcon}>{getCategoryIcon(item.category)}</Text>
        <View style={styles.activityTime}>
          <Text style={styles.timeText}>
            {formatTime(item.startTime)} - {formatTime(item.endTime)}
          </Text>
        </View>
      </View>
      
      <Text style={styles.activityName}>{item.name}</Text>
      <Text style={styles.activityLocation}>{item.location}</Text>
      
      {item.price && (
        <Text style={styles.activityPrice}>Prix: {item.price}€</Text>
      )}
      
      <View style={styles.activityActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
  
  const EmptyActivitiesView = () => (
    <View style={styles.emptyContainer}>
      <Image  
        style={styles.emptyImage}
        resizeMode="contain"
      />
      <Text style={styles.emptyTitle}>Aucune activité prévue</Text>
      <Text style={styles.emptyDescription}>
        Ajoutez des activités à votre planning pour cette journée
      </Text>
      <Button 
        title="Ajouter une activité" 
        onPress={handleAddActivity}
        style={styles.addButton}
      />
    </View>
  );
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Planificateur</Text>
      </View>
      
      <View style={styles.tripSelector}>
        <Text style={styles.sectionTitle}>Sélectionner un voyage:</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tripsList}
        >
          {trips.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              style={[
                styles.tripItem,
                selectedTrip?.id === trip.id && styles.selectedTripItem,
              ]}
              onPress={() => handleTripSelect(trip)}
            >
              <Text style={[
                styles.tripName,
                selectedTrip?.id === trip.id && styles.selectedTripName,
              ]}>
                {trip.destination}
              </Text>
              <Text style={[
                styles.tripDate,
                selectedTrip?.id === trip.id && styles.selectedTripDate,
              ]}>
                {trip.startDate.split('-')[2]}/{trip.startDate.split('-')[1]} - {trip.endDate.split('-')[2]}/{trip.endDate.split('-')[1]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {selectedTrip ? (
        <>
          <View style={styles.calendarContainer}>
            <Calendar
              markingType="period"
              markedDates={getMarkedDates()}
              onDayPress={(day) => setSelectedDate(day.dateString)}
              theme={{
                calendarBackground: '#FFFFFF',
                textSectionTitleColor: '#2D3748',
                selectedDayBackgroundColor: '#F6AD55',
                selectedDayTextColor: '#FFFFFF',
                todayTextColor: '#5A67D8',
                dayTextColor: '#2D3748',
                textDisabledColor: '#A0AEC0',
                dotColor: '#5A67D8',
                selectedDotColor: '#FFFFFF',
                arrowColor: '#5A67D8',
                monthTextColor: '#2D3748',
                indicatorColor: '#5A67D8',
              }}
            />
          </View>
          
          <View style={styles.activitiesSection}>
            <View style={styles.activitiesHeader}>
              <Text style={styles.sectionTitle}>
                Activités du {selectedDate.split('-')[2]}/{selectedDate.split('-')[1]}
              </Text>
              <Button
                title="+ Ajouter"
                onPress={handleAddActivity}
                type="outline"
                size="small"
              />
            </View>
            
            {getActivitiesForDate().length > 0 ? (
              <FlatList
                data={getActivitiesForDate()}
                renderItem={({ item }) => <ActivityItem item={item} />}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <EmptyActivitiesView />
            )}
          </View>
        </>
      ) : (
        <View style={styles.noTripContainer}>
          <Image
            style={styles.noTripImage}
            resizeMode="contain"
          />
          <Text style={styles.noTripTitle}>Aucun voyage disponible</Text>
          <Text style={styles.noTripDescription}>
            Créez d'abord un voyage pour pouvoir planifier vos activités
          </Text>
          <Button 
            title="Créer un voyage" 
            onPress={() => navigation.navigate('AddTrip')}
            style={styles.createTripButton}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
  },
  tripSelector: {
    marginBottom: 24,
  },
  tripsList: {
    paddingRight: 20,
  },
  tripItem: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minWidth: 120,
  },
  selectedTripItem: {
    backgroundColor: '#5A67D8',
    borderColor: '#5A67D8',
  },
  tripName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  selectedTripName: {
    color: '#FFFFFF',
  },
  tripDate: {
    fontSize: 12,
    color: '#718096',
  },
  selectedTripDate: {
    color: '#E2E8F0',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 24,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activitiesSection: {
    marginBottom: 24,
  },
  activitiesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityCard: {
    marginBottom: 16,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  activityTime: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#EBF4FF',
    borderRadius: 16,
  },
  timeText: {
    fontSize: 14,
    color: '#4299E1',
    fontWeight: '500',
  },
  activityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  activityLocation: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  activityPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#48BB78',
    marginBottom: 12,
  },
  activityActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 12,
    marginTop: 8,
  },
  actionButton: {
    marginRight: 16,
  },
  actionText: {
    fontSize: 14,
    color: '#5A67D8',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 16,
  },
  addButton: {
    width: 200,
  },
  noTripContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noTripImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  noTripTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  noTripDescription: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
  },
  createTripButton: {
    width: 200,
  },
});

export default Planner; 