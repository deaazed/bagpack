import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  useWindowDimensions, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/types';
import { Button } from '../components';

type OnboardingNavigationProp = StackNavigationProp<MainStackParamList, 'Onboarding'>;

const slides = [
  {
    id: '1',
    title: 'Planifiez vos voyages',
    description: 'Organisez facilement vos voyages avec un rétroplanning personnalisé incluant toutes vos activités.',
    image: "",
  },
  {
    id: '2',
    title: 'Découvrez votre destination',
    description: 'Accédez à toutes les informations importantes sur votre destination : quartiers, transports, activités.',
    image: "",
  },
  {
    id: '3',
    title: 'Connectez-vous avec d\'autres voyageurs',
    description: 'Partagez des conseils, organisez des rencontres et découvrez les meilleures expériences locales.',
    image: "",
  },
];

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation<OnboardingNavigationProp>();
  const { width } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentIndex + 1;
    if (nextSlideIndex !== slides.length) {
      flatListRef.current?.scrollToIndex({ index: nextSlideIndex });
      setCurrentIndex(nextSlideIndex);
    } else {
      navigation.replace('Auth');
    }
  };

  const skip = () => {
    navigation.replace('Auth');
  };

  const Footer = () => {
    return (
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.indicator, 
                currentIndex === index && styles.activeIndicator
              ]} 
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {currentIndex !== slides.length - 1 ? (
            <View style={styles.footerButtons}>
              <TouchableOpacity onPress={skip}>
                <Text style={styles.skipText}>Passer</Text>
              </TouchableOpacity>
              <Button 
                title="Suivant" 
                onPress={goToNextSlide} 
                style={styles.button} 
              />
            </View>
          ) : (
            <Button 
              title="Commencer" 
              onPress={goToNextSlide} 
              style={styles.getStartedButton} 
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Image 
              source={item.image} 
              style={[styles.image, { width: width * 0.8 }]} 
              resizeMode="contain" 
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={updateCurrentSlideIndex}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    flex: 0.6,
    height: '60%',
  },
  textContainer: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E0',
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 20,
    backgroundColor: '#5A67D8',
  },
  buttonContainer: {
    marginBottom: 10,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 120,
  },
  getStartedButton: {
    width: '100%',
  },
  skipText: {
    fontSize: 16,
    color: '#4A5568',
    fontWeight: '500',
  },
});

export default Onboarding; 