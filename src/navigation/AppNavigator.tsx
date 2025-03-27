import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackParamList, TabParamList } from './types';
import { Text } from 'react-native';

// Importation des écrans (à créer ultérieurement)
import OnboardingScreen from '../screens/Onboarding';
import AuthScreen from '../screens/Auth';
import TripDetailsScreen from '../screens/TripDetails';
import DestinationInfoScreen from '../screens/DestinationInfo';
import AddTripScreen from '../screens/AddTrip';
import EditTripScreen from '../screens/EditTrip';
import ItineraryPlannerScreen from '../screens/ItineraryPlanner';
import ActivityScreen from '../screens/Activity';
import SettingsScreen from '../screens/Settings';
import CommunityEventsScreen from '../screens/CommunityEvents';
import CommunityEventDetailsScreen from '../screens/CommunityEventDetails';
import ProfileScreen from '../screens/Profile';
import NotificationsScreen from '../screens/Notifications';
import MapViewScreen from '../screens/MapView';

// Importation des écrans pour les onglets
import ExploreScreen from '../screens/TabScreens/Explore';
import TripsScreen from '../screens/TabScreens/Trips';
import PlannerScreen from '../screens/TabScreens/Planner';
import CommunityScreen from '../screens/TabScreens/Community';

// Création des navigateurs
const MainStack = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Navigateur à onglets
const TabNavigator = () => {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5A67D8',
        tabBarInactiveTintColor: '#718096',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          paddingVertical: 8,
        },
      }}
    >
      <Tab.Screen 
        name="Explore" 
        component={ExploreScreen} 
        options={{
          tabBarLabel: 'Explorer',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color: color }}>🌍</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Trips" 
        component={TripsScreen} 
        options={{
          tabBarLabel: 'Voyages',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color: color }}>🧳</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Planner" 
        component={PlannerScreen} 
        options={{
          tabBarLabel: 'Planifier',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color: color }}>📆</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Community" 
        component={CommunityScreen} 
        options={{
          tabBarLabel: 'Communauté',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color: color }}>👥</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color: color }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Navigateur principal
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator 
        id={undefined}
        initialRouteName="Onboarding"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTitleStyle: {
            fontWeight: '600',
            color: '#2D3748',
          },
          cardStyle: { backgroundColor: '#F7FAFC' },
          headerShown: true,
        }}
      >
        <MainStack.Screen 
          name="Onboarding" 
          component={OnboardingScreen} 
          options={{ headerShown: false }}
        />
        <MainStack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ headerShown: false }}
        />
        <MainStack.Screen 
          name="Home" 
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
        <MainStack.Screen 
          name="TripDetails" 
          component={TripDetailsScreen} 
          options={{ title: 'Détails du voyage' }}
        />
        <MainStack.Screen 
          name="DestinationInfo" 
          component={DestinationInfoScreen} 
          options={{ title: 'Informations sur la destination' }}
        />
        <MainStack.Screen 
          name="AddTrip" 
          component={AddTripScreen} 
          options={{ title: 'Ajouter un voyage' }}
        />
        <MainStack.Screen 
          name="EditTrip" 
          component={EditTripScreen} 
          options={{ title: 'Modifier le voyage' }}
        />
        <MainStack.Screen 
          name="ItineraryPlanner" 
          component={ItineraryPlannerScreen} 
          options={{ title: 'Planificateur d\'itinéraire' }}
        />
        <MainStack.Screen 
          name="Activity" 
          component={ActivityScreen} 
          options={{ title: 'Activité' }}
        />
        <MainStack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: 'Paramètres' }}
        />
        <MainStack.Screen 
          name="CommunityEvents" 
          component={CommunityEventsScreen} 
          options={{ title: 'Événements communautaires' }}
        />
        <MainStack.Screen 
          name="CommunityEventDetails" 
          component={CommunityEventDetailsScreen} 
          options={{ title: 'Détails de l\'événement' }}
        />
        <MainStack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Profil' }}
        />
        <MainStack.Screen 
          name="Notifications" 
          component={NotificationsScreen} 
          options={{ title: 'Notifications' }}
        />
        <MainStack.Screen 
          name="MapView" 
          component={MapViewScreen} 
          options={{ title: 'Carte' }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 