import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  FlatList,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ExploreScreenNavigationProp } from '../../navigation/types';
import { Card } from '../../components';
import AIChatAgent from '../../components/AIChatAgent';

// Données fictives pour les destinations populaires
const popularDestinations = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    image: "",
    rating: 4.8,
    description: 'La ville de la lumière, connue pour sa romance et son architecture.',
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japon',
    image: "",
    rating: 4.7,
    description: 'Une métropole vibrante mélangeant traditions et innovations futuristes.',
  },
  {
    id: '3',
    name: 'New York',
    country: 'États-Unis',
    image: "",
    rating: 4.6,
    description: 'La ville qui ne dort jamais, offrant une diversité incomparable.',
  },
];

// Données fictives pour les catégories de voyage
const travelCategories = [
  {
    id: '1',
    name: 'Plage',
    icon: '🏖️',
  },
  {
    id: '2',
    name: 'Montagne',
    icon: '⛰️',
  },
  {
    id: '3',
    name: 'Ville',
    icon: '🏙️',
  },
  {
    id: '4',
    name: 'Nature',
    icon: '🌳',
  },
  {
    id: '5',
    name: 'Culture',
    icon: '🏛️',
  },
];

// Données fictives pour les expériences recommandées
const recommendedExperiences = [
  {
    id: '1',
    title: 'Tour Eiffel de nuit',
    location: 'Paris, France',
    image: "",
    price: '€25',
    rating: 4.9,
  },
  {
    id: '2',
    title: 'Croisière sur la Seine',
    location: 'Paris, France',
    image: "",
    price: '€35',
    rating: 4.7,
  },
  {
    id: '3',
    title: 'Musée du Louvre',
    location: 'Paris, France',
    image: "",
    price: '€15',
    rating: 4.8,
  },
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAIChat, setShowAIChat] = useState(false);
  const navigation = useNavigation<ExploreScreenNavigationProp>();
  
  const handleDestinationPress = (destination: string) => {
    navigation.navigate('DestinationInfo', { destination });
  };

  const handleAIDestinationSelect = (destination: string) => {
    setSearchQuery(destination);
    setShowAIChat(false);
  };
  
  const renderDestinationItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.destinationItem}
      onPress={() => handleDestinationPress(item.name)}
    >
      <Image source={item.image} style={styles.destinationImage} />
      <View style={styles.destinationInfo}>
        <Text style={styles.destinationName}>{item.name}</Text>
        <Text style={styles.destinationCountry}>{item.country}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.ratingIcon}>★</Text>
        </View>
      </View>
      <Text style={styles.destinationDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );
  
  const renderCategoryItem = ({ item }: any) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  const renderExperienceItem = ({ item }: any) => (
    <Card style={styles.experienceCard}>
      <Image source={item.image} style={styles.experienceImage} />
      <View style={styles.experienceInfo}>
        <Text style={styles.experienceTitle}>{item.title}</Text>
        <Text style={styles.experienceLocation}>{item.location}</Text>
        <View style={styles.experienceFooter}>
          <Text style={styles.experiencePrice}>{item.price}</Text>
          <View style={styles.experienceRating}>
            <Text style={styles.experienceRatingValue}>{item.rating}</Text>
            <Text style={styles.experienceRatingIcon}>★</Text>
          </View>
        </View>
      </View>
    </Card>
  );
  
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Bonjour 👋</Text>
            <Text style={styles.subtitle}>Où souhaitez-vous aller ?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une destination..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={styles.aiButton}
          onPress={() => setShowAIChat(true)}
        >
          <Text style={styles.aiButtonText}>Planifier avec l'IA</Text>
          <Text style={styles.aiIcon}>🤖</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showAIChat}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Assistant IA</Text>
            <TouchableOpacity 
              onPress={() => setShowAIChat(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <AIChatAgent onDestinationSelect={handleAIDestinationSelect} />
        </View>
      </Modal>
      
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Catégories</Text>
        <FlatList
          data={travelCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      
      <View style={styles.destinationsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Destinations populaires</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={popularDestinations}
          renderItem={renderDestinationItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destinationsList}
        />
      </View>
      
      <View style={styles.experiencesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Expériences recommandées</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>
        {recommendedExperiences.map((experience) => (
          <TouchableOpacity key={experience.id}>
            {renderExperienceItem({ item: experience })}
          </TouchableOpacity>
        ))}
      </View>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#718096',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2D3748',
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5A67D8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  aiButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  aiIcon: {
    fontSize: 16,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
  },
  categoriesList: {
    paddingRight: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#4A5568',
    textAlign: 'center',
  },
  destinationsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#5A67D8',
    fontWeight: '500',
  },
  destinationsList: {
    paddingRight: 20,
  },
  destinationItem: {
    width: 240,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  destinationImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  destinationInfo: {
    padding: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  destinationName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  destinationCountry: {
    flex: 2,
    fontSize: 14,
    color: '#718096',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D3748',
    marginRight: 2,
  },
  ratingIcon: {
    fontSize: 14,
    color: '#F6AD55',
  },
  destinationDescription: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    fontSize: 14,
    color: '#4A5568',
  },
  experiencesSection: {
    marginBottom: 24,
  },
  experienceCard: {
    marginBottom: 16,
  },
  experienceImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  experienceInfo: {
    padding: 16,
  },
  experienceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  experienceLocation: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 12,
  },
  experienceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  experiencePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5A67D8',
  },
  experienceRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  experienceRatingValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D3748',
    marginRight: 2,
  },
  experienceRatingIcon: {
    fontSize: 14,
    color: '#F6AD55',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#718096',
  },
  notificationButton: {
    padding: 8,
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  notificationIcon: {
    fontSize: 20,
    color: '#718096',
  },
});

export default Explore; 