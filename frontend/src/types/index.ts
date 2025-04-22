export interface User {
  id?: string;
  username: string;
  email?: string;
  favorites?: string[];
  token: string;
}


export interface CosmicEvent {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  endDate: string | null;
  type: string;
  visibility: string;
  constellations: string;
  source: string;
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