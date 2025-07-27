import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Zap, Moon, Coffee, Users, Mic, Video, MessageCircle } from 'lucide-react';
import { useMoodStore } from '../store/moodStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MoodMatchingPage = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const { setMood } = useMoodStore();
  const navigate = useNavigate();

  const moods = [
    { id: 'overwhelmed', emoji: '😔', label: 'Overwhelmed', color: 'bg-blue-100 text-blue-600' },
    { id: 'anxious', emoji: '😰', label: 'Anxious', color: 'bg-red-100 text-red-600' },
    { id: 'lonely', emoji: '😢', label: 'Lonely', color: 'bg-purple-100 text-purple-600' },
    { id: 'excited', emoji: '🤩', label: 'Excited', color: 'bg-yellow-100 text-yellow-600' },
    { id: 'confused', emoji: '🤔', label: 'Confused', color: 'bg-orange-100 text-orange-600' },
    { id: 'peaceful', emoji: '😌', label: 'Peaceful', color: 'bg-green-100 text-green-600' },
    { id: 'tired', emoji: '😴', label: 'Tired', color: 'bg-gray-100 text-gray-600' },
    { id: 'motivated', emoji: '💪', label: 'Motivated', color: 'bg-teal-100 text-teal-600' }
  ];

  const emotionalTags = [
    'Academic Stress', 'Relationship Issues', 'Family Problems', 'Career Anxiety',
    'Social Pressure', 'Financial Worries', 'Health Concerns', 'Identity Crisis',
    'Homesickness', 'Exam Pressure', 'Future Uncertainty', 'Peer Pressure'
  ];

  const matchingOptions = [
    {
      icon: Brain,
      title: 'AI Companion',
      description: 'Talk to our empathetic AI trained in emotional support',
      color: 'from-emerald-500 to-teal-500',
      action: () => navigate('/voice-chat?type=ai')
    },
    {
      icon: Users,
      title: 'Peer Support',
      description: 'Connect with someone who understands your situation',
      color: 'from-blue-500 to-cyan-500',
      action: () => navigate('/voice-chat?type=peer')
    },
    {
      icon: Video,
      title: 'Video Companion',
      description: 'Face-to-face support with our AI video agent',
      color: 'from-green-500 to-emerald-500',
      action: () => navigate('/voice-chat?type=video')
    }
  ];

  const handleMoodSelection = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleMatch = async () => {
    if (!selectedMood) {
      toast.error('Please select your current mood');
      return;
    }

    setIsMatching(true);
    
    // Save mood to store
    setMood({
      currentMood: selectedMood,
      intensity,
      tags: selectedTags,
      timestamp: new Date()
    });

    // Simulate matching process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsMatching(false);
    
    toast.success('Found perfect matches for you!');
  };

  if (isMatching) {
    return (
      <div className="pt-20 pb-8 px-4 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Finding Your Perfect Match...</h2>
          <p className="text-gray-600 mb-8">Our AI is analyzing your mood and connecting you with the right support</p>
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-3 h-3 bg-emerald-600 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            How are you <span className="text-emerald-600">feeling</span> right now?
          </h1>
          <p className="text-xl text-gray-600">
            Let's find the perfect support for your current emotional state
          </p>
        </motion.div>

        {/* Mood Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-emerald-100 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Select your mood</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => handleMoodSelection(mood.id)}
                className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  selectedMood === mood.id 
                    ? `${mood.color} shadow-lg` 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="text-4xl mb-3">{mood.emoji}</div>
                <div className="font-semibold">{mood.label}</div>
              </button>
            ))}
          </div>

          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-6"
            >
              {/* Intensity Slider */}
              <div>
                <label className="block text-lg font-semibold mb-4">
                  How intense is this feeling? ({intensity}/10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Intense</span>
                </div>
              </div>

              {/* Emotional Tags */}
              <div>
                <h3 className="text-lg font-semibold mb-4">What's contributing to this feeling?</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {emotionalTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-emerald-100'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleMatch}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Find My Support Match
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Matching Options */}
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {matchingOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={option.action}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <div className="flex items-center text-emerald-600 font-semibold">
                  <span>Connect Now</span>
                  <MessageCircle className="w-4 h-4 ml-2" />
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MoodMatchingPage;