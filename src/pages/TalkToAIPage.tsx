import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, Volume2, VolumeX, Phone, PhoneOff, Settings, Brain, Heart } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const TalkToAIPage = () => {
  const [searchParams] = useSearchParams();
  const aiType = searchParams.get('type') || 'voice';
  const isEmergency = searchParams.get('emergency') === 'true';
  
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(aiType === 'video');
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [connectionTime, setConnectionTime] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{id: number, sender: 'user' | 'ai', message: string, timestamp: Date}>>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setConnectionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  useEffect(() => {
    if (isEmergency) {
      handleConnect();
    }
  }, [isEmergency]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate ElevenLabs/Tavus connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnected(true);
    setIsConnecting(false);
    
    // Add initial AI message
    const welcomeMessage = isEmergency 
      ? "I'm here for you right now. You're safe, and you're not alone. Take a deep breath with me. What's happening?"
      : "Hello! I'm your AI companion, powered by advanced emotional intelligence. I'm here to listen and support you. How are you feeling today?";
    
    setConversation([{
      id: 1,
      sender: 'ai',
      message: welcomeMessage,
      timestamp: new Date()
    }]);
    
    toast.success(`Connected to ${aiType === 'video' ? 'Video AI Agent (Tavus)' : 'Voice AI Companion (ElevenLabs)'}`);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setConnectionTime(0);
    setConversation([]);
    toast.success('AI session ended');
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user' as const,
      message: currentMessage,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userMessage]);
    setCurrentMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I hear you, and what you're feeling is completely valid. Can you tell me more about what's been weighing on your mind?",
        "That sounds really challenging. You're being so brave by sharing this with me. How long have you been feeling this way?",
        "Thank you for trusting me with this. Your feelings matter, and you deserve support. What would help you feel a little better right now?",
        "I can sense the strength in you, even when you might not feel it yourself. What's one small thing that usually brings you comfort?",
        "You're not alone in feeling this way. Many students go through similar experiences. What support do you have around you?"
      ];

      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai' as const,
        message: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date()
      };

      setConversation(prev => [...prev, aiMessage]);
    }, 1500);
  };

  const getAIInfo = () => {
    if (aiType === 'video') {
      return {
        title: 'AI Video Companion',
        subtitle: 'Powered by Tavus - Real-time Video AI',
        avatar: '👩‍💼',
        description: 'I can see and respond to your emotions through video interaction.',
        tech: 'Tavus Video AI'
      };
    }
    return {
      title: 'AI Voice Companion',
      subtitle: 'Powered by ElevenLabs - Natural Voice AI',
      avatar: '🤖',
      description: 'I understand emotions through voice and provide empathetic support.',
      tech: 'ElevenLabs Voice AI'
    };
  };

  const aiInfo = getAIInfo();

  if (isConnecting) {
    return (
      <div className="pt-20 pb-8 px-4 min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-yellow-50 to-orange-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-4xl">{aiInfo.avatar}</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Connecting to AI...</h2>
          <p className="text-gray-600 mb-8">Initializing {aiInfo.tech}</p>
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-3 h-3 bg-pink-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 px-4 min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-orange-50">
      <div className="container mx-auto max-w-4xl">
        {!isConnected ? (
          // Pre-connection screen
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 mb-8">
              <div className="w-32 h-32 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-6xl">{aiInfo.avatar}</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{aiInfo.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{aiInfo.subtitle}</p>
              
              <div className="bg-pink-50 p-6 rounded-2xl mb-8">
                <p className="text-gray-700 italic mb-4">"{aiInfo.description}"</p>
                <div className="flex items-center justify-center space-x-4 text-sm text-pink-500">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4" />
                    <span>Emotional Intelligence</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Empathetic Responses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mic className="w-4 h-4" />
                    <span>Natural Conversation</span>
                  </div>
                </div>
              </div>
              
              {aiType === 'video' && (
                <div className="mb-6">
                  <div className="bg-gray-900 rounded-2xl p-8 mb-4">
                    <div className="text-white text-center">
                      <Video className="w-12 h-12 mx-auto mb-4" />
                      <p>AI Video Agent will appear here</p>
                      <p className="text-sm text-gray-400 mt-2">Powered by Tavus</p>
                    </div>
                  </div>
                </div>
              )}

              {isEmergency && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
                  <h3 className="text-red-800 font-semibold mb-2">Emergency Support Mode</h3>
                  <p className="text-red-700 text-sm">
                    I'm here to provide immediate emotional support. You're safe and not alone.
                  </p>
                </div>
              )}

              <button
                onClick={handleConnect}
                className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <Phone className="w-5 h-5" />
                <span>Start AI Conversation</span>
              </button>
            </div>
          </motion.div>
        ) : (
          // Active conversation screen
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Connection Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-pink-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{aiInfo.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{aiInfo.title}</h3>
                    <p className="text-sm text-gray-600">Connected • {formatTime(connectionTime)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-pink-500">{aiInfo.tech}</span>
                </div>
              </div>
            </div>

            {/* Video/Audio Interface */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100">
              {isVideoOn ? (
                <div className="bg-gray-900 rounded-2xl p-8 mb-6 aspect-video flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">{aiInfo.avatar}</span>
                    </div>
                    <p className="text-xl">AI Video Agent Active</p>
                    <p className="text-gray-400">Powered by Tavus</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl p-12 mb-6 text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">{aiInfo.avatar}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">AI Voice Conversation Active</h3>
                  <p className="text-pink-100">Powered by ElevenLabs</p>
                </div>
              )}

              {/* Conversation */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6 max-h-64 overflow-y-auto">
                <div className="space-y-4">
                  {conversation.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.sender === 'user' ? 'justify-end' : ''
                      }`}
                    >
                      {message.sender === 'ai' && (
                        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">{aiInfo.avatar}</span>
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-2xl max-w-xs ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white'
                            : 'bg-white'
                        }`}
                      >
                        <p>{message.message}</p>
                      </div>
                      {message.sender === 'user' && (
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">You</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="flex items-center space-x-4 mb-6">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message or use voice..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
                >
                  Send
                </button>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    isMuted ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>

                {aiType === 'video' && (
                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                      !isVideoOn ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                  </button>
                )}

                <button
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    !isSpeakerOn ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                </button>

                <button className="w-14 h-14 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full flex items-center justify-center transition-all">
                  <Settings className="w-6 h-6" />
                </button>

                <button
                  onClick={handleDisconnect}
                  className="w-14 h-14 bg-red-500 text-white hover:bg-red-600 rounded-full flex items-center justify-center transition-all"
                >
                  <PhoneOff className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TalkToAIPage;