import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Types pour les paramètres des écrans dans la StackNavigation principale
export type MainStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Home: undefined;
  TripDetails: { tripId: string };
  DestinationInfo: { destination: string };
  AddTrip: undefined;
  EditTrip: { tripId: string };
  ItineraryPlanner: { tripId: string };
  Activity: { activityId: string; tripId: string };
  Settings: undefined;
  CommunityEvents: undefined;
  CommunityEventDetails: { eventId: string };
  Profile: { userId?: string };
  Notifications: undefined;
  MapView: { destination: string };
};

// Types pour les paramètres des écrans dans la TabNavigation
export type TabParamList = {
  Explore: undefined;
  Trips: undefined;
  Planner: undefined;
  Community: undefined;
  Profile: undefined;
};

// Types composés pour la navigation combinée
export type ExploreScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Explore'>,
  StackNavigationProp<MainStackParamList>
>;

export type TripsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Trips'>,
  StackNavigationProp<MainStackParamList>
>;

export type PlannerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Planner'>,
  StackNavigationProp<MainStackParamList>
>;

export type CommunityScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Community'>,
  StackNavigationProp<MainStackParamList>
>;

export type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Profile'>,
  StackNavigationProp<MainStackParamList>
>;

// Types pour les paramètres d'écran
export type TripDetailsRouteProp = RouteProp<MainStackParamList, 'TripDetails'>;
export type DestinationInfoRouteProp = RouteProp<MainStackParamList, 'DestinationInfo'>;
export type EditTripRouteProp = RouteProp<MainStackParamList, 'EditTrip'>;
export type ItineraryPlannerRouteProp = RouteProp<MainStackParamList, 'ItineraryPlanner'>;
export type ActivityRouteProp = RouteProp<MainStackParamList, 'Activity'>;
export type CommunityEventDetailsRouteProp = RouteProp<MainStackParamList, 'CommunityEventDetails'>; 