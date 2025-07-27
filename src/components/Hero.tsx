import React from 'react';
import { Play, Mic, Video, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Where <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Voices Heal</span><br />
            & Communities <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Thrive</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            India's first voice-powered emotional wellness platform. Connect with AI companions and real humans who understand your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Start Your Journey</span>
            </button>
            <button className="border-2 border-emerald-300 text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all duration-300 flex items-center space-x-2">
              <Video className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Voice-First AI</h3>
            <p className="text-gray-600">Natural conversations with multilingual AI companions powered by ElevenLabs</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Video Agents</h3>
            <p className="text-gray-600">Real-time AI video companions that understand and respond to your emotions</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mood Matching</h3>
            <p className="text-gray-600">Connect with real humans who understand exactly what you're going through</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;