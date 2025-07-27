import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Award, TrendingUp, Target, Zap, Book, Smile, Moon, Coffee } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const WellnessDashboard = () => {
  const { user, updateUser } = useAuthStore();
  const [selectedMood, setSelectedMood] = useState('');

  const moods = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😔', label: 'Sad', value: 'sad' },
    { emoji: '😰', label: 'Anxious', value: 'anxious' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
    { emoji: '🤔', label: 'Confused', value: 'confused' },
    { emoji: '😌', label: 'Peaceful', value: 'peaceful' }
  ];

  const activities = [
    {
      icon: Heart,
      title: 'Breathing Exercise',
      description: '5-minute guided breathing',
      duration: '5 min',
      points: 10,
      color: 'from-pink-300 to-yellow-300'
    },
    {
      icon: Book,
      title: 'Gratitude Journal',
      description: 'Write 3 things you\'re grateful for',
      duration: '10 min',
      points: 15,
      color: 'from-pink-400 to-yellow-400'
    },
    {
      icon: Zap,
      title: 'Quick Meditation',
      description: 'Mindfulness meditation session',
      duration: '10 min',
      points: 20,
      color: 'from-pink-500 to-yellow-500'
    },
    {
      icon: Smile,
      title: 'Positive Affirmations',
      description: 'Boost your self-confidence',
      duration: '5 min',
      points: 10,
      color: 'from-pink-300 to-yellow-300'
    }
  ];

  const badges = [
    { name: 'Good Listener', icon: '👂', earned: true, description: 'Helped 5 people in conversations' },
    { name: 'Streak Master', icon: '🔥', earned: true, description: '7-day check-in streak' },
    { name: 'Mindful Soul', icon: '🧘', earned: false, description: 'Complete 10 meditation sessions' },
    { name: 'Gratitude Guru', icon: '🙏', earned: false, description: 'Write 30 gratitude entries' },
    { name: 'Community Helper', icon: '🤝', earned: true, description: 'Active in community rooms' },
    { name: 'Wellness Warrior', icon: '⚡', earned: false, description: 'Complete all daily activities for a week' }
  ];

  const weeklyProgress = [
    { day: 'Mon', mood: 7, activities: 3 },
    { day: 'Tue', mood: 6, activities: 2 },
    { day: 'Wed', mood: 8, activities: 4 },
    { day: 'Thu', mood: 5, activities: 1 },
    { day: 'Fri', mood: 7, activities: 3 },
    { day: 'Sat', mood: 9, activities: 4 },
    { day: 'Sun', mood: 8, activities: 3 }
  ];

  const handleMoodCheck = (mood: string) => {
    setSelectedMood(mood);
    // Update user's daily check-in
    if (user) {
      updateUser({ streakDays: user.streakDays + 1 });
    }
  };

  const handleActivityComplete = (activity: any) => {
    if (user) {
      updateUser({ kindnessPoints: user.kindnessPoints + activity.points });
    }
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
            Wellness <span className="text-pink-500">Dashboard</span>
          </h1>
          <p className="text-xl text-gray-600">
            Track your emotional journey and build healthy habits
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100"
          >
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-pink-500" />
              <span className="text-2xl font-bold text-pink-500">{user?.kindnessPoints || 0}</span>
            </div>
            <h3 className="font-semibold text-gray-800">Kindness Points</h3>
            <p className="text-sm text-gray-600">+25 today</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-yellow-500">{user?.streakDays || 0}</span>
            </div>
            <h3 className="font-semibold text-gray-800">Day Streak</h3>
            <p className="text-sm text-gray-600">Keep it going!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100"
          >
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-pink-400" />
              <span className="text-2xl font-bold text-pink-500">3/4</span>
            </div>
            <h3 className="font-semibold text-gray-800">Daily Goals</h3>
            <p className="text-sm text-gray-600">Almost there!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100"
          >
            <div className="flex items-center justify-between mb-4">
              <Heart className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-yellow-500">8.2</span>
            </div>
            <h3 className="font-semibold text-gray-800">Avg Mood</h3>
            <p className="text-sm text-gray-600">This week</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Mood Check */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100"
          >
            <h3 className="text-xl font-bold mb-6">Daily Mood Check-in</h3>
            <p className="text-gray-600 mb-6">How are you feeling right now?</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodCheck(mood.value)}
                  className={`p-4 rounded-2xl transition-all transform hover:scale-105 ${
                    selectedMood === mood.value
                      ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white'
                      : 'bg-gray-100 hover:bg-pink-100'
                  }`}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.label}</div>
                </button>
              ))}
            </div>
            {selectedMood && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-pink-50 p-4 rounded-2xl border border-pink-200"
              >
                <p className="text-pink-600 font-medium">✓ Mood logged! +5 kindness points</p>
              </motion.div>
            )}
          </motion.div>

          {/* Weekly Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100"
          >
            <h3 className="text-xl font-bold mb-6">Weekly Progress</h3>
            <div className="space-y-4">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-12">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-yellow-500 h-2 rounded-full"
                        style={{ width: `${(day.mood / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{day.mood}/10</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Daily Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-6">Daily Wellness Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${activity.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <activity.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold mb-2">{activity.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{activity.duration}</span>
                  <span className="text-sm font-medium text-pink-500">+{activity.points} pts</span>
                </div>
                <button
                  onClick={() => handleActivityComplete(activity)}
                  className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all"
                >
                  Start Activity
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100"
        >
          <h3 className="text-2xl font-bold mb-6">Your Badges</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`text-center p-4 rounded-2xl transition-all ${
                  badge.earned
                    ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="text-sm font-medium">{badge.name}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WellnessDashboard;