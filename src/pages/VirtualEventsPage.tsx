import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Users, Play, Pause, Volume2, MessageCircle, Heart, Share, Calendar, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const VirtualEventsPage = () => {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'study', label: 'Study Sessions' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'wellness', label: 'Wellness' },
    { id: 'social', label: 'Social' }
  ];

  const virtualEvents = [
    {
      id: 1,
      title: 'Study With Me - Pomodoro Session',
      description: 'Focused study session with background music and break reminders',
      category: 'study',
      participants: 156,
      maxParticipants: 200,
      isLive: true,
      startTime: '2:00 PM',
      duration: '4 hours',
      host: 'StudyBuddy AI',
      thumbnail: '📚',
      features: ['Pomodoro Timer', 'Background Music', 'Break Reminders', 'Progress Tracking']
    },
    {
      id: 2,
      title: 'K-Drama Watch Party: Hometown Cha-Cha-Cha',
      description: 'Watch and discuss the latest episode together',
      category: 'entertainment',
      participants: 89,
      maxParticipants: 150,
      isLive: true,
      startTime: '7:00 PM',
      duration: '1.5 hours',
      host: 'DramaLovers Community',
      thumbnail: '🎭',
      features: ['Synchronized Playback', 'Live Chat', 'Emoji Reactions', 'Episode Discussion']
    },
    {
      id: 3,
      title: 'Meditation & Mindfulness Circle',
      description: 'Guided meditation session for stress relief and mental clarity',
      category: 'wellness',
      participants: 67,
      maxParticipants: 100,
      isLive: false,
      startTime: '6:00 PM',
      duration: '45 minutes',
      host: 'Wellness Guide Maya',
      thumbnail: '🧘',
      features: ['Guided Meditation', 'Breathing Exercises', 'Calming Music', 'Q&A Session']
    },
    {
      id: 4,
      title: 'Cricket World Cup Watch Party',
      description: 'Cheer for Team India together with fellow cricket fans',
      category: 'entertainment',
      participants: 234,
      maxParticipants: 300,
      isLive: true,
      startTime: '2:30 PM',
      duration: '8 hours',
      host: 'Cricket Fanatics',
      thumbnail: '🏏',
      features: ['Live Commentary', 'Match Predictions', 'Fan Reactions', 'Score Updates']
    },
    {
      id: 5,
      title: 'Virtual Coffee Chat & Networking',
      description: 'Casual conversations and networking with students from different colleges',
      category: 'social',
      participants: 45,
      maxParticipants: 80,
      isLive: false,
      startTime: '4:00 PM',
      duration: '2 hours',
      host: 'Campus Connect',
      thumbnail: '☕',
      features: ['Breakout Rooms', 'Icebreaker Games', 'Career Discussions', 'Friendship Building']
    },
    {
      id: 6,
      title: 'Lo-Fi Hip Hop Study Stream',
      description: 'Chill beats and ambient sounds for productive studying',
      category: 'study',
      participants: 312,
      maxParticipants: 500,
      isLive: true,
      startTime: 'All Day',
      duration: '24/7',
      host: 'ChillBeats Radio',
      thumbnail: '🎵',
      features: ['24/7 Stream', 'Multiple Playlists', 'Study Timer', 'Minimal Distractions']
    }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? virtualEvents 
    : virtualEvents.filter(event => event.category === selectedCategory);

  const chatMessages = [
    { id: 1, user: 'StudyBuddy23', message: 'This music is perfect for concentration!', time: '2m ago' },
    { id: 2, user: 'Anonymous', message: 'Anyone else working on calculus?', time: '5m ago' },
    { id: 3, user: 'MindfulMaya', message: 'Remember to take breaks every 25 minutes!', time: '8m ago' }
  ];

  const handleJoinEvent = (eventId: number) => {
    setActiveEvent(eventId);
    toast.success('Joined virtual event!');
  };

  const handleLeaveEvent = () => {
    setActiveEvent(null);
    setIsPlaying(false);
    toast.success('Left the event');
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    toast.success('Message sent to event chat');
    setChatMessage('');
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? 'Paused' : 'Playing');
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
            Virtual <span className="text-pink-500">Events</span>
          </h1>
          <p className="text-xl text-gray-600">
            Join synchronized activities, watch parties, and study sessions with your community
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

        {/* Active Event View */}
        <AnimatePresence>
          {activeEvent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 mb-8"
            >
              {(() => {
                const event = virtualEvents.find(e => e.id === activeEvent);
                if (!event) return null;

                return (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{event.thumbnail}</div>
                        <div>
                          <h2 className="text-2xl font-bold">{event.title}</h2>
                          <p className="text-gray-600">Hosted by {event.host}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleLeaveEvent}
                        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        Leave Event
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main Content */}
                      <div className="lg:col-span-2">
                        <div className="bg-gray-900 rounded-2xl p-8 mb-6 aspect-video flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-6xl mb-4">{event.thumbnail}</div>
                            <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                            <div className="flex items-center justify-center space-x-4">
                              <button
                                onClick={togglePlayback}
                                className="w-16 h-16 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
                              >
                                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                              </button>
                              <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                <Volume2 className="w-6 h-6" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Event Controls */}
                        <div className="flex items-center justify-between bg-pink-50 p-4 rounded-2xl">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Users className="w-5 h-5 text-pink-500" />
                              <span className="font-medium">{event.participants} participants</span>
                            </div>
                            <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                            <span className="text-pink-500 font-medium">Live</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all">
                              <Heart className="w-4 h-4" />
                              <span>Like</span>
                            </button>
                            <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
                              <Share className="w-4 h-4" />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Chat Sidebar */}
                      <div className="bg-white rounded-2xl p-6 border border-pink-100">
                        <h3 className="text-lg font-bold mb-4">Live Chat</h3>
                        <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                          {chatMessages.map((msg) => (
                            <div key={msg.id} className="bg-gray-50 p-3 rounded-xl">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm">{msg.user}</span>
                                <span className="text-xs text-gray-500">{msg.time}</span>
                              </div>
                              <p className="text-sm text-gray-700">{msg.message}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
                          />
                          <button
                            onClick={handleSendMessage}
                            className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-2 rounded-full hover:shadow-lg transition-all"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{event.thumbnail}</div>
                <div className="flex items-center space-x-2">
                  {event.isLive && (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-500 text-sm font-medium">LIVE</span>
                    </>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{event.startTime} • {event.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{event.participants}/{event.maxParticipants} participants</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Video className="w-4 h-4" />
                  <span className="text-sm">Hosted by {event.host}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {event.features.slice(0, 2).map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="px-2 py-1 bg-pink-100 text-pink-500 text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {event.features.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{event.features.length - 2} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-yellow-500 h-2 rounded-full"
                    style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                  ></div>
                </div>
                <button
                  onClick={() => handleJoinEvent(event.id)}
                  disabled={activeEvent === event.id}
                  className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                    activeEvent === event.id
                      ? 'bg-pink-500 text-white'
                      : 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:shadow-lg'
                  }`}
                >
                  {activeEvent === event.id ? 'Joined' : 'Join Event'}
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
            <h3 className="text-2xl font-bold mb-4">Host Your Own Virtual Event</h3>
            <p className="text-pink-100 mb-6">
              Create study sessions, watch parties, or social gatherings for your community
            </p>
            <button className="bg-white text-pink-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
              Create Virtual Event
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VirtualEventsPage;