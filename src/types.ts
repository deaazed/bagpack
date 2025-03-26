export type Notification = {
  id: string;
  type: 'event' | 'travel' | 'weather' | 'community' | 'reminder' | string;
  title: string;
  message: string;
  dateTime: string;
  read: boolean;
  actionLink?: string;
}; 

export type User = {
  id: string;
  name: string;
  avatar?: string;
};

export type CommunityEvent = {
  id: string;
  creator: User;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  maxParticipants: number;
  participants: User[];
};

export type Trip = {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
  accommodations?: any[];
  transportations?: any[];
  activities?: any[];
}; 