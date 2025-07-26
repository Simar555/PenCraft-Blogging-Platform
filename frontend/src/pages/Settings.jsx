import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store';
import { getRandomColor, getUserInitials } from '../utils/colors';

const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || ''
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Theme preferences
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    comments: true,
    likes: true,
    follows: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'account', label: 'Account', icon: '📋' }
  ];

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(updateUser(profileForm));
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      setLoading(false);
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setMessage({ type: 'success', text: 'Password changed successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Handle account deletion
      console.log('Account deletion requested');
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className={`w-20 h-20 bg-gradient-to-br ${getRandomColor(user?.id)} rounded-full flex items-center justify-center shadow-lg`}>
          <span className="text-2xl font-bold text-white">
            {getUserInitials(user?.firstName, user?.lastName)}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-white/60">@{user?.username}</p>
        </div>
      </div>

      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              value={profileForm.firstName}
              onChange={(e) => setProfileForm(prev => ({ ...prev, firstName: e.target.value }))}
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
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={profileForm.lastName}
              onChange={(e) => setProfileForm(prev => ({ ...prev, lastName: e.target.value }))}
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
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            value={profileForm.username}
            onChange={(e) => setProfileForm(prev => ({ ...prev, username: e.target.value }))}
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

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={profileForm.email}
            onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
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

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Bio
          </label>
          <textarea
            value={profileForm.bio}
            onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
            rows="4"
            placeholder="Tell us about yourself..."
            className="cursor-target w-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
            style={{ 
              color: 'white',
              WebkitTextFillColor: 'white'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="cursor-target bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Change Password</h3>
      
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
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

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            New Password
          </label>
          <input
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
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

        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
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

        <button
          type="submit"
          disabled={loading}
          className="cursor-target bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Theme Preferences</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Theme
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="cursor-target w-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
          >
            <option value="dark">Dark Theme</option>
            <option value="light">Light Theme</option>
            <option value="auto">Auto (System)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Notification Settings</h3>
      
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <h4 className="text-white font-medium capitalize">
                {key === 'push' ? 'Push Notifications' : key}
              </h4>
              <p className="text-white/60 text-sm">
                {key === 'email' && 'Receive email notifications'}
                {key === 'push' && 'Receive push notifications'}
                {key === 'comments' && 'When someone comments on your posts'}
                {key === 'likes' && 'When someone likes your posts'}
                {key === 'follows' && 'When someone follows you'}
              </p>
            </div>
            <button
              onClick={() => handleNotificationToggle(key)}
              className={`cursor-target w-12 h-6 rounded-full transition-colors duration-200 ${
                value ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                value ? 'transform translate-x-6' : 'transform translate-x-1'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAccountTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Account Management</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <h4 className="text-red-400 font-medium mb-2">Danger Zone</h4>
          <p className="text-white/60 text-sm mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="cursor-target bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'security':
        return renderSecurityTab();
      case 'preferences':
        return renderPreferencesTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'account':
        return renderAccountTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="cursor-target card mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">Settings</h1>
          <p className="text-white/60">Manage your account settings and preferences</p>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`cursor-target card mb-6 ${
            message.type === 'success' ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'
          }`}>
            <p className={`text-sm ${
              message.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {message.text}
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="cursor-target card">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`cursor-target w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="cursor-target card">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 