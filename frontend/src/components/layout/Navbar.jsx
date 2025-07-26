import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store';
import { getRandomColor, getUserInitials } from '../../utils/colors';
import Notifications from '../common/Notifications';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="cursor-target flex items-center space-x-2">
            <div className="text-2xl font-bold text-gradient">
              PenCraft
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts, users, tags..."
                className="cursor-target w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                style={{ 
                  color: 'white',
                  WebkitTextFillColor: 'white',
                  WebkitAutofill: {
                    WebkitBoxShadow: '0 0 0 1000px rgba(31, 41, 55, 0.8) inset',
                    WebkitTextFillColor: 'white'
                  }
                }}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="cursor-target text-white/80 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="cursor-target text-white/80 hover:text-white transition-colors duration-200"
            >
              Explore
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/create-post"
                  className="cursor-target text-white/80 hover:text-white transition-colors duration-200"
                >
                  Write
                </Link>
                <Link
                  to="/communities"
                  className="cursor-target text-white/80 hover:text-white transition-colors duration-200"
                >
                  Communities
                </Link>

              </>
            )}
          </div>

                                {/* Auth Buttons / User Menu */}
                      <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                          <div className="flex items-center space-x-4">
                            <Notifications />
                            <Link
                              to={`/profile/${user?.id}`}
                              className="cursor-target group"
                            >
                              {/* Profile Circle - Same as Profile page */}
                              <div className={`w-10 h-10 bg-gradient-to-br ${getRandomColor(user?.id)} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                                <span className="text-white font-bold text-sm">
                                  {getUserInitials(user?.firstName, user?.lastName)}
                                </span>
                              </div>
                            </Link>

                          </div>
                        ) : (
                          <>
                            <Link
                              to="/login"
                              className="cursor-target text-white/80 hover:text-white transition-colors duration-200"
                            >
                              Sign In
                            </Link>
                            <Link
                              to="/register"
                              className="cursor-target btn-primary text-sm px-4 py-2"
                            >
                              Get Started
                            </Link>
                          </>
                        )}
                      </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 