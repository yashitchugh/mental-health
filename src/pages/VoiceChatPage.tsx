import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Phone, PhoneOff, Video, VideoOff, Volume2, VolumeX, Settings } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const VoiceChatPage = () => {
  const [searchParams] = useSearchParams();
  const chatType = searchParams.get('type') || 'ai';
  
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(chatType === 'video');
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [connectionTime, setConnectionTime] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setConnectionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnected(true);
    setIsConnecting(false);
    toast.success(`Connected to ${chatType === 'ai' ? 'AI Companion' : chatType === 'video' ? 'Video Agent' : 'Peer Support'}`);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setConnectionTime(0);
    toast.success('Call ended');
  };

  const getChatInfo = () => {
    switch (chatType) {
      case 'ai':
        return {
          title: 'AI Companion',
          subtitle: 'Empathetic AI trained in emotional support',
          avatar: '🤖',
          description: 'I\'m here to listen and support you through whatever you\'re feeling.'
        };
      case 'video':
        return {
          title: 'Video Agent',
          subtitle: 'Face-to-face AI support with Tavus',
          avatar: '👩‍💼',
          description: 'Let\'s have a visual conversation. I can see and respond to your emotions.'
        };
      case 'peer':
        return {
          title: 'Peer Support',
          subtitle: 'Anonymous student who understands',
          avatar: '👤',
          description: 'Another student who has been through similar experiences.'
        };
      default:
        return {
          title: 'Support Chat',
          subtitle: 'Emotional support conversation',
          avatar: '💬',
          description: 'You\'re not alone. Let\'s talk.'
        };
    }
  };

  const chatInfo = getChatInfo();

  if (isConnecting) {
    return (
      <div className="pt-20 pb-8 px-4 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-4xl">{chatInfo.avatar}</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Connecting...</h2>
          <p className="text-gray-600 mb-8">Setting up your {chatInfo.title.toLowerCase()} session</p>
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-3 h-3 bg-purple-600 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 px-4 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        {!isConnected ? (
          // Pre-connection screen
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-purple-100 mb-8">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-6xl">{chatInfo.avatar}</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{chatInfo.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{chatInfo.subtitle}</p>
              <div className="bg-purple-50 p-6 rounded-2xl mb-8">
                <p className="text-gray-700 italic">"{chatInfo.description}"</p>
              </div>
              
              {chatType === 'video' && (
                <div className="mb-6">
                  <div className="bg-gray-900 rounded-2xl p-8 mb-4">
                    <div className="text-white text-center">
                      <Video className="w-12 h-12 mx-auto mb-4" />
                      <p>Video preview will appear here</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Make sure your camera and microphone are enabled for the best experience
                  </p>
                </div>
              )}

              <button
                onClick={handleConnect}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <Phone className="w-5 h-5" />
                <span>Start Conversation</span>
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-purple-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{chatInfo.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{chatInfo.title}</h3>
                    <p className="text-sm text-gray-600">Connected • {formatTime(connectionTime)}</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Video/Audio Interface */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-purple-100">
              {isVideoOn ? (
                <div className="bg-gray-900 rounded-2xl p-8 mb-6 aspect-video flex items-center justify-center">
                  <div className="text-white text-center">
                    <Video className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-xl">Video conversation active</p>
                    <p className="text-gray-400">AI Video Agent powered by Tavus</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 mb-6 text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">{chatInfo.avatar}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Voice Conversation Active</h3>
                  <p className="text-purple-100">
                    {chatType === 'ai' ? 'AI powered by ElevenLabs' : 'Anonymous peer support'}
                  </p>
                </div>
              )}

              {/* Conversation Transcript */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6 max-h-64 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">{chatInfo.avatar}</span>
                    </div>
                    <div className="bg-white p-3 rounded-2xl flex-1">
                      <p>Hello! I'm here to listen and support you. How are you feeling today?</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-purple-600 text-white p-3 rounded-2xl max-w-xs">
                      <p>I've been feeling really overwhelmed with everything lately...</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">You</span>
                    </div>
                  </div>
                </div>
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

                {chatType === 'video' && (
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

export default VoiceChatPage;