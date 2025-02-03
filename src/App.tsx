import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VideoProvider } from './context/VideoContext';
import Feed from './components/Feed';
import Discover from './components/Discover';
import Upload from './components/Upload';
import Profile from './components/Profile';
import Navigation from './components/Navigation';

function App() {
  const isMobile = window.innerWidth <= 768;

  return (
    <VideoProvider>
      <Router>
        <div className="flex flex-col md:flex-row h-screen bg-black">
          {!isMobile && <Navigation />}
          <main className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          {isMobile && (
            <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
              <Navigation />
            </div>
          )}
        </div>
      </Router>
    </VideoProvider>
  );
}

export default App;