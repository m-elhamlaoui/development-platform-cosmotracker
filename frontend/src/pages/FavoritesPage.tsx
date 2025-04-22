import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import EventsList from '../components/events/EventsList';
import { Star } from 'lucide-react';
import { fetchFavorites } from '../data/api';
import { CosmicEvent } from '../types';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<CosmicEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await fetchFavorites();
        setFavorites(data);
      } catch (error) {
        console.error('Failed to fetch favorites', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

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

        {loading ? (
          <p className="text-slate-400">Loading favorites...</p>
        ) : (
          <EventsList
            events={favorites}
            emptyMessage="You haven't added any events to your favorites yet."
          />
        )}
      </div>
    </Layout>
  );
};

export default FavoritesPage;
