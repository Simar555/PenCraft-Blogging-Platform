import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { joinCommunity, leaveCommunity, addUserCommunity, removeUserCommunity } from '../store';
import { getRandomColor, getUserInitials, getTagColor } from '../utils/colors';

const Communities = () => {
  const dispatch = useDispatch();
  const { communities } = useSelector((state) => state.communities);
  const { user } = useSelector((state) => state.auth);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showJoinLeaveModal, setShowJoinLeaveModal] = useState(false);
  const [communityToAction, setCommunityToAction] = useState(null);
  const [actionType, setActionType] = useState(''); // 'join' or 'leave'

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

  // Add isJoined property based on user's communities
  const communitiesWithJoinStatus = communities.map(community => ({
    ...community,
    isJoined: user?.communities?.includes(community.id) || false
  }));

  const filteredCommunities = communitiesWithJoinStatus.filter(community => {
    const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory;
    
    // If no search query, only filter by category
    if (!searchQuery.trim()) {
      return matchesCategory;
    }
    
    // Case-insensitive search across multiple fields
    const searchTerm = searchQuery.toLowerCase().trim();
    const communityName = community.name.toLowerCase();
    const communityDescription = community.description.toLowerCase();
    const communityCategory = community.category.toLowerCase();
    
    const matchesSearch = communityName.includes(searchTerm) ||
                         communityDescription.includes(searchTerm) ||
                         communityCategory.includes(searchTerm);
    
    return matchesCategory && matchesSearch;
  });

  const handleJoinLeaveClick = (community, isJoined) => {
    setCommunityToAction(community);
    setActionType(isJoined ? 'leave' : 'join');
    setShowJoinLeaveModal(true);
  };

  const confirmJoinLeave = async () => {
    if (!communityToAction) return;
    
    try {
      if (actionType === 'leave') {
        // Leave community
        dispatch(leaveCommunity(communityToAction.id));
        dispatch(removeUserCommunity(communityToAction.id));
        
        console.log('Left community:', communityToAction.id);
        
        setShowJoinLeaveModal(false);
        setCommunityToAction(null);
        setActionType('');
      } else {
        // Join community
        dispatch(joinCommunity(communityToAction.id));
        dispatch(addUserCommunity(communityToAction.id));
        
        console.log('Joined community:', communityToAction.id);
        
        setShowJoinLeaveModal(false);
        setCommunityToAction(null);
        setActionType('');
      }
    } catch (error) {
      console.error('Error joining/leaving community:', error);
      setShowJoinLeaveModal(false);
      setCommunityToAction(null);
      setActionType('');
    }
  };

  const cancelJoinLeave = () => {
    setShowJoinLeaveModal(false);
    setCommunityToAction(null);
    setActionType('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="cursor-target card mb-8 text-center">
          <h1 className="text-4xl font-bold text-gradient mb-4">Communities</h1>
          <p className="text-xl text-white/60 mb-6">
            Join communities of like-minded people and share your interests
          </p>
          <Link
            to="/create-community"
            className="cursor-target btn-primary"
          >
            Create Community
          </Link>
        </div>

        {/* Filters */}
        <div className="cursor-target card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, description, or category..."
                className="cursor-target w-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
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
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCommunities.map((community) => (
            <div key={community.id} className="cursor-target card group hover:scale-105 transition-all duration-300">
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(community.category)}`}>
                    {community.category.charAt(0).toUpperCase() + community.category.slice(1)}
                  </span>
                </div>
                {community.isJoined && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full text-xs font-medium">
                      Joined
                    </span>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
                  <Link to={`/community/${community.id}`}>
                    {community.name}
                  </Link>
                </h3>
                
                <p className="text-white/60 text-sm leading-relaxed">
                  {community.description}
                </p>

                {/* Creator Info */}
                <div className="flex items-center space-x-2 pt-2 border-t border-white/10">
                  <div className={`w-6 h-6 bg-gradient-to-br ${getRandomColor(community.creator.id)} rounded-full flex items-center justify-center`}>
                    <span className="text-xs font-bold text-white">
                      {getUserInitials(community.creator.firstName, community.creator.lastName)}
                    </span>
                  </div>
                  <div className="text-xs text-white/60">
                    <span>Created by {community.creator.firstName} {community.creator.lastName}</span>
                    <br />
                    <span>{formatDate(community.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-white/50 text-sm">
                  <span>{community.members.toLocaleString()} members</span>
                  <span>{community.posts} posts</span>
                </div>

                <button
                  onClick={() => handleJoinLeaveClick(community, community.isJoined)}
                  className={`cursor-target w-full py-2 rounded-lg transition-colors duration-200 ${
                    community.isJoined
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {community.isJoined ? 'Leave Community' : 'Join Community'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCommunities.length === 0 && (
          <div className="cursor-target card text-center py-12">
            <svg className="w-16 h-16 text-white/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">No communities found</h3>
            <p className="text-white/60 mb-4">Try adjusting your search or filters</p>
            <Link to="/create-community" className="cursor-target btn-primary">
              Create First Community
            </Link>
          </div>
        )}
      </div>

      {/* Join/Leave Confirmation Modal */}
      {showJoinLeaveModal && communityToAction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="cursor-target card max-w-md w-full mx-4">
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                actionType === 'join' 
                  ? 'bg-blue-500/20' 
                  : 'bg-red-500/20'
              }`}>
                <svg className={`w-8 h-8 ${
                  actionType === 'join' 
                    ? 'text-blue-400' 
                    : 'text-red-400'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {actionType === 'join' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  )}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {actionType === 'join' ? 'Join Community' : 'Leave Community'}
              </h3>
              <p className="text-white/60 mb-6">
                {actionType === 'join' 
                  ? `Are you sure you want to join "${communityToAction.name}"? You'll be able to see and participate in community discussions.`
                  : `Are you sure you want to leave "${communityToAction.name}"? You'll no longer have access to community content.`
                }
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={cancelJoinLeave}
                  className="cursor-target flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmJoinLeave}
                  className={`cursor-target flex-1 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    actionType === 'join'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {actionType === 'join' ? 'Join' : 'Leave'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Communities; 