import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { fetchAllEvents } from '../data/api';
import EventsList from '../components/events/EventsList';
import { Search, Filter } from 'lucide-react';
import { CosmicEvent } from '../types';
import { getEventStatus } from '../utils/dateUtils'; // <-- NEW IMPORT if not already

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<CosmicEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all'); // <-- NEW
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchAllEvents();
        setEvents(data);
      } catch (error) {
        console.error('Failed to load events', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const uniqueTypes = Array.from(new Set(events.map(event => event.type)));

  const filteredEvents = events.filter(event => {
    const matchesSearchTerm =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filter === 'all' || event.type === filter;

    const status = getEventStatus(event.eventDate);
    const matchesStatus = statusFilter === 'all' || status === statusFilter;

    return matchesSearchTerm && matchesType && matchesStatus;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">All Celestial Events</h1>
          <p className="text-slate-400">
            Explore all upcoming astronomical events and add them to your favorites.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-slate-800 border border-slate-700 rounded-md text-slate-200
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                placeholder:text-slate-500"
            />
          </div>

          <div className="relative min-w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-slate-500" />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-slate-800 border border-slate-700 rounded-md text-slate-200
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                appearance-none cursor-pointer"
            >
              <option value="all">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* NEW STATUS FILTER DROPDOWN */}
          <div className="relative min-w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-slate-500" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-slate-800 border border-slate-700 rounded-md text-slate-200
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="past">Past</option>
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-slate-400">Loading events...</p>
        ) : (
          <EventsList
            events={filteredEvents}
            emptyMessage="No events found matching your criteria. Try adjusting your search or filters."
          />
        )}
      </div>
    </Layout>
  );
};

export default EventsPage;
