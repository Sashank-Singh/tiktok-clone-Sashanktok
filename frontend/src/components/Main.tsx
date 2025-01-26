import React from 'react';
import VideoPlayer from './VideoPlayer';

const sampleVideos = [
  {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Sample Video 1',
    initialLikes: 123,
    initialComments: 45
  },
  {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Sample Video 2',
    initialLikes: 456,
    initialComments: 78
  }
];

const Main: React.FC = () => {
  return (
    <main className="main-content">
      <div className="video-feed">
        {sampleVideos.map((video, index) => (
          <VideoPlayer
            key={index}
            src={video.src}
            title={video.title}
            initialLikes={video.initialLikes}
            initialComments={video.initialComments}
          />
        ))}
      </div>
    </main>
  );
};

export default Main;
