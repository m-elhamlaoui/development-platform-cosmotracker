import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { fetchEventsByMonth } from '../data/api'; // Updated import
import { getCurrentMonth, getCurrentYear } from '../utils/dateUtils';
import EventsList from '../components/events/EventsList';
import { Calendar } from 'lucide-react';
import { CosmicEvent } from '../types';

const MonthlyEventsPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [currentYear, setCurrentYear] = useState(getCurrentYear());
  const [events, setEvents] = useState<CosmicEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const years = Array.from({ length: 5 }, (_, i) => getCurrentYear() + i - 1);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchEventsByMonth(months[currentMonth].toUpperCase()); 
        setEvents(data);
      } catch (error) {
        console.error('Failed to load monthly events', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [currentMonth]); // Only reload when month changes

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(parseInt(e.target.value));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Monthly Events</h1>
          <p className="text-slate-400">
            View all celestial events for a specific month.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-primary-900/40 p-3 rounded-lg text-primary-400">
              <Calendar className="h-6 w-6" />
            </div>
            
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-white mb-1">Select Month & Year</h2>
              <p className="text-slate-400">Choose a month and year to view all celestial events during that period.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 min-w-72">
              <select
                value={currentMonth}
                onChange={handleMonthChange}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-200
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  appearance-none cursor-pointer"
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              
              <select
                value={currentYear}
                onChange={handleYearChange}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-200
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  appearance-none cursor-pointer"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">
          Events for {months[currentMonth]} {currentYear}
        </h2>

        {loading ? (
          <p className="text-slate-400">Loading events...</p>
        ) : (
          <EventsList 
            events={events} 
            emptyMessage={`No events found for ${months[currentMonth]} ${currentYear}.`}
          />
        )}
      </div>
    </Layout>
  );
};

export default MonthlyEventsPage;
