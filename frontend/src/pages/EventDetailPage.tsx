import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Info, ArrowLeft, Star } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { CosmicEvent } from '../types';
import { formatDate } from '../utils/dateUtils';
import { useAuth } from '../context/AuthContext';
import { fetchEventById } from '../data/api';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, addToFavorites, removeFromFavorites } = useAuth();
  const [event, setEvent] = useState<CosmicEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        if (!id) {
          throw new Error('No event ID provided');
        }
        
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
          throw new Error('Invalid event ID');
        }

        const data = await fetchEventById(numericId);
        setEvent(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load event', err);
        setError(err instanceof Error ? err.message : 'Failed to load event');
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const handleGoBack = () => navigate(-1);

  const isFavorite = user?.favorites?.includes(String(event?.id)) || false;

  const handleToggleFavorite = () => {
    if (!event || !user) return;
    if (isFavorite) {
      removeFromFavorites(String(event.id));
    } else {
      addToFavorites(String(event.id));
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-slate-400">Loading event details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !event) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {error || 'Event Not Found'}
          </h1>
          <p className="text-slate-400 mb-8">
            {error 
              ? `Error: ${error}`
              : "The event you're looking for doesn't exist or has been removed."
            }
          </p>
          <Button onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={handleGoBack}
          className="flex items-center text-slate-400 hover:text-primary-500 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </button>

        <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 shadow-md">
          <div className="h-48 bg-gradient-to-r from-primary-900 to-secondary-800 opacity-70" />

          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h1 className="text-3xl font-bold text-white">{event.title}</h1>

              {user && (
                <Button
                  onClick={handleToggleFavorite}
                  variant={isFavorite ? 'primary' : 'outline'}
                  className={isFavorite ? 'bg-accent-600 hover:bg-accent-700 border-accent-600' : ''}
                >
                  <Star className="mr-2 h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
                  {isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
                </Button>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-slate-300">
                <Calendar className="h-5 w-5 mr-2 text-primary-500" />
                <span>{formatDate(event.eventDate)}</span>
                {event.endDate && <span> - {formatDate(event.endDate)}</span>}
              </div>

              {event.visibility && (
                <div className="flex items-center text-slate-300">
                  <MapPin className="h-5 w-5 mr-2 text-secondary-500" />
                  <span>{event.visibility}</span>
                </div>
              )}

              <div className="flex items-center text-slate-300">
                <Info className="h-5 w-5 mr-2 text-accent-500" />
                <span>{event.type}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
              {event.description ? (
                <p className="text-slate-300 leading-relaxed">{event.description}</p>
              ) : (
                <p className="text-slate-500 italic">No description available for this event.</p>
              )}
            </div>

            {event.constellations && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Constellations</h2>
                <p className="text-slate-300">{event.constellations}</p>
              </div>
            )}

            <div className="border-t border-slate-800 pt-4 flex justify-between items-center">
              <span className="text-sm text-slate-500">Source: {event.source}</span>
              {user && !isFavorite && (
                <Button
                  onClick={handleToggleFavorite}
                  variant="ghost"
                  size="sm"
                  className="text-accent-500 hover:text-accent-400 hover:bg-accent-950/30"
                >
                  <Star className="mr-2 h-4 w-4" />
                  Add to Favorites
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetailPage;
