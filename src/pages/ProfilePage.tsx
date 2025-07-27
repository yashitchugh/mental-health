import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Edit, Camera, Award, Heart, Calendar, Settings, Shield, Bell, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    college: user?.college || '',
    bio: 'Passionate about mental health and community building. Love connecting with like-minded people.',
    interests: user?.interests || [],
    languages: user?.languages || []
  });

  const [privacySettings, setPrivacySettings] = useState({
    showRealName: false,
    allowDirectMessages: true,
    showActivity: true,
    showBadges: true,
    allowMoodMatching: true
  });

  const availableInterests = [
    'Technology', 'Music', 'Art', 'Sports', 'Reading', 'Gaming',
    'Travel', 'Photography', 'Cooking', 'Dancing', 'Writing', 'Movies',
    'Mental Health', 'Meditation', 'Fitness', 'Nature'
  ];

  const availableLanguages = [
    'English', 'Hindi', 'Tamil', 'Bengali', 'Marathi', 'Telugu',
    'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'
  ];

  const achievements = [
    { name: 'Good Listener', icon: '👂', description: 'Helped 10+ people in conversations', earned: true },
    { name: 'Streak Master', icon: '🔥', description: '30-day check-in streak', earned: true },
    { name: 'Community Helper', icon: '🤝', description: 'Active in community rooms', earned: true },
    { name: 'Mindful Soul', icon: '🧘', description: 'Completed 50 meditation sessions', earned: false },
    { name: 'Wellness Warrior', icon: '⚡', description: 'Completed all daily activities for a month', earned: false },
    { name: 'Voice of Hope', icon: '🎤', description: 'Shared inspiring voice messages', earned: true }
  ];

  const activityHistory = [
    { type: 'conversation', description: 'Had a supportive conversation in "Feeling Overwhelmed" room', time: '2 hours ago' },
    { type: 'badge', description: 'Earned "Good Listener" badge', time: '1 day ago' },
    { type: 'checkin', description: 'Completed daily mood check-in', time: '1 day ago' },
    { type: 'event', description: 'Attended "Virtual Study Session"', time: '2 days ago' },
    { type: 'confession', description: 'Shared an anonymous confession', time: '3 days ago' }
  ];

  const handleSaveProfile = () => {
    updateUser(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handlePrivacyToggle = (setting: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    toast.success('Privacy setting updated');
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
            Your <span className="text-pink-500">Profile</span>
          </h1>
          <p className="text-xl text-gray-600">
            Manage your identity and privacy settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl text-white">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <button className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <h2 className="text-2xl font-bold mb-2">
                {user?.isAnonymous ? 'Anonymous Student' : user?.name || 'Student'}
              </h2>
              <p className="text-gray-600 mb-4">{user?.college}</p>
              
              <div className="bg-pink-50 p-4 rounded-2xl mb-6">
                <p className="text-sm text-gray-700 italic">
                  {formData.bio}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-pink-500">{user?.kindnessPoints || 0}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-500">{user?.streakDays || 0}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-400">{achievements.filter(a => a.earned).length}</div>
                  <div className="text-sm text-gray-600">Badges</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Edit Profile */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Profile Information</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 bg-pink-100 text-pink-500 px-4 py-2 rounded-full hover:bg-pink-200 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">College/University</label>
                    <input
                      type="text"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 h-24 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {availableInterests.map((interest) => (
                        <button
                          key={interest}
                          onClick={() => handleInterestToggle(interest)}
                          className={`p-2 rounded-xl text-sm transition-all ${
                            formData.interests.includes(interest)
                              ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-pink-100'
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {availableLanguages.map((language) => (
                        <button
                          key={language}
                          onClick={() => handleLanguageToggle(language)}
                          className={`p-2 rounded-xl text-sm transition-all ${
                            formData.languages.includes(language)
                              ? 'bg-gradient-to-r from-pink-400 to-yellow-400 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
                          }`}
                        >
                          {language}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Interests</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.interests.map((interest) => (
                        <span key={interest} className="px-3 py-1 bg-pink-100 text-pink-500 rounded-full text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Languages</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.languages.map((language) => (
                        <span key={language} className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Privacy Settings */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Privacy Settings</h3>
                <button
                  onClick={() => setShowPrivacySettings(!showPrivacySettings)}
                  className="flex items-center space-x-2 text-pink-500 hover:text-pink-600 transition-colors"
                >
                  {showPrivacySettings ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{showPrivacySettings ? 'Hide' : 'Show'} Settings</span>
                </button>
              </div>

              {showPrivacySettings && (
                <div className="space-y-4">
                  {Object.entries(privacySettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {key === 'showRealName' && 'Display your real name instead of anonymous'}
                          {key === 'allowDirectMessages' && 'Allow other users to message you directly'}
                          {key === 'showActivity' && 'Show your activity status to others'}
                          {key === 'showBadges' && 'Display your earned badges publicly'}
                          {key === 'allowMoodMatching' && 'Include you in mood-based matching'}
                        </p>
                      </div>
                      <button
                        onClick={() => handlePrivacyToggle(key)}
                        className={`w-12 h-6 rounded-full transition-all ${
                          value ? 'bg-pink-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Achievements */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100">
              <h3 className="text-xl font-bold mb-6">Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl text-center transition-all ${
                      achievement.earned
                        ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <div className="text-sm font-medium">{achievement.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity History */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100">
              <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {activityHistory.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-pink-50 transition-colors">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-gray-800">{activity.description}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;