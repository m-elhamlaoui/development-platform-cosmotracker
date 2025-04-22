import { CosmicEvent } from '../types';

export const MOCK_EVENTS: CosmicEvent[] = [
  {
    id: '1',
    title: 'New Moon',
    description: 'Moon not visible (01:45 UTC). Best time for faint object observations.',
    eventDate: '2025-12-20',
    endDate: null,
    type: 'New Moon',
    visibility: 'Sky Observation',
    constellations: '',
    source: 'NASA',
    imageUrl: 'https://images.pexels.com/photos/7660/space-desk-office.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    title: 'Lyrid Meteor Shower',
    description: 'Annual meteor shower producing up to 20 meteors per hour at peak. Associated with Comet Thatcher.',
    eventDate: '2025-04-22',
    endDate: null,
    type: 'Meteor Shower',
    visibility: 'Northern Hemisphere',
    constellations: 'Lyra',
    source: 'International Meteor Organization',
    imageUrl: 'https://images.pexels.com/photos/957061/milky-way-starry-sky-night-sky-star-957061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    title: 'Total Solar Eclipse',
    description: 'Path of totality crosses southern Mexico, United States, and eastern Canada. Eclipse will last up to 4 minutes 27 seconds in Mexico.',
    eventDate: '2026-08-12',
    endDate: null,
    type: 'Eclipse',
    visibility: 'North America',
    constellations: 'Leo',
    source: 'NASA Eclipse Website',
    imageUrl: 'https://images.pexels.com/photos/7672255/pexels-photo-7672255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '4',
    title: 'Jupiter at Opposition',
    description: 'Jupiter will be at its closest approach to Earth and fully illuminated by the Sun. Best time to view and photograph Jupiter and its moons.',
    eventDate: '2025-07-14',
    endDate: null,
    type: 'Planetary Event',
    visibility: 'Global',
    constellations: 'Capricornus',
    source: 'In-The-Sky.org',
    imageUrl: 'https://images.pexels.com/photos/12498742/pexels-photo-12498742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '5',
    title: 'Perseid Meteor Shower',
    description: 'One of the best meteor showers with up to 100 meteors per hour at peak. Produced by comet Swift-Tuttle.',
    eventDate: '2025-08-12',
    endDate: '2025-08-13',
    type: 'Meteor Shower',
    visibility: 'Northern Hemisphere',
    constellations: 'Perseus',
    source: 'American Meteor Society',
    imageUrl: 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '6',
    title: 'Mercury at Greatest Eastern Elongation',
    description: 'Best time to view Mercury as it will be at its highest point above the horizon in the evening sky.',
    eventDate: '2025-09-22',
    endDate: null,
    type: 'Planetary Event',
    visibility: 'Western Horizon after Sunset',
    constellations: 'Virgo',
    source: 'NASA Solar System Exploration',
    imageUrl: 'https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '7',
    title: 'Supermoon',
    description: 'Full Moon coincides with the Moons closest approach to Earth, making it appear larger and brighter than usual.',
    eventDate: '2025-10-08',
    endDate: null,
    type: 'Lunar Event',
    visibility: 'Global',
    constellations: 'Pisces',
    source: 'TimeAndDate.com',
    imageUrl: 'https://images.pexels.com/photos/2077962/pexels-photo-2077962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '8',
    title: 'Winter Solstice',
    description: 'Shortest day of the year in the Northern Hemisphere, marking the first day of astronomical winter.',
    eventDate: '2025-12-21',
    endDate: null,
    type: 'Seasonal Event',
    visibility: 'Global',
    constellations: '',
    source: 'Royal Museums Greenwich',
    imageUrl: 'https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export const getEventById = (id: string): CosmicEvent | undefined => {
  return MOCK_EVENTS.find(event => event.id === id);
};

export const getUpcomingEvents = (count: number = 5): CosmicEvent[] => {
  const today = new Date();
  return MOCK_EVENTS
    .filter(event => new Date(event.eventDate) >= today)
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
    .slice(0, count);
};

export const getMonthlyEvents = (month: number, year: number): CosmicEvent[] => {
  return MOCK_EVENTS.filter(event => {
    const eventDate = new Date(event.eventDate);
    return eventDate.getMonth() === month && eventDate.getFullYear() === year;
  });
};