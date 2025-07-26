import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './contexts/ThemeContext';
import MagicBackground from './components/common/MagicBackground';
import TargetCursor from './components/common/TargetCursor';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CreatePost from './pages/blog/CreatePost';
import BlogPost from './pages/blog/BlogPost';
import CreateCommunity from './pages/CreateCommunity';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Communities from './pages/Communities';
import SavedPosts from './pages/SavedPosts';
import Search from './pages/Search';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';

// Global styles
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <div className="App relative min-h-screen">
            {/* Background Effects */}
            <MagicBackground />

            {/* Target Cursor */}
            <TargetCursor
              spinDuration={2}
              hideDefaultCursor={false}
            />

            {/* Main Content */}
            <div className="relative" style={{ zIndex: 10 }}>
              <Layout>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/post/:id" element={<BlogPost />} />

                  {/* Protected Routes */}
                  <Route
                    path="/create-post"
                    element={
                      <ProtectedRoute>
                        <CreatePost />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile/:id"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                                    <Route
                    path="/communities"
                    element={
                      <ProtectedRoute>
                        <Communities />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/create-community"
                    element={
                      <ProtectedRoute>
                        <CreateCommunity />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/saved"
                    element={
                      <ProtectedRoute>
                        <SavedPosts />
                      </ProtectedRoute>
                    }
                  />
                              <Route
                                path="/settings"
                                element={
                                  <ProtectedRoute>
                                    <Settings />
                                  </ProtectedRoute>
                                }
                              />
                </Routes>
              </Layout>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 