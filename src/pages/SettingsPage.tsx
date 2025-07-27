import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, Bell, Shield, Eye, EyeOff, Volume2, VolumeX, 
  Smartphone, Globe, Palette, Moon, Sun, Monitor, 
  Lock, Key, Trash2, Download, Upload, Save
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const { user, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('general');

  const [settings, setSettings] = useState({
    // General Settings
    notifications: true,
    emailNotifications: true,
    pushNotifications: true,
    soundEffects: true,
    
    // Privacy Settings
    showOnlineStatus: true,
    allowDirectMessages: true,
    showActivity: true,
    showBadges: true,
    allowMoodMatching: true,
    anonymousMode: false,
    
    // Appearance Settings
    theme: 'system', // light, dark, system
    fontSize: 'medium', // small, medium, large
    colorScheme: 'green', // green, blue, purple, pink
    
    // Voice & Video Settings
    microphoneEnabled: true,
    cameraEnabled: true,
    speakerVolume: 80,
    microphoneVolume: 80,
    
    // Language Settings
    primaryLanguage: 'English',
    voiceLanguage: 'English',
    
    // Security Settings
    twoFactorAuth: false,
    loginAlerts: true,
    dataDownload: false
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'voice', label: 'Voice & Video', icon: Volume2 },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'security', label: 'Security', icon: Lock }
  ];

  const colorSchemes = [
    { id: 'green', name: 'Green', colors: 'from-emerald-500 to-teal-500' },
    { id: 'blue', name: 'Blue', colors: 'from-blue-500 to-cyan-500' },
    { id: 'purple', name: 'Purple', colors: 'from-purple-500 to-pink-500' },
    { id: 'pink', name: 'Pink', colors: 'from-pink-500 to-rose-500' }
  ];

  const languages = [
    'English', 'Hindi', 'Tamil', 'Bengali', 'Marathi', 'Telugu',
    'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast.success('Setting updated');
  };

  const handleSaveSettings = async () => {
    try {
      await updateUser({ settings });
      toast.success('All settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  const handleExportData = () => {
    toast.success('Data export initiated. You will receive an email shortly.');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion initiated. Please check your email for confirmation.');
    }
  };

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-12 h-6 rounded-full transition-all ${
        enabled ? 'bg-emerald-600' : 'bg-gray-300'
      }`}
    >
      <div className={`w-5 h-5 bg-white rounded-full transition-all ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  );

  const SliderInput = ({ value, onChange, min = 0, max = 100 }: { 
    value: number; 
    onChange: (value: number) => void;
    min?: number;
    max?: number;
  }) => (
    <div className="flex items-center space-x-4">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      <span className="text-sm font-medium w-12">{value}%</span>
    </div>
  );

  return (
    <div className="pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            <Settings className="w-10 h-10 inline mr-3 text-emerald-600" />
            Settings
          </h1>
          <p className="text-xl text-gray-600">
            Customize your Humonix experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-700 hover:bg-emerald-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Settings Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">General Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-medium">Push Notifications</h3>
                        <p className="text-sm text-gray-600">Receive notifications on your device</p>
                      </div>
                      <ToggleSwitch 
                        enabled={settings.notifications} 
                        onChange={(value) => handleSettingChange('notifications', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Get updates via email</p>
                      </div>
                      <ToggleSwitch 
                        enabled={settings.emailNotifications} 
                        onChange={(value) => handleSettingChange('emailNotifications', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-medium">Sound Effects</h3>
                        <p className="text-sm text-gray-600">Play sounds for interactions</p>
                      </div>
                      <ToggleSwitch 
                        enabled={settings.soundEffects} 
                        onChange={(value) => handleSettingChange('soundEffects', value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Privacy Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-medium">Anonymous Mode</h3>
                        <p className="text-sm text-gray-600">Hide your identity in all interactions</p>
                      </div>
                      <ToggleSwitch 
                        enabled={settings.anonymousMode} 
                        onChange={(value) => handleSettingChange('anonymousMode', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-medium">Show Online Status</h3>
                        <p className="text-sm text-gray-600">Let others see when you're online</p>
                      </div>
                      <ToggleSwitch 
                        enabled={settings.showOnlineStatus} 
                        onChange={(value) => handleSettingChange('showOnlineStatus', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-medium">Allow Direct Messages</h3>
                        <p className="text-sm text-gray-600">Let other users message you directly</p>
                      </div>
                      <ToggleSwitch 
                        enabled={settings.allowDirectMessages} 
                        onChange={(value) => handleSettingChange('allowDirectMessages', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-medium">Mood Matching</h3>
                        <p className="text-sm text-gray-600">Include you in mood-based matching</p>
                      </div>
                      <ToggleSwitch 
                        enabled={settings.allowMoodMatching} 
                        onChange={(value) => handleSettingChange('allowMoodMatching', value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Appearance Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Theme</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { id: 'light', label: 'Light', icon: Sun },
                          { id: 'dark', label: 'Dark', icon: Moon },
                          { id: 'system', label: 'System', icon: Monitor }
                        ].map((theme) => (
                          <button
                            key={theme.id}
                            onClick={() => handleSettingChange('theme', theme.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              settings.theme === theme.id
                                ? 'border-emerald-600 bg-emerald-50'
                                : 'border-gray-200 hover:border-emerald-300'
                            }`}
                          >
                            <theme.icon className="w-6 h-6 mx-auto mb-2" />
                            <span className="text-sm font-medium">{theme.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Color Scheme</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {colorSchemes.map((scheme) => (
                          <button
                            key={scheme.id}
                            onClick={() => handleSettingChange('colorScheme', scheme.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              settings.colorScheme === scheme.id
                                ? 'border-emerald-600'
                                : 'border-gray-200 hover:border-emerald-300'
                            }`}
                          >
                            <div className={`w-8 h-8 bg-gradient-to-r ${scheme.colors} rounded-full mx-auto mb-2`} />
                            <span className="text-sm font-medium">{scheme.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Font Size</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { id: 'small', label: 'Small' },
                          { id: 'medium', label: 'Medium' },
                          { id: 'large', label: 'Large' }
                        ].map((size) => (
                          <button
                            key={size.id}
                            onClick={() => handleSettingChange('fontSize', size.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              settings.fontSize === size.id
                                ? 'border-emerald-600 bg-emerald-50'
                                : 'border-gray-200 hover:border-emerald-300'
                            }`}
                          >
                            <span className={`font-medium ${
                              size.id === 'small' ? 'text-sm' :
                              size.id === 'large' ? 'text-lg' : 'text-base'
                            }`}>
                              {size.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'voice' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Voice & Video Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-medium">Microphone</h3>
                        <p className="text-sm text-gray-600">Enable microphone for voice chats</p>
                      </div>
                      <ToggleSwitch 
                        enabled={settings.microphoneEnabled} 
                        onChange={(value) => handleSettingChange('microphoneEnabled', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-medium">Camera</h3>
                        <p className="text-sm text-gray-600">Enable camera for video chats</p>
                      </div>
                      <ToggleSwitch 
                        enabled={settings.cameraEnabled} 
                        onChange={(value) => handleSettingChange('cameraEnabled', value)}
                      />
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h3 className="font-medium mb-4">Speaker Volume</h3>
                      <SliderInput 
                        value={settings.speakerVolume}
                        onChange={(value) => handleSettingChange('speakerVolume', value)}
                      />
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h3 className="font-medium mb-4">Microphone Volume</h3>
                      <SliderInput 
                        value={settings.microphoneVolume}
                        onChange={(value) => handleSettingChange('microphoneVolume', value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'language' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Language Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Primary Language</h3>
                      <select
                        value={settings.primaryLanguage}
                        onChange={(e) => handleSettingChange('primaryLanguage', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {languages.map((lang) => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Voice Chat Language</h3>
                      <select
                        value={settings.voiceLanguage}
                        onChange={(e) => handleSettingChange('voiceLanguage', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {languages.map((lang) => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                      <ToggleSwitch 
                        enabled={settings.twoFactorAuth} 
                        onChange={(value) => handleSettingChange('twoFactorAuth', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-medium">Login Alerts</h3>
                        <p className="text-sm text-gray-600">Get notified of new logins</p>
                      </div>
                      <ToggleSwitch 
                        enabled={settings.loginAlerts} 
                        onChange={(value) => handleSettingChange('loginAlerts', value)}
                      />
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={handleExportData}
                        className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        <span>Export My Data</span>
                      </button>

                      <button
                        onClick={handleDeleteAccount}
                        className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span>Delete Account</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSaveSettings}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save All Settings</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;