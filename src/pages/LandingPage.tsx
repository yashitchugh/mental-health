import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mic, Video, Users, Brain, Sparkles, Play, ArrowRight, Menu, X, UserPlus, LogIn, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const LandingPage = () => {
  const [currentMood, setCurrentMood] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animatedText, setAnimatedText] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authData, setAuthData] = useState({ email: '', password: '' });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentDemoStep, setCurrentDemoStep] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();

  const fullText = "Where Voices Heal & Communities Thrive";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setAnimatedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Demo video progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVideoPlaying) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            setIsVideoPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isVideoPlaying]);

  // Demo steps for the video
  const demoSteps = [
    {
      title: "Voice AI Conversation",
      description: "Natural, empathetic conversations with AI companions",
      icon: Mic,
      color: "from-pink-300 to-yellow-300",
      duration: 25
    },
    {
      title: "Mood Matching",
      description: "Connect with peers who understand your feelings",
      icon: Brain,
      color: "from-pink-400 to-yellow-400",
      duration: 30
    },
    {
      title: "Community Rooms",
      description: "Join anonymous support groups based on your mood",
      icon: Users,
      color: "from-pink-500 to-yellow-500",
      duration: 25
    },
    {
      title: "Video Support",
      description: "Face-to-face AI companions for deeper connection",
      icon: Video,
      color: "from-pink-300 to-yellow-300",
      duration: 20
    }
  ];

  const moods = [
    { emoji: '😔', label: 'Overwhelmed', color: 'bg-pink-100 text-pink-600', value: 'overwhelmed' },
    { emoji: '😴', label: 'Tired', color: 'bg-yellow-100 text-yellow-600', value: 'tired' },
    { emoji: '😰', label: 'Anxious', color: 'bg-pink-200 text-pink-700', value: 'anxious' },
    { emoji: '😊', label: 'Happy', color: 'bg-yellow-200 text-yellow-700', value: 'happy' },
    { emoji: '🤔', label: 'Confused', color: 'bg-pink-100 text-pink-600', value: 'confused' },
    { emoji: '😢', label: 'Sad', color: 'bg-yellow-100 text-yellow-600', value: 'sad' }
  ];

  const handleQuickStart = async () => {
    if (!authData.email || !authData.password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsAuthLoading(true);
    try {
      if (authMode === 'signin') {
        await login(authData.email, authData.password);
        setShowAuthModal(false);
        toast.success('Welcome back to Humonix!');
        navigate('/dashboard');
      } else {
        setShowAuthModal(false);
        navigate('/onboarding');
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed. Please try again.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleMoodSelection = (mood: any) => {
    setCurrentMood(mood.value);
    localStorage.setItem('selectedMood', mood.value);
  };

  const handleJoinNow = () => {
    setShowAuthModal(true);
    setAuthMode('signup');
  };

  const handleSignIn = () => {
    setShowAuthModal(true);
    setAuthMode('signin');
  };

  const handleTalkNow = () => {
    if (currentMood) {
      localStorage.setItem('urgentMood', currentMood);
      setShowAuthModal(true);
      setAuthMode('signin');
    } else {
      toast.error('Please select how you\'re feeling first');
    }
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(!isVideoPlaying);
    if (!isVideoPlaying) {
      setVideoProgress(0);
      setCurrentDemoStep(0);
    }
  };

  const handleVideoRestart = () => {
    setIsVideoPlaying(false);
    setVideoProgress(0);
    setCurrentDemoStep(0);
  };

  // Update demo step based on progress
  useEffect(() => {
    let cumulativeProgress = 0;
    for (let i = 0; i < demoSteps.length; i++) {
      cumulativeProgress += demoSteps[i].duration;
      if (videoProgress <= cumulativeProgress) {
        setCurrentDemoStep(i);
        break;
      }
    }
  }, [videoProgress]);

  const AuthModal = () => (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowAuthModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Heart className="w-8 h-8 text-pink-500" />
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                  Humonix
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {authMode === 'signin' ? 'Welcome Back' : 'Join Our Community'}
              </h2>
              <p className="text-gray-600">
                {authMode === 'signin' 
                  ? 'Sign in to continue your wellness journey' 
                  : 'Start your emotional wellness journey today'
                }
              </p>
            </div>

            <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
              <button
                onClick={() => setAuthMode('signin')}
                className={`flex-1 py-2 px-4 rounded-xl transition-all ${
                  authMode === 'signin' 
                    ? 'bg-white text-pink-500 shadow-sm' 
                    : 'text-gray-600'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-2 px-4 rounded-xl transition-all ${
                  authMode === 'signup' 
                    ? 'bg-white text-pink-500 shadow-sm' 
                    : 'text-gray-600'
                }`}
              >
                Sign Up
              </button>
            </div>

            {authMode === 'signin' ? (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  value={authData.email}
                  onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={authData.password}
                  onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                  onClick={handleQuickStart}
                  disabled={isAuthLoading}
                  className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isAuthLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 bg-pink-50 p-3 rounded-xl">
                  All fields are mandatory to ensure a safe and supportive community.
                </p>
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    navigate('/onboarding');
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
                >
                  Continue to Registration
                </button>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {authMode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                  className="text-pink-500 font-medium hover:underline"
                >
                  {authMode === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-pink-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-pink-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Humonix
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-pink-500 transition-colors">Features</a>
              <a href="#community" className="text-gray-700 hover:text-pink-500 transition-colors">Community</a>
              <a href="#about" className="text-gray-700 hover:text-pink-500 transition-colors">About</a>
              <button
                onClick={handleSignIn}
                className="flex items-center space-x-2 text-pink-500 hover:text-pink-600 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
              <button
                onClick={handleJoinNow}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <UserPlus className="w-4 h-4" />
                <span>Join Now</span>
              </button>
            </nav>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-pink-500" /> : <Menu className="w-6 h-6 text-pink-500" />}
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 py-4 border-t border-pink-100"
              >
                <nav className="flex flex-col space-y-4">
                  <a href="#features" className="text-gray-700 hover:text-pink-500 transition-colors">Features</a>
                  <a href="#community" className="text-gray-700 hover:text-pink-500 transition-colors">Community</a>
                  <a href="#about" className="text-gray-700 hover:text-pink-500 transition-colors">About</a>
                  <button
                    onClick={handleSignIn}
                    className="flex items-center space-x-2 text-pink-500 hover:text-pink-600 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={handleJoinNow}
                    className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 w-full justify-center"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Join Now</span>
                  </button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight min-h-[200px] flex items-center justify-center"
          >
            <span className="bg-gradient-to-r from-pink-500 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              {animatedText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            India's first voice-powered emotional wellness platform. Connect with AI companions and real humans who understand your journey.
          </motion.p>

          {/* Real-time Mood Meter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-pink-200 max-w-2xl mx-auto shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6">How are you feeling today?</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
              {moods.map((mood, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMoodSelection(mood)}
                  className={`p-4 rounded-2xl transition-all duration-300 transform ${
                    currentMood === mood.value ? mood.color : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.label}</div>
                </motion.button>
              ))}
            </div>
            
            <AnimatePresence>
              {currentMood && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-6 rounded-2xl"
                >
                  <p className="mb-4">We hear you. Let's find someone who understands.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleTalkNow}
                      className="bg-white text-pink-500 px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                    >
                      <Mic className="w-4 h-4" />
                      <span>Talk to Someone Now</span>
                    </button>
                    <button
                      onClick={() => navigate('/mood-matching')}
                      className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white/10 transition-all flex items-center justify-center space-x-2"
                    >
                      <Users className="w-4 h-4" />
                      <span>Find My Tribe</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <button
              onClick={handleJoinNow}
              className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Start Your Journey</span>
            </button>
            <button
              onClick={() => document.getElementById('demo-video')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-pink-300 text-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-50 transition-all duration-300 flex items-center space-x-2"
            >
              <Video className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Preview */}
      <section id="features" className="py-20 px-4 bg-gradient-to-r from-pink-100/50 to-yellow-100/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              AI-Powered <span className="text-pink-500">Emotional Support</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of emotional wellness with voice AI, video companions, and genuine human connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/talk-to-ai')}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-2xl flex items-center justify-center mb-6">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Voice-First AI</h3>
              <p className="text-gray-600">Natural conversations with multilingual AI companions powered by ElevenLabs</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/talk-to-ai?type=video')}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-2xl flex items-center justify-center mb-6">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Video Companions</h3>
              <p className="text-gray-600">Real-time AI video agents powered by Tavus for emotional support and guidance</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/mood-matching')}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Smart Matching</h3>
              <p className="text-gray-600">AI-powered mood detection connects you with the right support at the right time</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Preview */}
      <section id="community" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your <span className="text-pink-500">Tribe</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Anonymous, mood-based communities where you can be yourself without judgment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Feeling Overwhelmed", count: "234 online", active: true, mood: 'overwhelmed' },
              { name: "Late-Night Overthinkers", count: "89 online", active: true, mood: 'anxious' },
              { name: "Study & Chill", count: "156 online", active: false, mood: 'focused' },
              { name: "Anxiety Support", count: "167 online", active: true, mood: 'anxious' },
              { name: "Happy Vibes", count: "203 online", active: false, mood: 'happy' },
              { name: "Breakup Support", count: "78 online", active: true, mood: 'sad' }
            ].map((room, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl cursor-pointer ${
                  room.active ? 'border-pink-200 bg-pink-50/20' : 'border-yellow-200'
                }`}
                onClick={() => {
                  localStorage.setItem('selectedMood', room.mood);
                  navigate('/rooms');
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-pink-500" />
                  {room.active && (
                    <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{room.count}</p>
                <button
                  className={`w-full py-2 px-4 rounded-full text-sm font-medium transition-all ${
                    room.active 
                      ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:shadow-lg' 
                      : 'bg-pink-100 text-pink-500 hover:bg-pink-200'
                  }`}
                >
                  {room.active ? 'Join Conversation' : 'Enter Room'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-r from-pink-100/50 to-yellow-100/50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              About <span className="text-pink-500">Humonix</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-pink-200 shadow-xl"
          >
            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <p>
                Humonix is India's pioneering voice-powered emotional wellness platform, specifically designed for the unique challenges faced by Gen Z students across the country. Born from the understanding that traditional mental health resources often feel disconnected from the lived experiences of young Indians, Humonix bridges the gap between cutting-edge AI technology and authentic human connection. Our platform combines advanced voice AI powered by ElevenLabs, real-time video companions through Tavus, and intelligent mood-matching algorithms to create a comprehensive ecosystem where students can find immediate, empathetic support in their preferred language and communication style.
              </p>
              
              <p>
                What sets Humonix apart is our deep commitment to creating genuine community alongside technological innovation. While our AI companions provide 24/7 emotional support with cultural sensitivity and multilingual capabilities, our anonymous mood-based rooms connect students with peers who truly understand their struggles - from academic pressure and family expectations to career anxiety and relationship challenges. Through verified college communities, virtual events, offline meetups, and gamified wellness activities, Humonix transforms isolated struggles into shared journeys of growth and healing. We believe that every student deserves to be heard, understood, and supported, and our platform ensures that help is always just a voice away, whether through AI companionship or human connection.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section id="demo-video" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience <span className="text-pink-500">Mental Health Wellness</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how Humonix transforms emotional wellness through AI-powered conversations, peer support, and community connection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-pink-200 shadow-xl">
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 aspect-video flex items-center justify-center relative overflow-hidden">
                  {/* Video Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-yellow-500/20"></div>
                  
                  {/* Demo Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentDemoStep}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="text-white text-center z-10"
                    >
                      <div className={`w-20 h-20 bg-gradient-to-r ${demoSteps[currentDemoStep]?.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                        {demoSteps[currentDemoStep]?.icon && (() => {
                          const CurrentIcon = demoSteps[currentDemoStep].icon;
                          return <CurrentIcon className="w-10 h-10 text-white" />;
                        })()}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{demoSteps[currentDemoStep]?.title}</h3>
                      <p className="text-gray-300 text-lg">{demoSteps[currentDemoStep]?.description}</p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Play/Pause Overlay */}
                  {!isVideoPlaying && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={handleVideoPlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all group"
                    >
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 text-white ml-1" />
                      </div>
                    </motion.button>
                  )}
                </div>

                {/* Video Controls */}
                <div className="mt-6 space-y-4">
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-pink-500 to-yellow-500 h-2 rounded-full"
                      style={{ width: `${videoProgress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleVideoPlay}
                        className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
                      >
                        {isVideoPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                      </button>
                      <button
                        onClick={handleVideoRestart}
                        className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                      >
                        <RotateCcw className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => setIsVideoMuted(!isVideoMuted)}
                        className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                      >
                        {isVideoMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                      </button>
                    </div>
                    <div className="text-sm text-gray-600">
                      {Math.floor(videoProgress)}% complete
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Demo Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-200">
                <h3 className="text-xl font-bold mb-4">Demo Features</h3>
                <div className="space-y-4">
                  {demoSteps.map((step, index) => {
                    const StepIcon = step.icon;
                    return (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                          currentDemoStep === index
                            ? 'bg-pink-100 border border-pink-300'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-10 h-10 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center`}>
                          <StepIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{step.title}</h4>
                          <p className="text-xs text-gray-600">{step.description}</p>
                        </div>
                        {currentDemoStep === index && (
                          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Why Choose Humonix?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>24/7 AI emotional support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Anonymous peer connections</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Multilingual voice AI</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Safe & secure platform</span>
                  </div>
                </div>
                <button
                  onClick={handleJoinNow}
                  className="w-full bg-white text-pink-500 py-3 rounded-full font-semibold mt-4 hover:shadow-lg transition-all"
                >
                  Start Your Journey
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-8 h-8 text-pink-400" />
                <span className="text-2xl font-bold">Humonix</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Where voices heal and communities thrive. Built for India's next generation 
                of students who deserve to be heard, understood, and supported.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <span className="text-sm">T</span>
                </a>
                <a href="#" className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <span className="text-sm">I</span>
                </a>
                <a href="#" className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <span className="text-sm">L</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#community" className="hover:text-white transition-colors">Community</a></li>
                <li><button onClick={() => navigate('/rooms')} className="hover:text-white transition-colors">Safety</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Crisis Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                <p>&copy; 2025 Humonix. Made with Bolt.new </p>
              </div>
              <div className="flex space-x-6 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-pink-500/20 to-yellow-500/20 rounded-2xl p-6 border border-pink-500/20">
              <p className="text-pink-300 text-sm">
                🚨 <strong>Crisis Support:</strong> If you're in immediate danger, please contact your local emergency services or call 
                <span className="text-white font-semibold"> KIRAN Helpline: 1800-599-0019</span>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleJoinNow}
              className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              <span>Join the Movement</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>

      <AuthModal />
    </div>
  );
};

export default LandingPage;