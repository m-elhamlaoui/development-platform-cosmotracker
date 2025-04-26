import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Info, Star } from 'lucide-react';
import { CosmicEvent } from '../../types';
import { formatDate, getEventStatus } from '../../utils/dateUtils';
import { useAuth } from '../../context/AuthContext';

interface EventCardProps {
  event: CosmicEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { user, addToFavorites, removeFromFavorites } = useAuth();
  const isFavorite = user?.favorites.includes(event.id) || false;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      removeFromFavorites(event.id);
    } else {
      addToFavorites(event.id);
    }
  };

  const status = getEventStatus(event.eventDate);

  const statusColors = {
    past: 'bg-slate-800 text-slate-400',
    today: 'bg-accent-600 text-white',
    upcoming: 'bg-primary-600 text-white'
  };

  const statusLabels = {
    past: 'Past',
    today: 'Today',
    upcoming: 'Upcoming'
  };

  return (
    <Link
      to={`/events/${event.id}`}
      className="group block h-full"
    >
      <div className="h-full bg-slate-900 rounded-lg overflow-hidden border border-slate-800 transition-all duration-300 hover:border-primary-600 hover:shadow-lg hover:shadow-primary-900/20">
        
        {/* 🌈 Gradient Block in Place of Image */}
        <div className="relative h-5 bg-gradient-to-br from-primary-800 to-secondary-700">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-900 to-transparent opacity-70" />

          <div className="absolute top-2 right-2 flex space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
              {statusLabels[status]}
            </span>
            <span className="px-2 py-1 bg-secondary-600 text-white rounded-full text-xs font-medium">
              {event.type}
            </span>
          </div>

          {user && (
            <button
              onClick={handleToggleFavorite}
              className={`absolute top-2 left-2 p-1.5 rounded-full transition-colors ${
                isFavorite
                  ? 'bg-accent-600 text-white'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-accent-600 hover:text-white'
              }`}
            >
              <Star className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{event.title}</h3>

          <div className="mb-3 flex items-center text-sm text-slate-400">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(event.eventDate)}</span>
          </div>

          {event.visibility && (
            <div className="mb-3 flex items-center text-sm text-slate-400">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{event.visibility}</span>
            </div>
          )}

          <p className="text-slate-400 text-sm line-clamp-2 mb-4">{event.description}</p>

          <div className="flex justify-between items-center mt-auto">
            <span className="text-xs text-slate-500">Source: {event.source}</span>
            <span className="inline-flex items-center text-primary-500 text-sm font-medium">
              View details
              <Info className="ml-1 h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
