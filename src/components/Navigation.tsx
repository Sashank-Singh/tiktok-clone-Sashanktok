import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-64 h-screen bg-gray-900 text-white p-6 border-r border-gray-800 flex flex-col justify-between rounded-lg">
      <div>
        <h1 className="text-3xl font-bold mb-10 text-center">SashankTok</h1>
        <ul className="space-y-6">
          <li className="rounded-full hover:bg-gray-800 transition-colors duration-200">
            <Link
              to="/"
              className={`flex items-center space-x-4 p-3 ${
                isActive('/') && 'bg-gray-800 border-l-4 border-pink-500 rounded-full'
              } transition-colors duration-200`}
            >
              <i className={`fas fa-home text-xl ${isActive('/') ? 'text-pink-500' : 'text-white'}`}></i>
              <span className={`text-lg ${isActive('/') ? 'font-semibold' : 'font-normal'}`}>Home</span>
            </Link>
          </li>
          <li className="rounded-full hover:bg-gray-800 transition-colors duration-200">
            <Link
              to="/discover"
              className={`flex items-center space-x-4 p-3 ${
                isActive('/discover') && 'bg-gray-800 border-l-4 border-pink-500 rounded-full'
              } transition-colors duration-200`}
            >
              <i
                className={`fas fa-compass text-xl ${isActive('/discover') ? 'text-pink-500' : 'text-white'}`}
              ></i>
              <span className={`text-lg ${isActive('/discover') ? 'font-semibold' : 'font-normal'}`}>Discover</span>
            </Link>
          </li>
          <li className="rounded-full hover:bg-gray-800 transition-colors duration-200">
            <Link
              to="/upload"
              className={`flex items-center space-x-4 p-3 ${
                isActive('/upload') && 'bg-gray-800 border-l-4 border-pink-500 rounded-full'
              } transition-colors duration-200`}
            >
              <i className={`fas fa-upload text-xl ${isActive('/upload') ? 'text-pink-500' : 'text-white'}`}></i>
              <span className={`text-lg ${isActive('/upload') ? 'font-semibold' : 'font-normal'}`}>Upload</span>
            </Link>
          </li>
          <li className="rounded-full hover:bg-gray-800 transition-colors duration-200">
            <Link
              to="/profile"
              className={`flex items-center space-x-4 p-3 ${
                isActive('/profile') && 'bg-gray-800 border-l-4 border-pink-500 rounded-full'
              } transition-colors duration-200`}
            >
              <i className={`fas fa-user text-xl ${isActive('/profile') ? 'text-pink-500' : 'text-white'}`}></i>
              <span className={`text-lg ${isActive('/profile') ? 'font-semibold' : 'font-normal'}`}>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">SUGGESTED ACCOUNTS</h2>
        <div className="space-y-4">
          <div className="bg-gray-800 p-3 rounded-lg shadow-md flex items-center space-x-3">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=creator1`} 
              alt="Creator 1" 
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-bold">Creator</p>
              <p className="text-gray-400">@creator1</p>
              <p className="text-gray-300">Creator Name</p>
            </div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg shadow-md flex items-center space-x-3">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=creator2`} 
              alt="Creator 2" 
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-bold">Creator</p>
              <p className="text-gray-400">@creator2</p>
              <p className="text-gray-300">Creator Name</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-gray-400 text-sm">About | Help | Terms</p>
          <p className="text-gray-400 text-sm">© 2025 Sashank Singh.</p> 
        </div>
      </div>
    </nav>
  );
}

export default Navigation;