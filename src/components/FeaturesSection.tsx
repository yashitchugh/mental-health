import React from 'react';
import { Mic, Video, Brain, Users, Sparkles, MapPin } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Mic,
      title: "Voice-Powered AI Conversations",
      description: "Natural, multilingual conversations with AI companions powered by ElevenLabs. Your voice is heard, understood, and valued.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Video,
      title: "Real-Time AI Video Agents",
      description: "Friendly virtual guides powered by Tavus who can see, speak, and emotionally support you 24/7.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "Intelligent Emotion Detection",
      description: "Our AI understands your mood from voice and text, connecting you with the right support at the right time.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Anonymous Mood Matching",
      description: "Connect with real humans in mood-based rooms like 'Feeling Overwhelmed' or 'Late-Night Overthinkers'.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Sparkles,
      title: "Gamified Wellness Journey",
      description: "Daily activities, kindness streaks, and rewards that make emotional growth feel fun and achievable.",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: MapPin,
      title: "Real-World Community",
      description: "Verified college communities, open mic nights, and local meetups that turn online connections into offline friendships.",
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Redefining <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Digital Wellness</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Not just another chatbot or productivity tracker. This is where AI becomes your caring companion 
            and community becomes your strength.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Experience All Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;