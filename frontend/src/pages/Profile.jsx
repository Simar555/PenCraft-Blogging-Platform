import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser, updateProfileStart, updateProfileSuccess, updateProfileFailure, leaveCommunity, joinCommunity, addUserCommunity, removeUserCommunity } from '../store';
import { getRandomColor, getUserInitials, getTagColor } from '../utils/colors';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.blog);
  
  // Mock posts for current user (last 1 week)
  const mockUserPosts = [
    {
      id: 1,
      title: "The Future of AI in Web Development",
      content: "How artificial intelligence is revolutionizing the way we build and maintain web applications...",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop",
      category: "technology",
      likes: 245,
      comments: 42,
      author: { id: user?.id || 1, name: user?.firstName + " " + user?.lastName || "User" },
      createdAt: "2024-01-21"
    },
    {
      id: 2,
      title: "Mastering React Performance Optimization",
      content: "Advanced techniques to optimize React applications for better performance and user experience...",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop",
      category: "technology",
      likes: 178,
      comments: 29,
      author: { id: user?.id || 1, name: user?.firstName + " " + user?.lastName || "User" },
      createdAt: "2024-01-19"
    },
    {
      id: 3,
      title: "Building Scalable Microservices Architecture",
      content: "Complete guide to designing and implementing microservices for large-scale applications...",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop",
      category: "technology",
      likes: 312,
      comments: 56,
      author: { id: user?.id || 1, name: user?.firstName + " " + user?.lastName || "User" },
      createdAt: "2024-01-17"
    },
    {
      id: 4,
      title: "Machine Learning for Developers: Getting Started",
      content: "Introduction to machine learning concepts and how developers can integrate ML into their projects...",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=400&fit=crop",
      category: "technology",
      likes: 198,
      comments: 34,
      author: { id: user?.id || 1, name: user?.firstName + " " + user?.lastName || "User" },
      createdAt: "2024-01-15"
    }
  ];

  // Always use mock posts for now
  const userPosts = mockUserPosts;

  // Get user's joined communities from auth state
  const { communities: allCommunities } = useSelector((state) => state.communities);
  const userJoinedCommunities = allCommunities.filter(community => 
    user?.communities?.includes(community.id)
  );

  // Get user's saved posts
  const { posts: allPosts } = useSelector((state) => state.blog);
  const userSavedPosts = allPosts.filter(post => 
    post.savedBy && post.savedBy.includes(user?.id)
  );
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showLeaveCommunityAlert, setShowLeaveCommunityAlert] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [communityToLeave, setCommunityToLeave] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      technology: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      lifestyle: 'bg-green-500/20 text-green-300 border-green-500/30',
      travel: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      food: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      health: 'bg-red-500/20 text-red-300 border-red-500/30',
      education: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      business: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      general: 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    };
    return colors[category] || colors.general;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setShowLogoutAlert(false);
  };

  const handleDeletePost = (post) => {
    setPostToDelete(post);
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      // Remove post from mockUserPosts
      const updatedPosts = mockUserPosts.filter(post => post.id !== postToDelete.id);
      // In a real app, you would dispatch an action to delete from Redux store
      console.log('Post deleted:', postToDelete.id);
      // For now, we'll just show an alert
      alert('Post deleted successfully!');
      setShowDeleteAlert(false);
      setPostToDelete(null);
    }
  };

  const handleLeaveCommunityClick = (community) => {
    setCommunityToLeave(community);
    setShowLeaveCommunityAlert(true);
  };

  const confirmLeaveCommunity = async () => {
    if (!communityToLeave) return;
    
    try {
      // Dispatch action to leave community
      dispatch(leaveCommunity(communityToLeave.id));
      dispatch(removeUserCommunity(communityToLeave.id));
      
      console.log('Left community from profile:', communityToLeave.id);
      setShowLeaveCommunityAlert(false);
      setCommunityToLeave(null);
    } catch (error) {
      console.error('Error leaving community:', error);
      alert('Failed to leave community. Please try again.');
      setShowLeaveCommunityAlert(false);
      setCommunityToLeave(null);
    }
  };

  const cancelLeaveCommunity = () => {
    setShowLeaveCommunityAlert(false);
    setCommunityToLeave(null);
  };

  const handleJoinCommunity = async (communityId) => {
    try {
      // Dispatch action to join community
      dispatch(joinCommunity(communityId));
      dispatch(addUserCommunity(communityId));
      
      console.log('Joined community from profile:', communityId);
    } catch (error) {
      console.error('Error joining community:', error);
      alert('Failed to join community. Please try again.');
    }
  };

  const LogoutAlert = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="cursor-target card max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Logout Confirmation</h3>
          <p className="text-white/60 mb-6">
            Are you sure you want to logout? You'll need to sign in again to access your account.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowLogoutAlert(false)}
              className="cursor-target flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="cursor-target flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const DeleteAlert = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="cursor-target card max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Delete Post</h3>
          <p className="text-white/60 mb-4">
            Are you sure you want to delete this post?
          </p>
          {postToDelete && (
            <div className="bg-white/5 rounded-lg p-3 mb-6">
              <p className="text-white font-medium text-sm">{postToDelete.title}</p>
              <p className="text-white/60 text-xs mt-1">
                {postToDelete.likes} likes • {postToDelete.comments} comments
              </p>
            </div>
          )}
          <p className="text-white/60 mb-6 text-sm">
            This action cannot be undone. The post will be permanently deleted.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowDeleteAlert(false);
                setPostToDelete(null);
              }}
              className="cursor-target flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="cursor-target flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Delete Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const LeaveCommunityAlert = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="cursor-target card max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Leave Community</h3>
          <p className="text-white/60 mb-6">
            Are you sure you want to leave "{communityToLeave?.name}"? You'll no longer have access to community content.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={cancelLeaveCommunity}
              className="cursor-target flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={confirmLeaveCommunity}
              className="cursor-target flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Leave
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Instagram-style Profile Header */}
        <div className="cursor-target bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Avatar */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-4 border-white/20 shadow-lg">
                <span className="text-3xl font-bold text-white">
                  {user?.firstName?.charAt(0)?.toUpperCase() || ''}{user?.lastName?.charAt(0)?.toUpperCase() || ''}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-0">
                  {user?.firstName} {user?.lastName}
                </h1>
                <div className="flex items-center space-x-3">
                  <Link
                    to="/settings"
                    className="cursor-target bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Settings</span>
                  </Link>
                  <button className="cursor-target bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200">
                    Share Profile
                  </button>
                  <button
                    onClick={() => setShowLogoutAlert(true)}
                    className="cursor-target bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              {/* Instagram-style Stats */}
              <div className="flex items-center space-x-8 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{userPosts.length}</div>
                  <div className="text-white/60 text-sm">posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">1.2K</div>
                  <div className="text-white/60 text-sm">followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">856</div>
                  <div className="text-white/60 text-sm">following</div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-2">
                <p className="text-white font-medium">@{user?.username}</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  {user?.bio || 'No bio yet...'}
                </p>
                <p className="text-white/60 text-sm">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram-style Posts Grid */}
        <div className="cursor-target bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          {/* Tabs Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setActiveTab('posts')}
                className={`cursor-target flex items-center space-x-2 font-medium pb-2 transition-colors duration-200 ${
                  activeTab === 'posts' 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>POSTS</span>
              </button>
              <button 
                onClick={() => setActiveTab('communities')}
                className={`cursor-target flex items-center space-x-2 font-medium pb-2 transition-colors duration-200 ${
                  activeTab === 'communities' 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>COMMUNITIES</span>
              </button>
              <button 
                onClick={() => setActiveTab('saved')}
                className={`cursor-target flex items-center space-x-2 font-medium pb-2 transition-colors duration-200 ${
                  activeTab === 'saved' 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span>SAVED</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'posts' && (
            <>
              {/* Instagram-style Grid */}
              {userPosts.length > 0 ? (
                <div className="grid grid-cols-3 gap-1">
                  {userPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/post/${post.id}`}
                      className="cursor-target group relative aspect-square overflow-hidden hover:opacity-90 transition-opacity duration-200"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Instagram-style Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="flex items-center justify-center space-x-6 text-sm">
                            <div className="flex items-center space-x-1">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              <span className="font-medium">{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              <span className="font-medium">{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>
                      </div>

                      {/* Delete Button */}
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeletePost(post);
                          }}
                          className="cursor-target p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100"
                          title="Delete Post"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No posts yet</h3>
                  <p className="text-white/60 mb-6">When you share photos and videos, they'll appear on your profile.</p>
                  <Link to="/create-post" className="cursor-target bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                    Share Your First Photo
                  </Link>
                </div>
              )}
            </>
          )}

          {activeTab === 'communities' && (
            <>
              {/* Communities Grid */}
              {userJoinedCommunities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userJoinedCommunities.map((community) => (
                    <div key={community.id} className="cursor-target bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300">
                      <div className="relative">
                        <img
                          src={community.image}
                          alt={community.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTagColor(community.category)}`}>
                            {community.category.charAt(0).toUpperCase() + community.category.slice(1)}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full text-xs font-medium">
                            Joined
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-3">
                        <h3 className="text-lg font-bold text-white">
                          <Link to={`/community/${community.id}`} className="hover:text-blue-300 transition-colors duration-200">
                            {community.name}
                          </Link>
                        </h3>
                        
                        <p className="text-white/60 text-sm leading-relaxed">
                          {community.description}
                        </p>

                        <div className="flex items-center justify-between text-white/50 text-sm">
                          <span>{community.members.toLocaleString()} members</span>
                          <span>{community.posts} posts</span>
                        </div>

                        <button
                          onClick={() => handleLeaveCommunityClick(community)}
                          className="cursor-target w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                        >
                          Leave Community
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No communities joined</h3>
                  <p className="text-white/60 mb-6">Join communities to connect with like-minded people.</p>
                  <Link to="/communities" className="cursor-target bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                    Explore Communities
                  </Link>
                </div>
              )}
            </>
          )}

          {activeTab === 'saved' && (
            <>
              {userSavedPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {userSavedPosts.map((post) => (
                    <article key={post.id} className="cursor-target card group hover:scale-105 transition-all duration-300">
                      {/* Post Image */}
                      <div className="relative mb-4 overflow-hidden rounded-lg">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
                          <Link to={`/post/${post.id}`}>
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="text-white/60 text-sm leading-relaxed">
                          {post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}
                        </p>

                        {/* Post Meta */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center space-x-2">
                            <div className={`w-8 h-8 bg-gradient-to-br ${getRandomColor(post.author.id)} rounded-full flex items-center justify-center`}>
                              <span className="text-xs font-bold text-white">
                                {getUserInitials(post.author.firstName, post.author.lastName)}
                              </span>
                            </div>
                            <div>
                              <p className="text-white/80 text-sm font-medium">
                                {post.author.firstName} {post.author.lastName}
                              </p>
                              <p className="text-white/50 text-xs">
                                {formatDate(post.createdAt)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-white/50 text-sm">
                            <div className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No saved posts</h3>
                  <p className="text-white/60 mb-6">Posts you save will appear here.</p>
                  <Link to="/explore" className="cursor-target bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                    Explore Posts
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Alert Dialogs */}
      {showLogoutAlert && <LogoutAlert />}
      {showDeleteAlert && <DeleteAlert />}
      {showLeaveCommunityAlert && <LeaveCommunityAlert />}
    </div>
  );
};

export default Profile; 