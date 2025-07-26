import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTagColor, getRandomColor, getUserInitials } from '../utils/colors';

const Explore = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.blog);
  const { communities } = useSelector((state) => state.communities);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('trending');

  // Mock trending posts data
  const [trendingPosts, setTrendingPosts] = useState([
    {
      id: 1,
      title: "The Future of AI in Web Development",
      content: "Artificial intelligence is revolutionizing how we build and maintain web applications. From automated testing to intelligent code generation, AI is becoming an integral part of modern development workflows...",
      tags: ['ai', 'web-development', 'technology', 'future'],
      category: 'technology',
      author: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe'
      },
      createdAt: '2024-01-20T10:30:00Z',
      likes: 1245,
      comments: 89,
      views: 15420,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      trendingScore: 95
    },
    {
      id: 2,
      title: "Mindful Living: A Complete Guide to Present Moment Awareness",
      content: "In our fast-paced world, finding moments of peace and presence has become more important than ever. This comprehensive guide explores various mindfulness techniques...",
      tags: ['mindfulness', 'lifestyle', 'wellness', 'mental-health'],
      category: 'lifestyle',
      author: {
        id: 2,
        firstName: 'Alice',
        lastName: 'Johnson',
        username: 'alicej'
      },
      createdAt: '2024-01-19T15:45:00Z',
      likes: 892,
      comments: 67,
      views: 12340,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
      trendingScore: 87
    },
    {
      id: 3,
      title: "Advanced CSS Grid: Building Complex Layouts",
      content: "CSS Grid has transformed the way we approach web layouts. This deep dive explores advanced techniques for creating complex, responsive designs...",
      tags: ['css', 'grid', 'frontend', 'web-design'],
      category: 'technology',
      author: {
        id: 3,
        firstName: 'Bob',
        lastName: 'Smith',
        username: 'bobsmith'
      },
      createdAt: '2024-01-18T14:20:00Z',
      likes: 567,
      comments: 34,
      views: 8920,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      trendingScore: 78
    },
    {
      id: 4,
      title: "Sustainable Travel: Exploring the World Responsibly",
      content: "Travel doesn't have to come at the expense of our planet. Discover eco-friendly travel options and sustainable tourism practices...",
      tags: ['travel', 'sustainability', 'eco-friendly', 'tourism'],
      category: 'travel',
      author: {
        id: 4,
        firstName: 'Emma',
        lastName: 'Wilson',
        username: 'emmaw'
      },
      createdAt: '2024-01-17T11:15:00Z',
      likes: 734,
      comments: 45,
      views: 10560,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
      trendingScore: 82
    },
    {
      id: 5,
      title: "The Science of Productivity: Working Smarter, Not Harder",
      content: "Productivity isn't about working longer hours—it's about working more efficiently. Learn evidence-based strategies to boost your productivity...",
      tags: ['productivity', 'science', 'work', 'efficiency'],
      category: 'business',
      author: {
        id: 5,
        firstName: 'David',
        lastName: 'Brown',
        username: 'davidb'
      },
      createdAt: '2024-01-16T09:30:00Z',
      likes: 456,
      comments: 28,
      views: 6780,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      trendingScore: 71
    },
    {
      id: 6,
      title: "Plant-Based Nutrition: A Beginner's Guide",
      content: "Transitioning to a plant-based diet can seem overwhelming, but it doesn't have to be. This guide breaks down everything you need to know...",
      tags: ['nutrition', 'plant-based', 'health', 'diet'],
      category: 'health',
      author: {
        id: 6,
        firstName: 'Sarah',
        lastName: 'Davis',
        username: 'sarahd'
      },
      createdAt: '2024-01-15T16:45:00Z',
      likes: 623,
      comments: 41,
      views: 9450,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=400&fit=crop',
      trendingScore: 75
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Categories', icon: '🌐' },
    { value: 'technology', label: 'Technology', icon: '💻' },
    { value: 'lifestyle', label: 'Lifestyle', icon: '🌟' },
    { value: 'travel', label: 'Travel', icon: '✈️' },
    { value: 'health', label: 'Health', icon: '🏥' },
    { value: 'education', label: 'Education', icon: '📚' },
    { value: 'business', label: 'Business', icon: '💼' },
    { value: 'general', label: 'General', icon: '📰' }
  ];

  const timeframes = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const sortOptions = [
    { value: 'trending', label: 'Trending' },
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'views', label: 'Most Viewed' }
  ];

  const filteredAndSortedPosts = trendingPosts
    .filter(post => {
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
        case 'trending':
          return b.trendingScore - a.trendingScore;
        case 'latest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'popular':
          return b.likes - a.likes;
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTrendingBadge = (score) => {
    if (score >= 90) return { text: '🔥 Hot', color: 'bg-red-500/20 text-red-300 border-red-500/30' };
    if (score >= 80) return { text: '📈 Trending', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' };
    if (score >= 70) return { text: '⭐ Popular', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' };
    return { text: '📊 Rising', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="cursor-target card mb-8 text-center">
          <h1 className="text-4xl font-bold text-gradient mb-4">Explore Stories</h1>
          <p className="text-xl text-white/60 mb-6">
            Discover trending content and amazing stories from our community
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-white/60">
            <span>🔥 Trending now</span>
            <span>•</span>
            <span>📈 Popular posts</span>
            <span>•</span>
            <span>🌟 Fresh content</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="cursor-target card mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`cursor-target px-4 py-2 rounded-full border transition-all duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                    : 'bg-white/5 text-white/60 border-white/20 hover:bg-white/10 hover:text-white/80'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
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
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="cursor-target bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            >
              {timeframes.map(timeframe => (
                <option key={timeframe.value} value={timeframe.value}>
                  {timeframe.label}
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

        {/* Trending Posts Grid */}
        {filteredAndSortedPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedPosts.map((post, index) => {
              const trendingBadge = getTrendingBadge(post.trendingScore);
              return (
                <div key={post.id} className="cursor-target card group hover:scale-105 transition-all duration-300">
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(post.category)}`}>
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${trendingBadge.color}`}>
                        {trendingBadge.text}
                      </span>
                    </div>
                    {index < 3 && (
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full text-xs font-medium">
                          #{index + 1} Trending
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
                                              <Link to={`/post/${post.id}`}>
                          {post.title}
                        </Link>
                    </h3>
                    
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                      {post.content.substring(0, 120)}...
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-300 border border-gray-500/30 rounded text-xs">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center space-x-2 pt-2 border-t border-white/10">
                      <div className={`w-6 h-6 bg-gradient-to-br ${getRandomColor(post.author.id)} rounded-full flex items-center justify-center`}>
                        <span className="text-xs font-bold text-white">
                          {getUserInitials(post.author.firstName, post.author.lastName)}
                        </span>
                      </div>
                      <div className="text-xs text-white/60">
                        <span>{post.author.firstName} {post.author.lastName}</span>
                        <br />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-white/50 text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{formatNumber(post.likes)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span>{formatNumber(post.comments)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>{formatNumber(post.views)}</span>
                        </span>
                      </div>
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="cursor-target card text-center py-12">
            <svg className="w-16 h-16 text-white/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">No stories found</h3>
            <p className="text-white/60 mb-4">
              {searchQuery || selectedCategory !== 'all' 
                ? "No posts match your current filters. Try adjusting your search or filters."
                : "Check back later for new trending stories!"
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
              <Link to="/communities" className="cursor-target btn-primary">
                Explore Communities
              </Link>
            )}
          </div>
        )}

        {/* Featured Communities Section */}
        <div className="mt-16">
          <div className="cursor-target card mb-8 text-center">
            <h2 className="text-3xl font-bold text-gradient mb-4">Discover Communities</h2>
            <p className="text-white/60">Join communities and connect with like-minded people</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.slice(0, 6).map((community) => (
              <div key={community.id} className="cursor-target card group hover:scale-105 transition-all duration-300">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(community.category)}`}>
                      {community.category.charAt(0).toUpperCase() + community.category.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
                    <Link to={`/community/${community.id}`}>
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

                  <Link
                    to={`/community/${community.id}`}
                    className="cursor-target w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-center block"
                  >
                    Explore Community
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore; 