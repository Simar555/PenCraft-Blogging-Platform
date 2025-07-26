import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTagColor, getRandomColor, getUserInitials } from '../utils/colors';

const SavedPosts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.blog);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('savedAt');

  // Mock saved posts data (in real app, this would come from user's saved posts)
  const [savedPosts, setSavedPosts] = useState([
    {
      id: 1,
      postId: 1,
      savedAt: '2024-01-20T10:30:00Z',
      post: {
        id: 1,
        title: "Getting Started with React Development",
        content: "React is a powerful JavaScript library for building user interfaces...",
        tags: ['react', 'javascript', 'frontend'],
        category: 'technology',
        author: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe'
        },
        createdAt: '2024-01-15T10:30:00Z',
        likes: 45,
        comments: 12,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
      }
    },
    {
      id: 2,
      postId: 2,
      savedAt: '2024-01-19T15:45:00Z',
      post: {
        id: 2,
        title: "The Art of Mindful Living: A Complete Guide",
        content: "Mindful living is the practice of being fully present in each moment...",
        tags: ['mindfulness', 'lifestyle', 'wellness'],
        category: 'lifestyle',
        author: {
          id: 2,
          firstName: 'Alice',
          lastName: 'Johnson',
          username: 'alicej'
        },
        createdAt: '2024-01-14T12:00:00Z',
        likes: 78,
        comments: 23,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop'
      }
    },
    {
      id: 3,
      postId: 3,
      savedAt: '2024-01-18T09:15:00Z',
      post: {
        id: 3,
        title: "Advanced CSS Grid Techniques",
        content: "CSS Grid is a powerful layout system that allows you to create complex layouts...",
        tags: ['css', 'grid', 'frontend', 'web-design'],
        category: 'technology',
        author: {
          id: 3,
          firstName: 'Bob',
          lastName: 'Smith',
          username: 'bobsmith'
        },
        createdAt: '2024-01-13T14:20:00Z',
        likes: 34,
        comments: 8,
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop'
      }
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'travel', label: 'Travel' },
    { value: 'health', label: 'Health' },
    { value: 'education', label: 'Education' },
    { value: 'business', label: 'Business' },
    { value: 'general', label: 'General' }
  ];

  const sortOptions = [
    { value: 'savedAt', label: 'Recently Saved' },
    { value: 'createdAt', label: 'Post Date' },
    { value: 'title', label: 'Title' },
    { value: 'likes', label: 'Most Liked' },
    { value: 'comments', label: 'Most Commented' }
  ];

  const filteredAndSortedPosts = savedPosts
    .filter(savedPost => {
      const post = savedPost.post;
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      
      // If no search query, only filter by category
      if (!searchQuery.trim()) {
        return matchesCategory;
      }
      
      // Case-insensitive search across multiple fields
      const searchTerm = searchQuery.toLowerCase().trim();
      const postTitle = post.title.toLowerCase();
      const postContent = post.content.toLowerCase();
      const postCategory = post.category.toLowerCase();
      const postTags = post.tags.map(tag => tag.toLowerCase());
      
      const matchesSearch = postTitle.includes(searchTerm) ||
                           postContent.includes(searchTerm) ||
                           postCategory.includes(searchTerm) ||
                           postTags.some(tag => tag.includes(searchTerm));
      
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'savedAt':
          return new Date(b.savedAt) - new Date(a.savedAt);
        case 'createdAt':
          return new Date(b.post.createdAt) - new Date(a.post.createdAt);
        case 'title':
          return a.post.title.localeCompare(b.post.title);
        case 'likes':
          return b.post.likes - a.post.likes;
        case 'comments':
          return b.post.comments - a.post.comments;
        default:
          return 0;
      }
    });

  const handleRemoveSaved = (savedPostId) => {
    setSavedPosts(prev => prev.filter(sp => sp.id !== savedPostId));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const saved = new Date(dateString);
    const diffInHours = Math.floor((now - saved) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="cursor-target card mb-8 text-center">
          <h1 className="text-4xl font-bold text-gradient mb-4">Saved Posts</h1>
          <p className="text-xl text-white/60 mb-6">
            Your personal collection of articles and stories
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-white/60">
            <span>{savedPosts.length} saved posts</span>
            <span>•</span>
            <span>Organize your reading</span>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="cursor-target card mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, content, category, or tags..."
                className="cursor-target w-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="cursor-target bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-target bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Saved Posts Grid */}
        {filteredAndSortedPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedPosts.map((savedPost) => (
              <div key={savedPost.id} className="cursor-target card group hover:scale-105 transition-all duration-300">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={savedPost.post.image}
                    alt={savedPost.post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(savedPost.post.category)}`}>
                      {savedPost.post.category.charAt(0).toUpperCase() + savedPost.post.category.slice(1)}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleRemoveSaved(savedPost.id)}
                      className="p-2 bg-red-500/20 text-red-300 border border-red-500/30 rounded-full hover:bg-red-500/30 transition-colors duration-200"
                      title="Remove from saved"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-black/50 text-white/80 rounded text-xs">
                      Saved {getTimeAgo(savedPost.savedAt)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
                                            <Link to={`/post/${savedPost.post.id}`}>
                          {savedPost.post.title}
                        </Link>
                  </h3>
                  
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                    {savedPost.post.content.substring(0, 120)}...
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {savedPost.post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                    {savedPost.post.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-300 border border-gray-500/30 rounded text-xs">
                        +{savedPost.post.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center space-x-2 pt-2 border-t border-white/10">
                    <div className={`w-6 h-6 bg-gradient-to-br ${getRandomColor(savedPost.post.author.id)} rounded-full flex items-center justify-center`}>
                      <span className="text-xs font-bold text-white">
                        {getUserInitials(savedPost.post.author.firstName, savedPost.post.author.lastName)}
                      </span>
                    </div>
                    <div className="text-xs text-white/60">
                      <span>{savedPost.post.author.firstName} {savedPost.post.author.lastName}</span>
                      <br />
                      <span>{formatDate(savedPost.post.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-white/50 text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{savedPost.post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{savedPost.post.comments}</span>
                      </span>
                    </div>
                    <Link
                      to={`/blog/${savedPost.post.id}`}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="cursor-target card text-center py-12">
            <svg className="w-16 h-16 text-white/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">No saved posts yet</h3>
            <p className="text-white/60 mb-4">
              {searchQuery || selectedCategory !== 'all' 
                ? "No posts match your current filters. Try adjusting your search or filters."
                : "Start saving posts you want to read later by clicking the bookmark icon on any post."
              }
            </p>
            {searchQuery || selectedCategory !== 'all' ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="cursor-target btn-primary"
              >
                Clear Filters
              </button>
            ) : (
              <Link to="/explore" className="cursor-target btn-primary">
                Explore Posts
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPosts; 