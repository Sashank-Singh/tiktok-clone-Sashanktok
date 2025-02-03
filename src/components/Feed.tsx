import React, { useState, useRef, useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoContext, Video } from '../context/VideoContext';

interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  avatar: string;
}

interface VideoCardProps {
  video: Video;
}

function VideoCard({ video }: VideoCardProps) {
  const { toggleLike, addComment } = useContext(VideoContext)!;
  const [isPlaying, setIsPlaying] = useState(false);
  const [fixedAspect, setFixedAspect] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [likeCount, setLikeCount] = useState(parseInt(video.likes) || 0);
  const [isLiked, setIsLiked] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({ threshold: 0.7 });

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {}); // Handle playback error
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    toggleLike(video.id, '@currentUser'); // Replace with actual user ID in production
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      username: '@currentUser', // Replace with real data
      text: newComment,
      timestamp: 'Just now',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=currentUser`
    };
    addComment(video.id, comment);
    setNewComment('');
  };

  useEffect(() => {
    if (!videoRef.current) return;
    if (inView) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [inView]);

  return (
    <div ref={ref} className="relative h-screen w-full snap-start bg-black">
      <video
        ref={videoRef}
        src={video.videoUrl}
        className={`absolute inset-0 w-full h-full ${fixedAspect ? 'object-contain' : 'object-cover'}`}
        loop
        playsInline
        muted={false}
        onClick={togglePlay}
      />

      {/* Play/Pause Indicator */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-black/50 rounded-full p-6">
              <i className="fas fa-play text-white text-4xl"></i>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Info Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-0 left-0 p-4 z-10 w-full bg-gradient-to-t from-black/60 to-transparent"
      >
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={video.avatar}
            alt={video.username}
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <div>
            <h3 className="text-white font-bold text-lg">{video.username}</h3>
            <p className="text-white/80 text-sm">{video.description}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="ml-auto bg-pink-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold"
          >
            Follow
          </motion.button>
        </div>
      </motion.div>

      {/* Comments Overlay */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-sm p-4 z-20"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-bold">Comments</h3>
              <button onClick={() => setShowComments(false)} className="text-white hover:text-pink-500">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleAddComment} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  type="submit"
                  className="bg-pink-500 text-white rounded-full px-4 py-2 text-sm hover:bg-pink-600 transition-colors"
                >
                  Post
                </button>
              </div>
            </form>

            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {video.comments.map((comment: Comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <img
                    src={comment.avatar}
                    alt={comment.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">{comment.username}</span>
                      <span className="text-gray-400 text-xs">{comment.timestamp}</span>
                    </div>
                    <p className="text-white text-sm">{comment.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interaction Buttons */}
      <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="group relative"
        >
          <div className="bg-black/20 rounded-full p-3 backdrop-blur-sm">
            <i className={`fas fa-heart text-3xl ${isLiked ? 'text-pink-500' : 'text-white'}`}></i>
          </div>
          <span className="block text-white text-xs mt-1">{likeCount}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowComments(true)}
          className="group relative"
        >
          <div className="bg-black/20 rounded-full p-3 backdrop-blur-sm">
            <i className="fas fa-comment-dots text-3xl text-white"></i>
          </div>
          <span className="block text-white text-xs mt-1">{video.comments.length}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="group relative"
        >
          <div className="bg-black/20 rounded-full p-3 backdrop-blur-sm">
            <i className="fas fa-share text-3xl text-white"></i>
          </div>
          <span className="block text-white text-xs mt-1">{video.shares}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setFixedAspect(!fixedAspect)}
          className="group relative"
        >
          <div className="bg-black/20 rounded-full p-3 backdrop-blur-sm">
            <i className={`fas fa-arrows-alt text-3xl ${fixedAspect ? 'text-green-500' : 'text-white'}`}></i>
          </div>
          <span className="block text-white text-xs mt-1">Fit</span>
        </motion.button>
      </div>
    </div>
  );
}

function Feed() {
  const { videos, fetchMoreVideos, hasMore, loading } = useContext(VideoContext)!;
  const { ref: loadMoreRef, inView: loadMoreInView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (loadMoreInView && hasMore && !loading) {
      fetchMoreVideos();
    }
  }, [loadMoreInView, hasMore, loading, fetchMoreVideos]);

  return (
    <div className="relative h-screen">
      <div className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}

        {/* Infinite Scroll Sentinel */}
        {hasMore && (
          <div ref={loadMoreRef} className="w-full h-20 flex items-center justify-center">
            <span className="text-white">Loading more videos...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;