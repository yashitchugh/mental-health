import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mic, Users, Brain, Calendar, Award, TrendingUp, MessageCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuthStore();

  const quickActions = [
    {
      icon: Mic,
      title: 'Voice Chat',
      description: 'Talk to AI or find a human listener',
      color: 'from-emerald-500 to-teal-500',
      link: '/voice-chat'
    },
    {
      icon: Brain,
      title: 'Mood Match',
      description: 'Find people who understand you',
      color: 'from-blue-500 to-cyan-500',
      link: '/mood-matching'
    },
    {
      icon: Users,
      title: 'Join Rooms',
      description: 'Connect in mood-based communities',
      color: 'from-green-500 to-emerald-500',
      link: '/rooms'
    },
    {
      icon: Heart,
      title: 'Wellness',
      description: 'Track your emotional journey',
      color: 'from-orange-500 to-red-500',
      link: '/wellness'
    }
  ];

  const recentActivity = [
    { type: 'voice', message: 'Had a 15-minute conversation with AI companion', time: '2 hours ago' },
    { type: 'room', message: 'Joined "Late-Night Overthinkers" room', time: '1 day ago' },
    { type: 'badge', message: 'Earned "Good Listener" badge', time: '2 days ago' },
    { type: 'streak', message: 'Completed 7-day check-in streak', time: '3 days ago' }
  ];

  return (
    <div className="pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            Welcome back, {user?.isAnonymous ? 'Friend' : user?.name || 'Student'}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            How are you feeling today? Your community is here to support you.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100"
          >
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold text-emerald-600">{user?.kindnessPoints || 0}</span>
            </div>
            <h3 className="font-semibold text-gray-800">Kindness Points</h3>
            <p className="text-sm text-gray-600">Keep spreading positivity!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-green-600">{user?.streakDays || 0}</span>
            </div>
            <h3 className="font-semibold text-gray-800">Day Streak</h3>
            <p className="text-sm text-gray-600">Daily check-ins</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100"
          >
            <div className="flex items-center justify-between mb-4">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">12</span>
            </div>
            <h3 className="font-semibold text-gray-800">Conversations</h3>
            <p className="text-sm text-gray-600">This week</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-teal-600" />
              <span className="text-2xl font-bold text-teal-600">{user?.badges?.length || 0}</span>
            </div>
            <h3 className="font-semibold text-gray-800">Badges Earned</h3>
            <p className="text-sm text-gray-600">Your achievements</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity & Mood Check */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100"
          >
            <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-emerald-50 transition-colors">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-gray-800">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Daily Mood Check */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white"
          >
            <h3 className="text-xl font-bold mb-4">Daily Mood Check</h3>
            <p className="text-emerald-100 mb-6">
              How are you feeling right now? Let's track your emotional journey.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {['😊', '😐', '😔', '😰', '😴', '🤔'].map((emoji, index) => (
                <button
                  key={index}
                  className="bg-white/20 hover:bg-white/30 rounded-xl p-3 text-2xl transition-all"
                >
                  {emoji}
                </button>
              ))}
            </div>
            <Link
              to="/mood-matching"
              className="block w-full bg-white text-emerald-600 text-center py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Find Support Now
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;