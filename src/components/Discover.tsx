import React, { useContext } from 'react';
import { VideoContext } from '../context/VideoContext';

function Discover() {
  const { videos } = useContext(VideoContext)!;

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white mb-4">Discover</h1>
      {videos.length === 0 ? (
        <p className="text-gray-400">No videos available.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="relative group">
              <video 
                src={video.videoUrl} 
                className="aspect-[9/16] w-full rounded-lg object-cover"
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-lg flex items-center justify-center transition">
                <i className="fas fa-play text-white text-2xl opacity-0 group-hover:opacity-100"></i>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Discover;