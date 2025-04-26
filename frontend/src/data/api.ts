import { CosmicEvent } from '../types';
import { authorizedFetch } from '../utils/api';

const BASE_URL = 'http://localhost:8081/api/events';

// Fetch all favorites
export const fetchFavorites = async (): Promise<CosmicEvent[]> => {
  const response = await authorizedFetch('http://localhost:8081/api/favorites');
  if (!response.ok) throw new Error('Failed to fetch favorites');
  return response.json();
};

// Add an event to favorites
export const addFavorite = async (eventId: string) => {
  const response = await authorizedFetch(`http://localhost:8081/api/favorites/${eventId}`, { method: 'POST' });
  if (!response.ok) throw new Error('Failed to add favorite');
};

// Remove an event from favorites
export const removeFavorite = async (eventId: string) => {
  const response = await authorizedFetch(`http://localhost:8081/api/favorites/${eventId}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to remove favorite');
};

// Fetch all events
export const fetchAllEvents = async (): Promise<CosmicEvent[]> => {
  const response = await authorizedFetch(BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch events');
  return response.json();
};

// Fetch one event by ID
export const fetchEventById = async (id: number): Promise<CosmicEvent> => {
  const response = await authorizedFetch(`${BASE_URL}/${id}`);
  const contentType = response.headers.get('content-type');
  if (!response.ok || !contentType?.includes('application/json')) {
    const errorText = await response.text();
    console.error('Error response:', errorText);
    throw new Error('Expected JSON but received HTML or other content');
  }
  return response.json();
};

// Update user profile
export const updateUserProfile = async (data: {
  username?: string;
  email?: string;
  password?: string;
}) => {
  const response = await authorizedFetch('http://localhost:8081/api/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update profile');
  }
  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return await response.json();
  }
  return {};
};

// Fetch events by month
export const fetchEventsByMonth = async (month: string): Promise<CosmicEvent[]> => {
  const response = await authorizedFetch(`${BASE_URL}?month=${month}`);
  if (!response.ok) throw new Error('Failed to fetch monthly events');
  return response.json();
};
