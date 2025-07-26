import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTagColor } from '../utils/colors';

const CreateCommunity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'technology',
    image: '',
    isPrivate: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'travel', label: 'Travel' },
    { value: 'health', label: 'Health' },
    { value: 'education', label: 'Education' },
    { value: 'business', label: 'Business' },
    { value: 'general', label: 'General' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Community name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Community name must be at least 3 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (!formData.image.trim()) {
      newErrors.image = 'Community image URL is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create new community object
      const newCommunity = {
        id: Date.now(), // In real app, this would come from backend
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category,
        image: formData.image.trim(),
        isPrivate: formData.isPrivate,
        creator: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username
        },
        members: [user.id], // Creator is automatically a member
        memberCount: 1,
        createdAt: new Date().toISOString(),
        isJoined: true // Creator is automatically joined
      };
      
      // In a real app, you would dispatch an action to add to Redux store
      // and make an API call to save to backend
      console.log('Creating community:', newCommunity);
      
      // For now, just show success and redirect
      alert('Community created successfully!');
      navigate('/communities');
      
    } catch (error) {
      console.error('Error creating community:', error);
      alert('Failed to create community. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="cursor-target card mb-8 text-center">
          <h1 className="text-4xl font-bold text-gradient mb-4">Create Community</h1>
          <p className="text-xl text-white/60">
            Start a new community and bring people together around your interests
          </p>
        </div>

        {/* Form */}
        <div className="cursor-target card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Community Name */}
            <div>
              <label htmlFor="name" className="block text-white font-medium mb-2">
                Community Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter community name..."
                className={`cursor-target w-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ${
                  errors.name ? 'border-red-500/50' : 'border-white/20'
                }`}
                style={{ 
                  color: 'white',
                  WebkitTextFillColor: 'white'
                }}
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-white font-medium mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe what your community is about..."
                className={`cursor-target w-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ${
                  errors.description ? 'border-red-500/50' : 'border-white/20'
                }`}
                style={{ 
                  color: 'white',
                  WebkitTextFillColor: 'white'
                }}
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-white font-medium mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="cursor-target w-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-white font-medium mb-2">
                Community Image URL *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className={`cursor-target w-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ${
                  errors.image ? 'border-red-500/50' : 'border-white/20'
                }`}
                style={{ 
                  color: 'white',
                  WebkitTextFillColor: 'white'
                }}
              />
              {errors.image && (
                <p className="text-red-400 text-sm mt-1">{errors.image}</p>
              )}
            </div>

            {/* Image Preview */}
            {formData.image && (
              <div>
                <label className="block text-white font-medium mb-2">
                  Image Preview
                </label>
                <div className="relative w-full h-48 overflow-hidden rounded-lg border border-white/20">
                  <img
                    src={formData.image}
                    alt="Community preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 bg-gray-800/50 flex items-center justify-center">
                    <p className="text-white/60">Invalid image URL</p>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Setting */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isPrivate"
                name="isPrivate"
                checked={formData.isPrivate}
                onChange={handleChange}
                className="cursor-target w-4 h-4 text-blue-600 bg-gray-800 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="isPrivate" className="text-white">
                Make this community private (requires approval to join)
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => navigate('/communities')}
                className="cursor-target bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-target btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating...' : 'Create Community'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunity; 