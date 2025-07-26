// Random color generator for user profile avatars
export const getRandomColor = (userId) => {
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-teal-500 to-blue-500',
    'from-pink-500 to-rose-500',
    'from-yellow-500 to-orange-500',
    'from-violet-500 to-purple-500',
    'from-cyan-500 to-blue-500',
    'from-emerald-500 to-green-500',
    'from-rose-500 to-pink-500'
  ];
  
  // Use userId to get consistent color for same user
  const index = userId ? userId % colors.length : Math.floor(Math.random() * colors.length);
  return colors[index];
};

// Get user initials
export const getUserInitials = (firstName, lastName) => {
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';
  return first + last;
};

// Random color generator for hashtags
export const getTagColor = (tagName) => {
  const colors = [
    'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'bg-green-500/20 text-green-300 border-green-500/30',
    'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'bg-pink-500/20 text-pink-300 border-pink-500/30',
    'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    'bg-teal-500/20 text-teal-300 border-teal-500/30',
    'bg-red-500/20 text-red-300 border-red-500/30',
    'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'bg-violet-500/20 text-violet-300 border-violet-500/30',
    'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  ];
  
  // Use tag name to get consistent color for same tag
  const index = tagName ? tagName.toLowerCase().charCodeAt(0) % colors.length : 0;
  return colors[index];
}; 