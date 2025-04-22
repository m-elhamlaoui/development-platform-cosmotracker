import React from 'react';
import { Star } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { MOCK_EVENTS } from '../data/mockEvents';
import EventsList from '../components/events/EventsList';
import { useAuth } from '../context/AuthContext';

const FavoritesPage: React.FC = () => {
  const { user } = useAuth();
  
  const favoriteEvents = MOCK_EVENTS.filter(
    event => user?.favorites.includes(event.id)
  );
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start gap-4 mb-8">
          <div className="mt-1 bg-accent-900/40 p-3 rounded-lg text-accent-400">
            <Star className="h-6 w-6" fill="currentColor" />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Your Favorite Events</h1>
            <p className="text-slate-400">
              Here are all the celestial events you've saved to your favorites.
            </p>
          </div>
        </div>
        
        <EventsList 
          events={favoriteEvents} 
          emptyMessage="You haven't added any events to your favorites yet. Browse events and star the ones you're interested in."
        />
      </div>
    </Layout>
  );
};

export default FavoritesPage;