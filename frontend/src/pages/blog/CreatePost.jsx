import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { createPostStart, createPostSuccess, createPostFailure } from '../../store';

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.blog);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    category: 'general'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content: content,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      dispatch(createPostFailure('Title and content are required'));
      return;
    }

    try {
      dispatch(createPostStart());
      
      // Mock API call - replace with actual API
      const response = await mockCreatePostAPI(formData);
      
      dispatch(createPostSuccess(response));
      navigate(`/post/${response.id}`);
    } catch (error) {
      dispatch(createPostFailure(error.message));
    }
  };

  // Mock API function
  const mockCreatePostAPI = async (postData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          title: postData.title,
          content: postData.content,
          tags: postData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          category: postData.category,
          author: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username
          },
          createdAt: new Date().toISOString(),
          likes: 0,
          comments: 0
        });
      }, 1000);
    });
  };

  // Custom Quill modules and formats
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'color', 'background', 'align',
    'link', 'image'
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="cursor-target card">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gradient mb-2">Create New Post</h1>
            <p className="text-white/60">Share your thoughts with the PenCraft community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white/80 mb-2">
                Post Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="cursor-target bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-full transition-all duration-300"
                placeholder="Enter your post title"
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

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-white/80 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="cursor-target bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-full transition-all duration-300"
              >
                <option value="general">General</option>
                <option value="technology">Technology</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="travel">Travel</option>
                <option value="food">Food</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="business">Business</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-white/80 mb-2">
                Tags (comma separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleChange}
                className="cursor-target bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-full transition-all duration-300"
                placeholder="e.g., react, javascript, web development"
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

            {/* Rich Text Editor */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Content *
              </label>
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg overflow-hidden">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={modules}
                  formats={formats}
                  placeholder="Write your post content here..."
                  style={{
                    height: '300px',
                    color: 'white'
                  }}
                  className="cursor-target"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="cursor-target flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="cursor-target flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Post...' : 'Publish Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost; 