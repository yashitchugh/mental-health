import React from 'react';
import { MessageCircle, Heart, Zap, Moon, BookOpen, Coffee } from 'lucide-react';

const CommunitySection = () => {
  const moodRooms = [
    {
      icon: Heart,
      name: "Feeling Overwhelmed",
      count: "234 online",
      color: "bg-red-100 text-red-600",
      active: true
    },
    {
      icon: Moon,
      name: "Late-Night Overthinkers",
      count: "89 online",
      color: "bg-purple-100 text-purple-600",
      active: true
    },
    {
      icon: BookOpen,
      name: "Study & Chill",
      count: "156 online",
      color: "bg-green-100 text-green-600",
      active: false
    },
    {
      icon: Coffee,
      name: "Morning Motivation",
      count: "78 online",
      color: "bg-orange-100 text-orange-600",
      active: false
    },
    {
      icon: Zap,
      name: "Anxiety Support",
      count: "167 online",
      color: "bg-blue-100 text-blue-600",
      active: true
    },
    {
      icon: MessageCircle,
      name: "Random Conversations",
      count: "203 online",
      color: "bg-teal-100 text-teal-600",
      active: false
    }
  ];

  return (
    <section id="community" className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your <span className="text-emerald-600">Tribe</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Anonymous, mood-based communities where you can be yourself without judgment. 
            Real humans who understand exactly what you're going through.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {moodRooms.map((room, index) => (
            <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${room.active ? 'border-green-200 bg-green-50/20' : 'border-emerald-100'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${room.color} rounded-full flex items-center justify-center`}>
                  <room.icon className="w-6 h-6" />
                </div>
                {room.active && (
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{room.count}</p>
              <button className={`w-full py-2 px-4 rounded-full text-sm font-medium transition-all ${room.active ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'}`}>
                {room.active ? 'Join Conversation' : 'Enter Room'}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-emerald-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Beyond Digital Connections</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <p className="text-gray-600">Verified college communities for your campus</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <p className="text-gray-600">Monthly open mic nights and talent shows</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <p className="text-gray-600">Local meetups and friendship events</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <p className="text-gray-600">Study groups and collaborative projects</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Join the Movement</h4>
              <p className="mb-6">Turn online connections into offline friendships. Your local Humonix community is waiting.</p>
              <button className="bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                Find My Campus
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;