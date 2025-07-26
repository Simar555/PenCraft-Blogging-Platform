import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRandomColor, getUserInitials, getTagColor } from '../utils/colors';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { posts } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedFilter, setSelectedFilter] = useState(searchParams.get('filter') || 'all');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'travel', label: 'Travel' },
    { value: 'food', label: 'Food' },
    { value: 'health', label: 'Health' },
    { value: 'education', label: 'Education' },
    { value: 'business', label: 'Business' },
    { value: 'general', label: 'General' }
  ];

  const filters = [
    { value: 'all', label: 'All Results' },
    { value: 'posts', label: 'Posts Only' },
    { value: 'users', label: 'Users Only' },
    { value: 'tags', label: 'Tags Only' }
  ];

  // Mock users for search
  const mockUsers = [
    { id: 1, firstName: 'John', lastName: 'Doe', username: 'johndoe', bio: 'React developer and tech enthusiast' },
    { id: 2, firstName: 'Sarah', lastName: 'Wilson', username: 'sarahw', bio: 'Mindfulness coach and wellness advocate' },
    { id: 3, firstName: 'Mike', lastName: 'Chen', username: 'mikechen', bio: 'Travel blogger and adventure seeker' },
    { id: 4, firstName: 'Dr. Emily', lastName: 'Rodriguez', username: 'emilyrod', bio: 'Healthcare AI researcher and medical professional' }
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, selectedCategory, selectedFilter]);

  const performSearch = async () => {
    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let results = [];
    const query = searchQuery.toLowerCase().trim();

    if (selectedFilter === 'all' || selectedFilter === 'posts') {
      const postResults = posts.filter(post => {
        const matchesQuery = 
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query)) ||
          post.author.firstName.toLowerCase().includes(query) ||
          post.author.lastName.toLowerCase().includes(query);
        
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        
        return matchesQuery && matchesCategory;
      });
      
      results.push(...postResults.map(post => ({ ...post, type: 'post' })));
    }

    if (selectedFilter === 'all' || selectedFilter === 'users') {
      const userResults = mockUsers.filter(user => {
        return (
          user.firstName.toLowerCase().includes(query) ||
          user.lastName.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query) ||
          user.bio.toLowerCase().includes(query)
        );
      });
      
      results.push(...userResults.map(user => ({ ...user, type: 'user' })));
    }

    if (selectedFilter === 'all' || selectedFilter === 'tags') {
      const tagResults = posts.filter(post => 
        post.tags.some(tag => tag.toLowerCase().includes(query))
      ).map(post => ({
        type: 'tag',
        tag: post.tags.find(tag => tag.toLowerCase().includes(query)),
        postCount: posts.filter(p => p.tags.includes(post.tags.find(tag => tag.toLowerCase().includes(query)))).length
      }));
      
      // Remove duplicates
      const uniqueTags = tagResults.filter((result, index, self) => 
        index === self.findIndex(r => r.tag === result.tag)
      );
      
      results.push(...uniqueTags);
    }

    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({
      q: searchQuery,
      category: selectedCategory,
      filter: selectedFilter
    });
  };

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
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Search Header */}
        <div className="cursor-target card mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-4">Search</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, content, author, or tags..."
                className="cursor-target w-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                style={{ 
                  color: 'white',
                  WebkitTextFillColor: 'white',
                  WebkitAutofill: {
                    WebkitBoxShadow: '0 0 0 1000px rgba(31, 41, 55, 0.8) inset',
                    WebkitTextFillColor: 'white'
                  }
                }}
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="cursor-target bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="cursor-target bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              >
                {filters.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="cursor-target btn-primary"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        <div className="space-y-6">
          {searchQuery && (
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                Search Results ({searchResults.length})
              </h2>
              {isSearching && (
                <div className="flex items-center space-x-2 text-white/60">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Searching...</span>
                </div>
              )}
            </div>
          )}

          {searchQuery && !isSearching && searchResults.length === 0 && (
            <div className="cursor-target card text-center py-12">
              <svg className="w-16 h-16 text-white/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
              <p className="text-white/60">Try adjusting your search terms or filters</p>
            </div>
          )}

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((result, index) => (
              <div key={`${result.type}-${result.id || index}`} className="cursor-target card group hover:scale-105 transition-all duration-300">
                {result.type === 'post' && (
                  <>
                    {/* Post Image */}
                    <div className="relative mb-4 overflow-hidden rounded-lg">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(result.category)}`}>
                          {result.category.charAt(0).toUpperCase() + result.category.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
                        <Link to={`/post/${result.id}`}>
                          {result.title}
                        </Link>
                      </h3>
                      
                      <p className="text-white/60 text-sm leading-relaxed">
                        {truncateContent(result.content)}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {result.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`px-2 py-1 text-xs rounded-full border ${getTagColor(tag)}`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Post Meta */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center space-x-2">
                          <div className={`w-8 h-8 bg-gradient-to-br ${getRandomColor(result.author.id)} rounded-full flex items-center justify-center`}>
                            <span className="text-xs font-bold text-white">
                              {getUserInitials(result.author.firstName, result.author.lastName)}
                            </span>
                          </div>
                          <div>
                            <p className="text-white/80 text-sm font-medium">
                              {result.author.firstName} {result.author.lastName}
                            </p>
                            <p className="text-white/50 text-xs">
                              {formatDate(result.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {result.type === 'user' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${getRandomColor(result.id)} rounded-full flex items-center justify-center`}>
                        <span className="text-xl font-bold text-white">
                          {getUserInitials(result.firstName, result.lastName)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {result.firstName} {result.lastName}
                        </h3>
                        <p className="text-white/60">@{result.username}</p>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">{result.bio}</p>
                    <Link
                      to={`/profile/${result.id}`}
                      className="cursor-target inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      View Profile
                    </Link>
                  </div>
                )}

                {result.type === 'tag' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-blue-300">#</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          #{result.tag}
                        </h3>
                        <p className="text-white/60 text-sm">{result.postCount} posts</p>
                      </div>
                    </div>
                    <button className="cursor-target w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                      View Posts
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search; 