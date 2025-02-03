import React, { createContext, useState, ReactNode } from 'react';

interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  avatar: string;
}

interface Video {
  id: string;
  videoUrl: string;
  username: string;
  description: string;
  likes: string;
  comments: Comment[];
  shares: string;
  avatar: string;
}

interface VideoContextType {
  videos: Video[];
  addVideo: (video: Video) => void;
  toggleLike: (videoId: string, username: string) => void;
  addComment: (videoId: string, comment: Comment) => void;
}

export interface Video {
  id: string;
  videoUrl: string;
  username: string;
  description: string;
  likes: string;
  comments: string;
  shares: string;
  avatar: string;
}

interface VideoContextType {
  videos: Video[];
  addVideo: (video: Video) => void;
}

export const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
      username: '@user1',
      description: '✨ Neon vibes #trending',
      likes: '1.2K',
      comments: '234',
      shares: '45',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1'
    },
    {
      id: '2',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
      username: '@nature_lover',
      description: '🌸 Spring is here! #nature',
      likes: '4.5K',
      comments: '567',
      shares: '89',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nature_lover'
    },
    {
      id: '3',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
      username: '@ocean_views',
      description: '🌊 Ocean waves #relaxing',
      likes: '2.8K',
      comments: '342',
      shares: '67',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ocean_views'
    }
  ]);

  const addVideo = (video: Video) => {
    setVideos((prev) => [video, ...prev]);
  };

  return (
    <VideoContext.Provider value={{ videos, addVideo }}>
      {children}
    </VideoContext.Provider>
  );
};