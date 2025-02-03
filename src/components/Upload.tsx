import React, { useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoContext } from '../context/VideoContext';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';

function Upload() {
  // Assume that currentUser is provided by your VideoContext.
  // Replace with your actual user context if needed.
  const { addVideo, currentUser } = useContext(VideoContext)!;
  const navigate = useNavigate();

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setVideoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxSize: 500 * 1024 * 1024, // 500MB
    multiple: false
  });

  const simulateUpload = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        completeUpload();
      }
    }, 100);
  };

  const completeUpload = () => {
    if (!videoFile) {
      alert('Please provide a video file.');
      return;
    }
    // Use the current user's username directly.
    const username = currentUser;
    const videoUrl = URL.createObjectURL(videoFile);
    const newVideo = {
      id: Date.now().toString(),
      videoUrl,
      username: `@${username}`,
      description,
      likes: '0',
      comments: '0',
      shares: '0',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
    };
    addVideo(newVideo);
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulateUpload();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 p-4"
    >
      <div className="bg-gray-800 p-8 rounded-3xl max-w-md w-full shadow-2xl border border-gray-700 backdrop-blur-lg bg-opacity-90">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl text-white mb-8 text-center font-bold"
        >
          Share Your Creation
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center border-2 border-dashed ${
                isDragActive ? 'border-pink-500' : 'border-gray-600'
              } rounded-2xl p-8 w-full cursor-pointer hover:border-pink-500 transition-all duration-300 group`}
            >
              <input {...getInputProps()} />
              {preview ? (
                <div className="w-full rounded-xl overflow-hidden relative group">
                  <video 
                    src={preview} 
                    className="w-full h-64 object-cover rounded-xl" 
                    controls 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={() => setPreview(null)}
                      className="text-white bg-pink-600 px-4 py-2 rounded-full hover:bg-pink-700 transition-colors"
                    >
                      Replace Video
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <i className="fas fa-cloud-upload-alt text-6xl text-gray-400 mb-4"></i>
                  <p className="text-gray-300">
                    {isDragActive ? 
                      "Drop your video here!" : 
                      "Drag & drop your video or click to browse"
                    }
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    MP4, MOV, AVI (max 500MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {/* Removed username input since currentUser is used automatically */}
            <div className="relative">
              <textarea 
                placeholder="Video Description (optional)" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                maxLength={150}
                className="w-full p-4 rounded-2xl bg-gray-700 text-white placeholder-gray-400 border-2 border-gray-600 focus:border-pink-500 focus:outline-none transition-all duration-300 resize-none"
              />
              <span className="absolute bottom-2 right-4 text-gray-400 text-sm">
                {150 - description.length} characters left
              </span>
            </div>
          </div>

          {isUploading && (
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <motion.div 
                className="bg-pink-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}

          <motion.button 
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isUploading || !videoFile}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
          >
            {isUploading ? (
              <>
                <i className="fas fa-spinner animate-spin"></i>
                Uploading... {uploadProgress}%
              </>
            ) : (
              <>
                <i className="fas fa-cloud-upload-alt"></i>
                Upload Video
              </>
            )}
          </motion.button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          By uploading, you agree to our Terms of Service
        </p>
      </div>
    </motion.div>
  );
}

export default Upload;