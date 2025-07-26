import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart, registerSuccess, registerFailure } from '../../store';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      dispatch(registerFailure('Passwords do not match'));
      return;
    }

    try {
      dispatch(registerStart());
      
      // Mock API call - replace with actual API
      const response = await mockRegisterAPI(formData);
      
      dispatch(registerSuccess({
        user: response.user,
        token: response.token
      }));
      
      navigate('/');
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };

  // Mock API function
  const mockRegisterAPI = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate validation
        if (!userData.email || !userData.password || !userData.username) {
          reject(new Error('All fields are required'));
          return;
        }
        
        resolve({
          user: {
            id: Date.now(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            username: userData.username,
            communities: [] // New users start with no communities
          },
          token: 'mock-jwt-token-' + Date.now()
        });
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="cursor-target card">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gradient mb-2">
              Join PenCraft
            </h2>
            <p className="text-white/60">
              Create your account and start writing
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-white/80 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="cursor-target bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-full transition-all duration-300"
                    placeholder="First name"
                    style={{ 
                      color: 'white',
                      WebkitTextFillColor: 'white',
                      WebkitAutofill: {
                        WebkitBoxShadow: '0 0 0 1000px rgba(31, 41, 55, 0.8) inset',
                        WebkitTextFillColor: 'white'
                      }
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-white/80 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="cursor-target bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-full transition-all duration-300"
                    placeholder="Last name"
                    style={{ 
                      color: 'white',
                      WebkitTextFillColor: 'white',
                      WebkitAutofill: {
                        WebkitBoxShadow: '0 0 0 1000px rgba(31, 41, 55, 0.8) inset',
                        WebkitTextFillColor: 'white'
                      }
                    }}
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="cursor-target bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-full transition-all duration-300"
                  placeholder="Choose a username"
                  style={{ 
                    color: 'white',
                    WebkitTextFillColor: 'white',
                    WebkitAutofill: {
                      WebkitBoxShadow: '0 0 0 1000px rgba(31, 41, 55, 0.8) inset',
                      WebkitTextFillColor: 'white'
                    }
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="cursor-target bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-full transition-all duration-300"
                  placeholder="Enter your email"
                  style={{ 
                    color: 'white',
                    WebkitTextFillColor: 'white',
                    WebkitAutofill: {
                      WebkitBoxShadow: '0 0 0 1000px rgba(31, 41, 55, 0.8) inset',
                      WebkitTextFillColor: 'white'
                    }
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="cursor-target bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-full transition-all duration-300"
                  placeholder="Create a password"
                  style={{ 
                    color: 'white',
                    WebkitTextFillColor: 'white',
                    WebkitAutofill: {
                      WebkitBoxShadow: '0 0 0 1000px rgba(31, 41, 55, 0.8) inset',
                      WebkitTextFillColor: 'white'
                    }
                  }}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="cursor-target bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-full transition-all duration-300"
                  placeholder="Confirm your password"
                  style={{ 
                    color: 'white',
                    WebkitTextFillColor: 'white',
                    WebkitAutofill: {
                      WebkitBoxShadow: '0 0 0 1000px rgba(31, 41, 55, 0.8) inset',
                      WebkitTextFillColor: 'white'
                    }
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-target btn-primary w-full flex justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="text-center">
              <p className="text-white/60">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="cursor-target text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 