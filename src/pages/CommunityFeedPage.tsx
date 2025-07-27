import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share, Plus, Mic, Image, Type, Calendar } from 'lucide-react';

const CommunityFeedPage = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const posts = [
    {
      id: 1,
      type: 'text',
      author: 'Anonymous Student',
      avatar: '🎭',
      time: '2 hours ago',
      content: 'Sometimes I feel like I\'m drowning in assignments, but then I remember that every small step counts. Today I finished one essay, and that\'s enough. 💪',
      likes: 23,
      comments: 8,
      tags: ['motivation', 'academic-stress']
    },
    {
      id: 2,
      type: 'poetry',
      author: 'Midnight Poet',
      avatar: '🌙',
      time: '4 hours ago',
      content: `In the silence of 3 AM thoughts,
I find pieces of myself I forgot.
Anxiety whispers, but hope speaks louder,
Tomorrow I'll be a little bit prouder.`,
      likes: 45,
      comments: 12,
      tags: ['poetry', 'anxiety', 'hope']
    },
    {
      id: 3,
      type: 'voice',
      author: 'Gentle Voice',
      avatar: '🎵',
      time: '6 hours ago',
      content: 'Shared a 2-minute voice note about finding peace in small moments',
      duration: '2:15',
      likes: 18,
      comments: 5,
      tags: ['voice-note', 'mindfulness']
    },
    {
      id: 4,
      type: 'art',
      author: 'Creative Soul',
      avatar: '🎨',
      time: '1 day ago',
      content: 'Drew this during a particularly tough day. Art helps me process emotions I can\'t put into words.',
      likes: 67,
      comments: 15,
      tags: ['art', 'emotional-expression']
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Open Mic Night',
      date: 'Tomorrow, 7 PM',
      location: 'Virtual Room',
      attendees: 45,
      type: 'virtual'
    },
    {
      id: 2,
      title: 'Delhi Campus Meetup',
      date: 'This Saturday, 4 PM',
      location: 'India Gate',
      attendees: 23,
      type: 'physical'
    },
    {
      id: 3,
      title: 'Study Together Session',
      date: 'Sunday, 10 AM',
      location: 'Virtual Study Room',
      attendees: 78,
      type: 'virtual'
    }
  ];

  const PostCard = ({ post }: { post: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 mb-6"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-lg">{post.avatar}</span>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{post.author}</h4>
          <p className="text-sm text-gray-500">{post.time}</p>
        </div>
      </div>

      <div className="mb-4">
        {post.type === 'voice' ? (
          <div className="bg-pink-50 p-4 rounded-2xl">
            <div className="flex items-center space-x-3">
              <Mic className="w-6 h-6 text-pink-500" />
              <div className="flex-1">
                <p className="text-gray-800">{post.content}</p>
                <p className="text-sm text-pink-500">Duration: {post.duration}</p>
              </div>
            </div>
          </div>
        ) : post.type === 'poetry' ? (
          <div className="bg-gradient-to-r from-pink-50 to-yellow-50 p-4 rounded-2xl">
            <pre className="text-gray-800 font-serif whitespace-pre-wrap">{post.content}</pre>
          </div>
        ) : post.type === 'art' ? (
          <div>
            <div className="bg-gray-200 rounded-2xl h-48 flex items-center justify-center mb-3">
              <span className="text-gray-500">🎨 Artwork Preview</span>
            </div>
            <p className="text-gray-800">{post.content}</p>
          </div>
        ) : (
          <p className="text-gray-800">{post.content}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="px-3 py-1 bg-pink-100 text-pink-500 text-sm rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 transition-colors">
            <Share className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="pt-20 pb-8 px-4 bg-gradient-to-br from-pink-50 via-yellow-50 to-orange-50 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            Community <span className="text-pink-500">Feed</span>
          </h1>
          <p className="text-xl text-gray-600">
            Share your thoughts, art, and experiences anonymously
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-pink-100">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-6 py-2 rounded-xl transition-all ${
                activeTab === 'feed'
                  ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white'
                  : 'text-gray-600 hover:bg-pink-100'
              }`}
            >
              Feed
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-2 rounded-xl transition-all ${
                activeTab === 'events'
                  ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white'
                  : 'text-gray-600 hover:bg-pink-100'
              }`}
            >
              Events
            </button>
          </div>
        </div>

        {activeTab === 'feed' && (
          <>
            {/* Create Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 mb-8"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-lg">✨</span>
                </div>
                <input
                  type="text"
                  placeholder="Share your thoughts anonymously..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  onClick={() => setShowCreatePost(true)}
                />
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-pink-500 hover:bg-pink-100 px-3 py-2 rounded-full transition-all">
                  <Type className="w-4 h-4" />
                  <span className="text-sm">Text</span>
                </button>
                <button className="flex items-center space-x-2 text-pink-500 hover:bg-pink-100 px-3 py-2 rounded-full transition-all">
                  <Mic className="w-4 h-4" />
                  <span className="text-sm">Voice</span>
                </button>
                <button className="flex items-center space-x-2 text-pink-500 hover:bg-pink-100 px-3 py-2 rounded-full transition-all">
                  <Image className="w-4 h-4" />
                  <span className="text-sm">Art</span>
                </button>
              </div>
            </motion.div>

            {/* Posts */}
            <div>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}

        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <p className="text-gray-600">{event.date}</p>
                      <p className="text-sm text-gray-500">{event.location}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    event.type === 'virtual' 
                      ? 'bg-blue-100 text-blue-500' 
                      : 'bg-green-100 text-green-500'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">{event.attendees} people interested</p>
                  <button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
                    Join Event
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeedPage;