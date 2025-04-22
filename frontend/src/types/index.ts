export interface User {
  id: string;
  username: string;
  email: string;
  favorites: string[];
}

export interface CosmicEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  endDate: string | null;
  type: string;
  visibility: string;
  constellations: string;
  source: string;
  imageUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  addToFavorites: (eventId: string) => void;
  removeFromFavorites: (eventId: string) => void;
}