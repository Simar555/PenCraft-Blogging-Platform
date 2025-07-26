import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRandomColor, getUserInitials, getTagColor } from '../utils/colors';
import { toggleLike, savePost, unsavePost } from '../store';

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.blog);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

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

  const truncateContent = (htmlContent, maxLength = 150) => {
    // Remove HTML tags and get plain text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleLike = (postId) => {
    if (!isAuthenticated) {
      // Could show login prompt here
      return;
    }
    dispatch(toggleLike({ postId, userId: user.id }));
  };

  const isLiked = (post) => {
    return post.likedBy && post.likedBy.includes(user?.id);
  };

  const isSaved = (post) => {
    return post.savedBy && post.savedBy.includes(user?.id);
  };

  const handleSave = (postId) => {
    if (!isAuthenticated) return;
    const post = posts.find(p => p.id === postId);
    if (isSaved(post)) {
      dispatch(unsavePost({ postId, userId: user.id }));
    } else {
      dispatch(savePost({ postId, userId: user.id }));
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="cursor-target card mb-12 text-center">
          <h1 className="text-5xl font-bold text-gradient mb-4">
            Welcome to PenCraft
          </h1>
          <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
            Discover amazing stories, share your thoughts, and connect with writers from around the world.
          </p>
          {!isAuthenticated && (
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="cursor-target btn-primary"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="cursor-target bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Blog Feed */}
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Latest Posts</h2>
            {isAuthenticated && (
              <Link
                to="/create-post"
                className="cursor-target btn-primary text-sm"
              >
                Write a Post
              </Link>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
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
                    {truncateContent(post.content)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-xs rounded-full border ${getTagColor(tag)}`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

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
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`cursor-target flex items-center space-x-1 transition-all duration-200 hover:scale-105 ${
                          isLiked(post) 
                            ? 'text-red-400 hover:text-red-300' 
                            : 'hover:text-white'
                        }`}
                      >
                        <svg 
                          className="w-4 h-4" 
                          fill={isLiked(post) ? "currentColor" : "none"} 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{post.likes}</span>
                      </button>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{post.comments}</span>
                      </div>
                      <button
                        onClick={() => handleSave(post.id)}
                        className={`cursor-target flex items-center space-x-1 transition-all duration-200 hover:scale-105 ${
                          isSaved(post) 
                            ? 'text-yellow-400 hover:text-yellow-300' 
                            : 'hover:text-white'
                        }`}
                        title={isSaved(post) ? 'Remove from saved' : 'Save post'}
                      >
                        <svg 
                          className="w-4 h-4" 
                          fill={isSaved(post) ? "currentColor" : "none"} 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="cursor-target card mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Share Your Story?
          </h3>
          <p className="text-white/60 mb-6">
            Join our community of writers and start sharing your thoughts with the world.
          </p>
          {isAuthenticated ? (
            <Link
              to="/create-post"
              className="cursor-target btn-primary"
            >
              Write Your First Post
            </Link>
          ) : (
            <Link
              to="/register"
              className="cursor-target btn-primary"
            >
              Join PenCraft
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 