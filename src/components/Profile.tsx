import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaShare, FaHeart, FaComment, FaCog } from 'react-icons/fa';

interface Video {
  id: number;
  thumbnail: string;
  views: string;
  likes: string;
}

function Profile() {
  const [username, setUsername] = useState('@username');
  const [bio, setBio] = useState('Digital creator & content enthusiast 🎥 | Creating awesome videos daily ✨');
  const [isEditing, setIsEditing] = useState({ username: false, bio: false });
  const [activeTab, setActiveTab] = useState('videos');

  const mockVideos: Video[] = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    thumbnail: `https://picsum.photos/400/400?random=${i}`,
    views: `${Math.floor(Math.random() * 1000)}K`,
    likes: `${Math.floor(Math.random() * 100)}K`
  }));

  const stats = [
    { label: 'Following', value: '1.2K' },
    { label: 'Followers', value: '10.5K' },
    { label: 'Likes', value: '150K' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 md:p-8"
    >
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-12">
          {/* Avatar Section */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-1">
              <div className="w-full h-full bg-gray-900 rounded-full p-1">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username.replace('@', '')}`}
                  alt="avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <button className="absolute bottom-0 right-0 bg-pink-500 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <FaEdit className="text-white" />
            </button>
          </motion.div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <AnimatePresence mode='wait'>
                  {!isEditing.username ? (
                    <motion.h1
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsEditing({ ...isEditing, username: true })}
                      className="text-3xl md:text-4xl text-white font-bold cursor-pointer hover:text-pink-500 transition-colors"
                    >
                      {username}
                    </motion.h1>
                  ) : (
                    <motion.input
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onBlur={() => setIsEditing({ ...isEditing, username: false })}
                      className="text-3xl md:text-4xl text-white bg-transparent border-b-2 border-pink-500 focus:outline-none"
                      autoFocus
                    />
                  )}
                </AnimatePresence>
                <button className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
                  Follow
                </button>
              </div>
              <div className="flex space-x-4">
                <button className="text-white hover:text-pink-500 transition-colors">
                  <FaShare />
                </button>
                <button className="text-white hover:text-pink-500 transition-colors">
                  <FaCog />
                </button>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              {!isEditing.bio ? (
                <p
                  onClick={() => setIsEditing({ ...isEditing, bio: true })}
                  className="text-gray-300 cursor-pointer hover:text-white transition-colors"
                >
                  {bio}
                </p>
              ) : (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  onBlur={() => setIsEditing({ ...isEditing, bio: false })}
                  className="w-full bg-transparent text-white border-2 border-pink-500 rounded-lg p-2 focus:outline-none"
                  rows={3}
                  autoFocus
                />
              )}
            </div>

            {/* Stats */}
            <div className="flex space-x-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  className="text-center cursor-pointer"
                >
                  <div className="text-white font-bold text-xl">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mb-8">
          <div className="flex space-x-6 border-b border-gray-800">
            {['videos', 'liked', 'saved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-4 text-lg capitalize ${
                  activeTab === tab
                    ? 'text-pink-500 border-b-2 border-pink-500'
                    : 'text-gray-400 hover:text-white'
                } transition-colors`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {mockVideos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ y: -5 }}
              className="relative group rounded-xl overflow-hidden aspect-square"
            >
              <img
                src={video.thumbnail}
                alt={`Video ${video.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white space-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <FaHeart className="mr-2" />
                      {video.likes}
                    </div>
                    <div className="flex items-center">
                      <FaComment className="mr-2" />
                      {video.views}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Profile;