import React, { useEffect } from 'react';
import { useVideoState } from '../hooks/useVideoState';

interface VideoPlayerProps {
  src: string;
  title: string;
  initialLikes: number;
  initialComments: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  src, 
  title,
  initialLikes,
  initialComments
}) => {
  const {
    likes,
    comments,
    views,
    liked,
    handleLike,
    handleComment,
    handleView
  } = useVideoState(initialLikes, initialComments);

  useEffect(() => {
    handleView();
  }, []);

  return (
    <div className="video-player">
      <video 
        controls
        src={src}
        className="video-element"
      />
      <div className="video-info">
        <h3>{title}</h3>
        <div className="video-stats">
          <button 
            onClick={handleLike}
            className={`like-button ${liked ? 'liked' : ''}`}
          >
            ❤️ {likes}
          </button>
          <button onClick={handleComment}>
            💬 {comments}
          </button>
          <span>👀 {views}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
