import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Flag, Award, TrendingUp, Shield, Settings, Eye } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Users', value: '10,234', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Active Conversations', value: '1,456', change: '+8%', icon: MessageSquare, color: 'text-green-600' },
    { label: 'Flagged Content', value: '23', change: '-15%', icon: Flag, color: 'text-red-600' },
    { label: 'Badges Awarded', value: '3,421', change: '+25%', icon: Award, color: 'text-purple-600' }
  ];

  const recentUsers = [
    { id: 1, name: 'Anonymous User #1234', college: 'IIT Delhi', joinDate: '2025-01-10', status: 'verified' },
    { id: 2, name: 'Anonymous User #1235', college: 'DU', joinDate: '2025-01-10', status: 'pending' },
    { id: 3, name: 'Anonymous User #1236', college: 'BITS Pilani', joinDate: '2025-01-09', status: 'verified' },
    { id: 4, name: 'Anonymous User #1237', college: 'IIT Bombay', joinDate: '2025-01-09', status: 'verified' }
  ];

  const flaggedContent = [
    { id: 1, type: 'message', content: 'Inappropriate content in voice chat...', reporter: 'User #5678', status: 'pending' },
    { id: 2, type: 'post', content: 'Spam post in community feed...', reporter: 'User #9012', status: 'reviewed' },
    { id: 3, type: 'room', content: 'Harassment in support room...', reporter: 'User #3456', status: 'pending' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'moderation', label: 'Moderation', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            Admin <span className="text-purple-600">Panel</span>
          </h1>
          <p className="text-xl text-gray-600">
            Manage the Humonix community and ensure a safe, supportive environment
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/80 text-gray-700 hover:bg-purple-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    <span className={`text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
                <h3 className="text-xl font-bold mb-6">Recent User Registrations</h3>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-purple-50 transition-colors">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.college} • {user.joinDate}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        user.status === 'verified' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
                <h3 className="text-xl font-bold mb-6">Flagged Content</h3>
                <div className="space-y-4">
                  {flaggedContent.map((item) => (
                    <div key={item.id} className="p-3 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-purple-600">{item.type}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status === 'pending' 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-800 mb-1">{item.content}</div>
                      <div className="text-xs text-gray-500">Reported by {item.reporter}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">User Management</h3>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors">
                Export Users
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">User ID</th>
                    <th className="text-left py-3 px-4">College</th>
                    <th className="text-left py-3 px-4">Join Date</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-purple-50">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.college}</td>
                      <td className="py-3 px-4">{user.joinDate}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          user.status === 'verified' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-purple-600 hover:text-purple-800 mr-3">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Flag className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'moderation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
              <h3 className="text-xl font-bold mb-6">Content Moderation</h3>
              <div className="space-y-4">
                {flaggedContent.map((item) => (
                  <div key={item.id} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-purple-600 capitalize">{item.type}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status === 'pending' 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">Reported by {item.reporter}</div>
                    </div>
                    <div className="text-gray-800 mb-4">{item.content}</div>
                    <div className="flex space-x-3">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Approve
                      </button>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        Remove
                      </button>
                      <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        Review Later
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100"
          >
            <h3 className="text-xl font-bold mb-6">Platform Settings</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Community Guidelines</h4>
                <textarea
                  className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Update community guidelines..."
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Auto-Moderation Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="w-5 h-5 text-purple-600 rounded" defaultChecked />
                    <span>Enable automatic content filtering</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="w-5 h-5 text-purple-600 rounded" defaultChecked />
                    <span>Require manual review for flagged content</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="w-5 h-5 text-purple-600 rounded" />
                    <span>Enable AI-powered sentiment analysis</span>
                  </label>
                </div>
              </div>
              <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors">
                Save Settings
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;