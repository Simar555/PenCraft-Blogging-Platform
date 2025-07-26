import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: 'test@gmail.com',
    password: 'test123',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(loginStart());
      
      // Mock API call - replace with actual API
      const response = await mockLoginAPI(formData);
      
      dispatch(loginSuccess({
        user: response.user,
        token: response.token
      }));
      
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  // Mock API function
  const mockLoginAPI = async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'test@gmail.com' && credentials.password === 'test123') {
          resolve({
            user: {
              id: 1,
              firstName: 'Test',
              lastName: 'User',
              email: credentials.email,
              username: 'testuser',
              communities: [1, 3] // User is already part of React Developers and Travel Enthusiasts
            },
            token: 'mock-jwt-token-123'
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="cursor-target card">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gradient mb-2">
              Welcome Back
            </h2>
            <p className="text-white/60">
              Sign in to your PenCraft account
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                  placeholder="Enter your password"
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
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="text-center">
              <p className="text-white/60">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="cursor-target text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 