import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Mic, MicOff, Send, Eye, EyeOff, Users, Heart, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ConfessionPage = () => {
  const [confession, setConfession] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [showIdentity, setShowIdentity] = useState(false);
  const [activeListeners, setActiveListeners] = useState(23);
  const [confessions, setConfessions] = useState([
    {
      id: 1,
      text: "I've been struggling with imposter syndrome in my engineering program. Sometimes I feel like I don't belong here...",
      author: "Anonymous Student",
      time: "2 minutes ago",
      responses: 5,
      hearts: 12,
      isVoice: false
    },
    {
      id: 2,
      text: "Voice confession about family pressure and career choices",
      author: "Anonymous Voice",
      time: "5 minutes ago",
      responses: 3,
      hearts: 8,
      isVoice: true,
      duration: "1:45"
    },
    {
      id: 3,
      text: "I broke up with my partner yesterday and I don't know how to tell my friends. We were together for 3 years...",
      author: "Heartbroken",
      time: "10 minutes ago",
      responses: 15,
      hearts: 24,
      isVoice: false
    }
  ]);

  useEffect(() => {
    // Simulate real-time listener count updates
    const interval = setInterval(() => {
      setActiveListeners(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmitConfession = () => {
    if (!confession.trim()) {
      toast.error('Please write your confession first');
      return;
    }

    const newConfession = {
      id: Date.now(),
      text: confession,
      author: isAnonymous ? "Anonymous Student" : "You",
      time: "Just now",
      responses: 0,
      hearts: 0,
      isVoice: isRecording
    };

    setConfessions(prev => [newConfession, ...prev]);
    setConfession('');
    toast.success('Your confession has been shared anonymously');
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.success('Recording started... Speak your heart out');
    } else {
      toast.success('Recording saved');
    }
  };

  const handleHeartConfession = (id: number) => {
    setConfessions(prev => 
      prev.map(conf => 
        conf.id === id 
          ? { ...conf, hearts: conf.hearts + 1 }
          : conf
      )
    );
    toast.success('❤️ Sent support');
  };

  return (
    <div className="pt-20 pb-8 px-4 bg-gradient-to-br from-pink-50 via-yellow-50 to-orange-50 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            Anonymous <span className="text-pink-500">Confessions</span>
          </h1>
          <p className="text-xl text-gray-600">
            Share what's on your heart. No judgment, just understanding.
          </p>
        </motion.div>

        {/* Active Listeners Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl p-4 text-white mb-8 text-center"
        >
          <div className="flex items-center justify-center space-x-2">
            <Users className="w-5 h-5" />
            <span className="font-semibold">{activeListeners} people listening right now</span>
            <div className="w-2 h-2 bg-pink-200 rounded-full animate-pulse"></div>
          </div>
        </motion.div>

        {/* Confession Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-8 h-8 text-pink-500" />
            <h2 className="text-2xl font-bold">Share Your Story</h2>
          </div>

          <div className="space-y-6">
            <textarea
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
              placeholder="What's weighing on your heart? Share anonymously..."
              className="w-full h-32 p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
              disabled={isRecording}
            />

            {/* Voice Recording */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleVoiceRecord}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-pink-100 text-pink-500 hover:bg-pink-200'
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                <span>{isRecording ? 'Stop Recording' : 'Voice Confession'}</span>
              </button>

              {isRecording && (
                <div className="flex items-center space-x-2 text-red-600">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Recording...</span>
                </div>
              )}
            </div>

            {/* Privacy Options */}
            <div className="bg-pink-50 p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-5 h-5 text-pink-500 rounded focus:ring-pink-400"
                  />
                  <label htmlFor="anonymous" className="font-medium">Stay Anonymous</label>
                </div>
                <button
                  onClick={() => setShowIdentity(!showIdentity)}
                  className="flex items-center space-x-2 text-pink-500 hover:text-pink-600 transition-colors"
                >
                  {showIdentity ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="text-sm">{showIdentity ? 'Hide' : 'Show'} Identity Options</span>
                </button>
              </div>

              <AnimatePresence>
                {showIdentity && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    <p className="text-sm text-gray-600">
                      You can reveal your identity to specific listeners after they respond with support.
                    </p>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="reveal-option"
                        className="w-4 h-4 text-pink-500 rounded focus:ring-pink-400"
                      />
                      <label htmlFor="reveal-option" className="text-sm">
                        Allow identity reveal after receiving 3+ supportive responses
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handleSubmitConfession}
              disabled={!confession.trim() && !isRecording}
              className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Share Anonymously</span>
            </button>
          </div>
        </motion.div>

        {/* Confessions Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold">Recent Confessions</h3>
          
          {confessions.map((confession, index) => (
            <motion.div
              key={confession.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{confession.author}</h4>
                    <p className="text-sm text-gray-500">{confession.time}</p>
                  </div>
                </div>
                {confession.isVoice && (
                  <div className="flex items-center space-x-2 bg-pink-100 px-3 py-1 rounded-full">
                    <Mic className="w-4 h-4 text-pink-500" />
                    <span className="text-sm text-pink-500">{confession.duration || '2:30'}</span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                {confession.isVoice ? (
                  <div className="bg-pink-50 p-4 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <button className="w-12 h-12 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all">
                        <span>▶</span>
                      </button>
                      <div className="flex-1">
                        <div className="bg-pink-200 h-2 rounded-full">
                          <div className="bg-gradient-to-r from-pink-500 to-yellow-500 h-2 rounded-full w-1/3"></div>
                        </div>
                        <p className="text-sm text-pink-500 mt-1">{confession.text}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-800">{confession.text}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleHeartConfession(confession.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span>{confession.hearts}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{confession.responses}</span>
                  </button>
                </div>
                <button className="bg-pink-100 text-pink-500 px-4 py-2 rounded-full hover:bg-pink-200 transition-colors">
                  Respond Privately
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Support Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200"
        >
          <h3 className="text-lg font-bold text-blue-800 mb-2">Remember</h3>
          <p className="text-blue-700">
            This is a safe space for sharing and healing. All confessions are anonymous and moderated. 
            If you're in crisis, please reach out to professional help or use our SOS button.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfessionPage;