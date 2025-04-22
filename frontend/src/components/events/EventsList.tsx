import React from 'react';
import EventCard from './EventCard';
import { CosmicEvent } from '../../types';

interface EventsListProps {
  events: CosmicEvent[];
  emptyMessage?: string;
}

const EventsList: React.FC<EventsListProps> = ({ 
  events,
  emptyMessage = "No events found." 
}) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;