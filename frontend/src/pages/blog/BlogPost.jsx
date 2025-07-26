import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRandomColor, getUserInitials, getTagColor } from '../../utils/colors';
import { toggleLike, addComment, deleteComment, savePost, unsavePost } from '../../store';

const BlogPost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { posts } = useSelector((state) => state.blog);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const foundPost = posts.find(p => p.id === parseInt(id));
    setPost(foundPost);
  }, [id, posts]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  const handleLike = () => {
    if (!isAuthenticated) return;
    dispatch(toggleLike({ postId: post.id, userId: user.id }));
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim() || !isAuthenticated) return;

    const newComment = {
      id: Date.now(),
      content: comment,
      author: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username
      },
      createdAt: new Date().toISOString()
    };

    dispatch(addComment({ postId: post.id, comment: newComment }));
    setComment('');
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment({ postId: post.id, commentId }));
  };

  const isLiked = () => {
    return post?.likedBy?.includes(user?.id);
  };

  const isSaved = () => {
    return post?.savedBy?.includes(user?.id);
  };

  const handleSave = () => {
    if (!isAuthenticated) return;
    if (isSaved()) {
      dispatch(unsavePost({ postId: post.id, userId: user.id }));
    } else {
      dispatch(savePost({ postId: post.id, userId: user.id }));
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="cursor-target card">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white/60 mt-4 text-center">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="cursor-target inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Post Header */}
        <article className="cursor-target card mb-8 group hover:shadow-2xl transition-all duration-300">
          {/* Category Badge */}
          <div className="mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(post.category)}`}>
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-white mb-4 group-hover:text-gradient transition-colors duration-300">{post.title}</h1>

          {/* Author Info */}
          <div className="flex items-center space-x-4 mb-6">
            <div className={`w-12 h-12 bg-gradient-to-br ${getRandomColor(post.author.id)} rounded-full flex items-center justify-center shadow-lg`}>
              <span className="text-lg font-bold text-white">
                {getUserInitials(post.author.firstName, post.author.lastName)}
              </span>
            </div>
            <div>
              <p className="text-white/80 font-medium">
                {post.author.firstName} {post.author.lastName}
              </p>
              <p className="text-white/50 text-sm">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8 overflow-hidden rounded-lg group">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 text-sm rounded-full border hover:scale-105 transition-transform duration-200 cursor-pointer ${getTagColor(tag)}`}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              color: 'white',
              fontSize: '16px',
              lineHeight: '1.8'
            }}
          />

          {/* Interaction Bar */}
          <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-8">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
                className={`cursor-target flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isLiked() 
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30 shadow-lg' 
                    : 'bg-white/10 text-white/60 hover:bg-white/20 hover:shadow-lg'
                }`}
              >
                <svg className="w-5 h-5" fill={isLiked() ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{post.likes}</span>
              </button>

              <div className="flex items-center space-x-2 text-white/60">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{post.comments}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="cursor-target p-2 text-white/60 hover:text-white hover:scale-110 transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
              <button 
                onClick={handleSave}
                className={`cursor-target p-2 transition-all duration-200 hover:scale-110 ${
                  isSaved() 
                    ? 'text-yellow-400 hover:text-yellow-300' 
                    : 'text-white/60 hover:text-white'
                }`}
                title={isSaved() ? 'Remove from saved' : 'Save post'}
              >
                <svg className="w-5 h-5" fill={isSaved() ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="cursor-target card">
          <h3 className="text-2xl font-bold text-white mb-6">
            Comments ({post.comments})
          </h3>

          {/* Add Comment */}
          {isAuthenticated ? (
            <form onSubmit={handleComment} className="mb-8">
              <div className="flex space-x-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${getRandomColor(user?.id)} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-sm font-bold text-white">
                    {getUserInitials(user?.firstName, user?.lastName)}
                  </span>
                </div>
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="cursor-target w-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none"
                    rows="3"
                    style={{ 
                      color: 'white',
                      WebkitTextFillColor: 'white'
                    }}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      disabled={!comment.trim()}
                      className="cursor-target bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-white/5 rounded-lg text-center">
              <p className="text-white/60 mb-3">Please sign in to leave a comment</p>
              <Link to="/login" className="cursor-target btn-primary text-sm">
                Sign In
              </Link>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {post.commentsList && post.commentsList.length > 0 ? (
              post.commentsList.map((comment) => (
                <div key={comment.id} className="flex space-x-4 group">
                  <div className={`w-10 h-10 bg-gradient-to-br ${getRandomColor(comment.author.id)} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-sm font-bold text-white">
                      {getUserInitials(comment.author.firstName, comment.author.lastName)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-white/80 font-medium">
                            {comment.author.firstName} {comment.author.lastName}
                          </p>
                          <p className="text-white/50 text-xs">
                            {formatDate(comment.createdAt)}
                          </p>
                        </div>
                        {isAuthenticated && user?.id === comment.author.id && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="cursor-target text-white/40 hover:text-red-400 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                      <p className="text-white/80 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-white/60">No comments yet. Be the first to comment!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost; 