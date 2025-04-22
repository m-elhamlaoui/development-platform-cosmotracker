import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { getUpcomingEvents } from '../data/mockEvents';
import { useAuth } from '../context/AuthContext';
import EventsList from '../components/events/EventsList';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const upcomingEvents = getUpcomingEvents(3);
  
  return (
    <Layout>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary-950/50 to-slate-950 z-[-1]"></div>
          
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-float">
              Explore the Cosmos
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              Track celestial events, discover astronomical wonders, and never miss a cosmic spectacle again.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isAuthenticated ? (
                <>
                  <Button size="lg" className="group">
                    <Calendar className="mr-2 h-5 w-5 group-hover:animate-float" />
                    <Link to="/events">Browse Events</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="group">
                    <Star className="mr-2 h-5 w-5 group-hover:animate-float" />
                    <Link to="/favorites">View Favorites</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" className="group">
                    <Link to="/register">Sign Up Free</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="group">
                    <Link to="/login">Log In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Discover the Universe with CosmoTracker
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-900/60 p-6 rounded-lg border border-slate-800 hover:border-primary-700 transition-colors">
                <div className="bg-primary-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Event Calendar</h3>
                <p className="text-slate-400">
                  Keep track of all upcoming celestial events including meteor showers, eclipses, and planetary alignments.
                </p>
              </div>
              
              <div className="bg-slate-900/60 p-6 rounded-lg border border-slate-800 hover:border-secondary-700 transition-colors">
                <div className="bg-secondary-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-secondary-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Personalized Favorites</h3>
                <p className="text-slate-400">
                  Save your favorite astronomical events to create your own personalized viewing schedule.
                </p>
              </div>
              
              <div className="bg-slate-900/60 p-6 rounded-lg border border-slate-800 hover:border-accent-700 transition-colors">
                <div className="bg-accent-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-accent-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Detailed Information</h3>
                <p className="text-slate-400">
                  Access comprehensive details about each event, including visibility information and scientific explanations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Upcoming Events Preview */}
        <section className="py-16 px-4 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Upcoming Celestial Events</h2>
              <Link 
                to="/events" 
                className="text-primary-500 hover:text-primary-400 font-medium flex items-center"
              >
                View all
                <span className="ml-1 text-lg">→</span>
              </Link>
            </div>
            
            <EventsList events={upcomingEvents} />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;