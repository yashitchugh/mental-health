import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Mic, Heart, Moon, Coffee, BookOpen, Zap, MessageCircle, Crown, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommunityRoomsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', label: 'All Rooms', icon: Users },
    { id: 'support', label: 'Support', icon: Heart },
    { id: 'study', label: 'Study', icon: BookOpen },
    { id: 'social', label: 'Social', icon: MessageCircle },
    { id: 'wellness', label: 'Wellness', icon: Zap }
  ];

  const rooms = [
    {
      id: 1,
      name: "Feeling Overwhelmed",
      description: "A safe space for when everything feels too much",
      category: 'support',
      participants: 234,
      isActive: true,
      mood: 'overwhelmed',
      icon: Heart,
      color: 'bg-pink-100 text-pink-500',
      tags: ['Anonymous', 'Peer Support', 'Safe Space']
    },
    {
      id: 2,
      name: "Late-Night Overthinkers",
      description: "For those 3 AM thoughts that won't let you sleep",
      category: 'support',
      participants: 89,
      isActive: true,
      mood: 'anxious',
      icon: Moon,
      color: 'bg-yellow-100 text-yellow-500',
      tags: ['Night Owls', 'Anxiety', 'Thoughts']
    },
    {
      id: 3,
      name: "Study & Chill",
      description: "Virtual study sessions with background music",
      category: 'study',
      participants: 156,
      isActive: false,
      mood: 'focused',
      icon: BookOpen,
      color: 'bg-pink-200 text-pink-600',
      tags: ['Study Group', 'Productivity', 'Music']
    },
    {
      id: 4,
      name: "Morning Motivation",
      description: "Start your day with positive energy and goals",
      category: 'wellness',
      participants: 78,
      isActive: false,
      mood: 'motivated',
      icon: Coffee,
      color: 'bg-yellow-200 text-yellow-600',
      tags: ['Morning', 'Goals', 'Motivation']
    },
    {
      id: 5,
      name: "Anxiety Support Circle",
      description: "Understanding and coping with anxiety together",
      category: 'support',
      participants: 167,
      isActive: true,
      mood: 'anxious',
      icon: Zap,
      color: 'bg-pink-300 text-pink-700',
      tags: ['Anxiety', 'Coping', 'Support']
    },
    {
      id: 6,
      name: "Random Conversations",
      description: "Just talk about anything and everything",
      category: 'social',
      participants: 203,
      isActive: false,
      mood: 'social',
      icon: MessageCircle,
      color: 'bg-yellow-300 text-yellow-700',
      tags: ['Casual', 'Fun', 'Open Topic']
    },
    {
      id: 7,
      name: "Breakup Support",
      description: "Healing hearts and moving forward together",
      category: 'support',
      participants: 45,
      isActive: true,
      mood: 'sad',
      icon: Heart,
      color: 'bg-pink-100 text-pink-500',
      tags: ['Relationships', 'Healing', 'Support']
    },
    {
      id: 8,
      name: "Creative Corner",
      description: "Share your art, poetry, music, and creative works",
      category: 'social',
      participants: 92,
      isActive: false,
      mood: 'creative',
      icon: Zap,
      color: 'bg-yellow-100 text-yellow-500',
      tags: ['Art', 'Poetry', 'Music', 'Creative']
    }
  ];

  const filteredRooms = selectedCategory === 'all' 
    ? rooms 
    : rooms.filter(room => room.category === selectedCategory);

  const handleJoinRoom = (room: any) => {
    navigate(`/voice-chat?type=room&roomId=${room.id}`);
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
            Community <span className="text-pink-500">Rooms</span>
          </h1>
          <p className="text-xl text-gray-600">
            Find your tribe in mood-based communities where you can be yourself
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
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white'
                  : 'bg-white/80 text-gray-700 hover:bg-pink-100'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Active Rooms Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl p-6 text-white mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">{rooms.filter(r => r.isActive).length}</div>
              <div className="text-pink-100">Active Rooms</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                {rooms.reduce((sum, room) => sum + room.participants, 0)}
              </div>
              <div className="text-pink-100">People Online</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-pink-100">Always Available</div>
            </div>
          </div>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
                room.isActive ? 'border-pink-200 bg-pink-50/20' : 'border-yellow-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${room.color} rounded-full flex items-center justify-center`}>
                  <room.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center space-x-2">
                  {room.isActive && (
                    <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                  )}
                  <span className="text-sm text-gray-600">{room.participants} online</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{room.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {room.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-pink-100 text-pink-500 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {room.isActive && (
                    <>
                      <Crown className="w-4 h-4 text-yellow-500" />
                      <Shield className="w-4 h-4 text-blue-500" />
                    </>
                  )}
                </div>
                <button
                  onClick={() => handleJoinRoom(room)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center space-x-2 ${
                    room.isActive
                      ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:shadow-lg'
                      : 'bg-pink-100 text-pink-500 hover:bg-pink-200'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>{room.isActive ? 'Join Now' : 'Enter Room'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Room CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-pink-100">
            <h3 className="text-2xl font-bold mb-4">Don't see what you're looking for?</h3>
            <p className="text-gray-600 mb-6">
              Create your own room and invite others who share your interests or feelings
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
              Create New Room
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityRoomsPage;