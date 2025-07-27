import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Heart, Home, Users, Mic, Brain, Calendar, Settings, Menu, X, 
  MessageCircle, Video, Shield, Bell, User, LogOut
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/mood-matching', icon: Brain, label: 'Mood Match' },
    { path: '/talk-to-ai', icon: Mic, label: 'Talk to AI' },
    { path: '/rooms', icon: Users, label: 'Rooms' },
    { path: '/confess', icon: Shield, label: 'Confess' },
    { path: '/community', icon: MessageCircle, label: 'Community' },
    { path: '/virtual-events', icon: Video, label: 'Virtual Events' },
    { path: '/offline-events', icon: Calendar, label: 'Events' },
    { path: '/wellness', icon: Heart, label: 'Wellness' }
  ];

  const notifications = [
    { id: 1, message: 'New match found in "Feeling Overwhelmed" room', time: '2m ago', unread: true },
    { id: 2, message: 'Your daily check-in streak is at 7 days!', time: '1h ago', unread: true },
    { id: 3, message: 'Open Mic Night starts in 30 minutes', time: '2h ago', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const SettingsDropdown = () => (
    <AnimatePresence>
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-pink-100 p-4 z-50"
        >
          <h3 className="font-semibold mb-3">Quick Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Notifications</span>
              <button className="w-10 h-5 bg-pink-400 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Anonymous Mode</span>
              <button className="w-10 h-5 bg-gray-300 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Voice Chat</span>
              <button className="w-10 h-5 bg-pink-400 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <Link
              to="/settings"
              className="flex items-center space-x-2 text-pink-500 hover:text-pink-600 transition-colors"
              onClick={() => setShowSettings(false)}
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">All Settings</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-pink-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Humonix
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all hover:scale-105 ${
                  location.pathname === item.path
                    ? 'bg-pink-100 text-pink-500'
                    : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-pink-500 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-pink-100 p-4"
                  >
                    <h3 className="font-semibold mb-3">Notifications</h3>
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-xl ${
                            notification.unread ? 'bg-pink-50' : 'bg-gray-50'
                          }`}
                        >
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-600 hover:text-pink-500 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <SettingsDropdown />
            </div>

            {/* User Profile */}
            <Link to="/profile" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <span className="text-sm text-gray-600">{user?.kindnessPoints || 0} pts</span>
            </Link>

            <button
              onClick={logout}
              className="text-gray-600 hover:text-red-600 transition-colors p-2"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-pink-500" /> : <Menu className="w-6 h-6 text-pink-500" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 py-4 border-t border-pink-100"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      location.pathname === item.path
                        ? 'bg-pink-100 text-pink-500'
                        : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                
                <div className="border-t border-pink-100 pt-4 mt-4">
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-pink-500 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-pink-500 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-red-600 transition-colors w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;