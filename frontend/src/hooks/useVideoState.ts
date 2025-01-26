import { useState } from 'react';

interface VideoState {
  likes: number;
  comments: number;
  views: number;
  liked: boolean;
}

export const useVideoState = (initialLikes: number, initialComments: number) => {
  const [state, setState] = useState<VideoState>({
    likes: initialLikes,
    comments: initialComments,
    views: 0,
    liked: false
  });

  const handleLike = () => {
    setState(prev => ({
      ...prev,
      likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
      liked: !prev.liked
    }));
  };

  const handleComment = () => {
    setState(prev => ({
      ...prev,
      comments: prev.comments + 1
    }));
  };

  const handleView = () => {
    setState(prev => ({
      ...prev,
      views: prev.views + 1
    }));
  };

  return {
    ...state,
    handleLike,
    handleComment,
    handleView
  };
};
