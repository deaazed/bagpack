export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
  activities?: Activity[];
  accommodations?: Accommodation[];
  transportations?: Transportation[];
  notes?: string;
}

export interface Activity {
  id: string;
  name: string;
  description?: string;
  location?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  price?: number;
  rating?: number;
  category: 'tourist' | 'cultural' | 'local' | 'gastronomic' | 'outdoors';
  bookingLink?: string;
}

export interface Accommodation {
  id: string;
  name: string;
  address: string;
  checkIn: string;
  checkOut: string;
  price?: number;
  bookingRef?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Transportation {
  id: string;
  type: 'flight' | 'train' | 'bus' | 'ferry' | 'car' | 'other';
  departureLocation: string;
  arrivalLocation: string;
  departureDateTime: string;
  arrivalDateTime: string;
  bookingRef?: string;
  price?: number;
}

export interface DestinationInfo {
  id: string;
  name: string;
  country: string;
  description: string;
  neighborhoods: Neighborhood[];
  transportOptions: TransportOption[];
  weather: Weather;
  currency: string;
  language: string;
  emergencyContacts: EmergencyContact[];
  timeZone: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  description: string;
  highlights: string[];
}

export interface TransportOption {
  type: string;
  description: string;
  averagePrice: string;
}

export interface Weather {
  season: string;
  averageTemperature: string;
  precipitation: string;
}

export interface EmergencyContact {
  service: string;
  number: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences?: {
    categories?: string[];
    budget?: 'low' | 'medium' | 'high';
    pace?: 'relaxed' | 'balanced' | 'intensive';
    interests?: string[];
  };
  trips?: Trip[];
}

export interface CommunityEvent {
  id: string;
  creator: {
    id: string;
    name: string;
  };
  title: string;
  description: string;
  dateTime: string;
  location: string;
  maxParticipants?: number;
  participants: {
    id: string;
    name: string;
  }[];
}

export interface Notification {
  id: string;
  type: 'event' | 'weather' | 'travel' | 'community' | 'reminder';
  title: string;
  message: string;
  dateTime: string;
  read: boolean;
  actionLink?: string;
} 