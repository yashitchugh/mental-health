import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Video, Coffee, Mic, Heart } from 'lucide-react';

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'virtual', label: 'Virtual' },
    { id: 'physical', label: 'In-Person' },
    { id: 'wellness', label: 'Wellness' },
    { id: 'social', label: 'Social' }
  ];

  const events = [
    {
      id: 1,
      title: 'Open Mic Night: Share Your Voice',
      description: 'Express yourself through poetry, music, or storytelling in a supportive environment',
      date: '2025-01-15',
      time: '7:00 PM',
      duration: '2 hours',
      location: 'Virtual Room',
      type: 'virtual',
      category: 'social',
      attendees: 45,
      maxAttendees: 100,
      icon: Mic,
      color: 'from-pink-300 to-yellow-300',
      tags: ['Poetry', 'Music', 'Expression']
    },
    {
      id: 2,
      title: 'Delhi Campus Coffee Meetup',
      description: 'Casual meetup for Delhi students to connect over coffee and conversations',
      date: '2025-01-18',
      time: '4:00 PM',
      duration: '3 hours',
      location: 'Cafe Coffee Day, Connaught Place',
      type: 'physical',
      category: 'social',
      attendees: 23,
      maxAttendees: 30,
      icon: Coffee,
      color: 'from-yellow-300 to-orange-300',
      tags: ['Networking', 'Coffee', 'Delhi']
    },
    {
      id: 3,
      title: 'Mindfulness & Meditation Session',
      description: 'Guided meditation and mindfulness practices for stress relief',
      date: '2025-01-20',
      time: '10:00 AM',
      duration: '1 hour',
      location: 'Virtual Wellness Room',
      type: 'virtual',
      category: 'wellness',
      attendees: 78,
      maxAttendees: 150,
      icon: Heart,
      color: 'from-pink-300 to-purple-300',
      tags: ['Meditation', 'Mindfulness', 'Wellness']
    },
    {
      id: 4,
      title: 'Study Together Marathon',
      description: 'Virtual study session with background music and break reminders',
      date: '2025-01-22',
      time: '9:00 AM',
      duration: '6 hours',
      location: 'Virtual Study Hall',
      type: 'virtual',
      category: 'social',
      attendees: 156,
      maxAttendees: 200,
      icon: Video,
      color: 'from-pink-400 to-yellow-400',
      tags: ['Study', 'Productivity', 'Focus']
    },
    {
      id: 5,
      title: 'Mumbai Beach Cleanup & Picnic',
      description: 'Environmental activity followed by a relaxing picnic by the beach',
      date: '2025-01-25',
      time: '8:00 AM',
      duration: '4 hours',
      location: 'Juhu Beach, Mumbai',
      type: 'physical',
      category: 'social',
      attendees: 34,
      maxAttendees: 50,
      icon: MapPin,
      color: 'from-yellow-300 to-green-300',
      tags: ['Environment', 'Beach', 'Mumbai']
    },
    {
      id: 6,
      title: 'Anxiety Support Circle',
      description: 'Safe space to share experiences and coping strategies for anxiety',
      date: '2025-01-28',
      time: '6:00 PM',
      duration: '1.5 hours',
      location: 'Private Virtual Room',
      type: 'virtual',
      category: 'wellness',
      attendees: 12,
      maxAttendees: 20,
      icon: Heart,
      color: 'from-pink-300 to-purple-300',
      tags: ['Support', 'Anxiety', 'Mental Health']
    }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory || event.type === selectedCategory);

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
    <div className="pt-20 pb-8 px-4 bg-gradient-to-br from-pink-50 via-yellow-50 to-orange-50 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            Community <span className="text-pink-500">Events</span>
          </h1>
          <p className="text-xl text-gray-600">
            Join virtual and in-person events to connect with your community
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white'
                  : 'bg-white/80 text-gray-700 hover:bg-pink-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${event.color} rounded-2xl flex items-center justify-center`}>
                  <event.icon className="w-8 h-8 text-white" />
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  event.type === 'virtual' 
                    ? 'bg-blue-100 text-blue-500' 
                    : 'bg-green-100 text-green-500'
                }`}>
                  {event.type}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>

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

              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-pink-100 text-pink-500 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-yellow-500 h-2 rounded-full"
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  ></div>
                </div>
                <button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all whitespace-nowrap">
                  Join Event
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Event CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Want to host an event?</h3>
            <p className="text-pink-100 mb-6">
              Create your own community event and bring people together around shared interests or causes
            </p>
            <button className="bg-white text-pink-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
              Create Event
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventsPage;