import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { markAsRead, markAllAsRead, deleteNotification } from '../store';
import { getRandomColor, getUserInitials } from '../utils/colors';

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }
    
    // Navigate based on notification type
    switch (notification.type) {
      case 'like':
      case 'comment':
        if (notification.postId) {
          navigate(`/post/${notification.postId}`);
        }
        break;
      case 'follow':
        if (notification.userId) {
          navigate(`/profile/${notification.userId}`);
        }
        break;
      default:
        // For other types, stay on current page
        break;
    }
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleDeleteNotification = (notificationId) => {
    dispatch(deleteNotification(notificationId));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return (
          <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'comment':
        return (
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'follow':
        return (
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unread') return !notification.read;
    return notification.type === selectedFilter;
  });

  const getFilterCount = (filter) => {
    if (filter === 'all') return notifications.length;
    if (filter === 'unread') return unreadCount;
    return notifications.filter(n => n.type === filter).length;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="cursor-target card mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-2">Notifications</h1>
              <p className="text-white/60">
                Stay updated with all your activities and interactions
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="cursor-target mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="cursor-target card mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All' },
              { value: 'unread', label: 'Unread' },
              { value: 'like', label: 'Likes' },
              { value: 'comment', label: 'Comments' },
              { value: 'follow', label: 'Follows' }
            ].map(filter => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`cursor-target px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedFilter === filter.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                }`}
              >
                {filter.label}
                <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                  {getFilterCount(filter.value)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="cursor-target card">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-0">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`cursor-target p-6 border-b border-white/5 hover:bg-white/5 transition-colors duration-200 ${
                    !notification.read ? 'bg-blue-500/10' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-base leading-relaxed ${
                        !notification.read ? 'text-white font-medium' : 'text-white/80'
                      }`}>
                        {notification.message}
                      </p>
                      <p className="text-white/50 text-sm mt-2">
                        {formatTimeAgo(notification.createdAt)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0 flex items-center space-x-2">
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(notification.id);
                        }}
                        className="cursor-target text-white/40 hover:text-red-400 transition-colors duration-200 p-1"
                        title="Delete notification"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75l-2.25 2.25V19.5A2.25 2.25 0 004.5 21.75h10.5a2.25 2.25 0 002.25-2.25v-3.75L14.25 9.75V9.75a6 6 0 00-6-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {selectedFilter === 'all' ? 'No notifications yet' : `No ${selectedFilter} notifications`}
              </h3>
              <p className="text-white/60 mb-6">
                {selectedFilter === 'all' 
                  ? "We'll notify you when something happens"
                  : `You don't have any ${selectedFilter} notifications`
                }
              </p>
              {selectedFilter !== 'all' && (
                <button
                  onClick={() => setSelectedFilter('all')}
                  className="cursor-target bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  View all notifications
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications; 