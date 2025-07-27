import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Clock, Navigation, Filter, Search, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const OfflineEventsPage = () => {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMap, setShowMap] = useState(false);

  const cities = [
    { id: 'all', label: 'All Cities' },
    { id: 'delhi', label: 'Delhi' },
    { id: 'mumbai', label: 'Mumbai' },
    { id: 'bangalore', label: 'Bangalore' },
    { id: 'pune', label: 'Pune' },
    { id: 'hyderabad', label: 'Hyderabad' }
  ];

  const eventTypes = [
    { id: 'all', label: 'All Events' },
    { id: 'meetup', label: 'Meetups' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'social', label: 'Social' },
    { id: 'wellness', label: 'Wellness' }
  ];

  const offlineEvents = [
    {
      id: 1,
      title: 'Delhi Campus Coffee Meetup',
      description: 'Casual meetup for Delhi students to connect over coffee and conversations',
      date: '2025-01-18',
      time: '4:00 PM',
      duration: '3 hours',
      location: 'Cafe Coffee Day, Connaught Place',
      address: 'N-Block, Connaught Place, New Delhi',
      city: 'delhi',
      type: 'meetup',
      attendees: 23,
      maxAttendees: 30,
      organizer: 'Delhi Humonix Community',
      price: 'Free',
      requirements: ['Valid College ID', 'RSVP Required'],
      coordinates: { lat: 28.6315, lng: 77.2167 }
    },
    {
      id: 2,
      title: 'Mumbai Beach Cleanup & Picnic',
      description: 'Environmental activity followed by a relaxing picnic by the beach',
      date: '2025-01-25',
      time: '8:00 AM',
      duration: '4 hours',
      location: 'Juhu Beach, Mumbai',
      address: 'Juhu Beach, Juhu, Mumbai',
      city: 'mumbai',
      type: 'social',
      attendees: 34,
      maxAttendees: 50,
      organizer: 'Mumbai Green Warriors',
      price: '₹100 (includes snacks)',
      requirements: ['Comfortable clothes', 'Water bottle'],
      coordinates: { lat: 19.1075, lng: 72.8263 }
    },
    {
      id: 3,
      title: 'Bangalore Tech Meetup & Networking',
      description: 'Connect with fellow tech enthusiasts and share your projects',
      date: '2025-01-20',
      time: '6:00 PM',
      duration: '2.5 hours',
      location: 'WeWork, Koramangala',
      address: 'WeWork Galaxy, Residency Road, Bangalore',
      city: 'bangalore',
      type: 'meetup',
      attendees: 45,
      maxAttendees: 60,
      organizer: 'Bangalore Tech Community',
      price: 'Free',
      requirements: ['Laptop (optional)', 'GitHub profile'],
      coordinates: { lat: 12.9352, lng: 77.6245 }
    },
    {
      id: 4,
      title: 'Pune Hiking & Mindfulness Retreat',
      description: 'Morning hike followed by meditation and wellness activities',
      date: '2025-01-22',
      time: '6:00 AM',
      duration: '6 hours',
      location: 'Sinhagad Fort, Pune',
      address: 'Sinhagad Fort, Pune',
      city: 'pune',
      type: 'wellness',
      attendees: 18,
      maxAttendees: 25,
      organizer: 'Pune Wellness Circle',
      price: '₹200 (includes breakfast)',
      requirements: ['Hiking shoes', 'Water bottle', 'Yoga mat'],
      coordinates: { lat: 18.3664, lng: 73.7557 }
    },
    {
      id: 5,
      title: 'Hyderabad Open Mic Night',
      description: 'Share your poetry, music, or stories in a supportive environment',
      date: '2025-01-19',
      time: '7:00 PM',
      duration: '3 hours',
      location: 'Lamakaan, Banjara Hills',
      address: 'Lamakaan, Road No. 1, Banjara Hills, Hyderabad',
      city: 'hyderabad',
      type: 'social',
      attendees: 28,
      maxAttendees: 40,
      organizer: 'Hyderabad Artists Collective',
      price: 'Free',
      requirements: ['Performance material (optional)', 'Supportive attitude'],
      coordinates: { lat: 17.4126, lng: 78.4071 }
    },
    {
      id: 6,
      title: 'Delhi Mental Health Workshop',
      description: 'Interactive workshop on stress management and emotional wellness',
      date: '2025-01-24',
      time: '2:00 PM',
      duration: '2 hours',
      location: 'India Habitat Centre',
      address: 'Lodhi Road, New Delhi',
      city: 'delhi',
      type: 'workshop',
      attendees: 15,
      maxAttendees: 20,
      organizer: 'Mental Health Advocates',
      price: '₹150',
      requirements: ['Notebook', 'Open mind'],
      coordinates: { lat: 28.5933, lng: 77.2507 }
    }
  ];

  const filteredEvents = offlineEvents.filter(event => {
    const matchesCity = selectedCity === 'all' || event.city === selectedCity;
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCity && matchesType && matchesSearch;
  });

  const handleRSVP = (eventId: number) => {
    toast.success('RSVP confirmed! Check your email for details.');
  };

  const handleGetDirections = (event: any) => {
    const { lat, lng } = event.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
    toast.success('Opening directions in Google Maps');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            Offline <span className="text-green-600">Events</span>
          </h1>
          <p className="text-xl text-gray-600">
            Meet your community in person through local events and activities
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* City Filter */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {cities.map((city) => (
                <option key={city.id} value={city.id}>{city.label}</option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {eventTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>

            {/* Map Toggle */}
            <button
              onClick={() => setShowMap(!showMap)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                showMap 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Map View</span>
            </button>
          </div>
        </motion.div>

        {/* Map View */}
        {showMap && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100 mb-8"
          >
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
                <p>Event locations would be displayed here with Google Maps integration</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-green-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      📍 {event.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  event.type === 'meetup' ? 'bg-blue-100 text-blue-600' :
                  event.type === 'workshop' ? 'bg-green-100 text-green-600' :
                  event.type === 'social' ? 'bg-green-100 text-green-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {event.type}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{event.time} • {event.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{event.attendees}/{event.maxAttendees} attending</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Organizer:</span>
                  <span className="text-green-600">{event.organizer}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Price:</span>
                  <span className="text-green-600 font-semibold">{event.price}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Requirements:</span>
                  <ul className="list-disc list-inside mt-1">
                    {event.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                  <div
                    className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full"
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {event.maxAttendees - event.attendees} spots left
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleRSVP(event.id)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-full hover:shadow-lg transition-all font-semibold"
                >
                  RSVP Now
                </button>
                <button
                  onClick={() => handleGetDirections(event)}
                  className="bg-gray-100 text-gray-700 p-3 rounded-full hover:bg-gray-200 transition-colors"
                  title="Get Directions"
                >
                  <Navigation className="w-5 h-5" />
                </button>
                <button className="bg-gray-100 text-gray-700 p-3 rounded-full hover:bg-gray-200 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Events Found */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms to find events in your area.
            </p>
            <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all">
              Create New Event
            </button>
          </motion.div>
        )}

        {/* Create Event CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Host an Event in Your City</h3>
            <p className="text-green-100 mb-6">
              Bring your community together through local meetups, workshops, and social activities
            </p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
              Create Offline Event
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OfflineEventsPage;