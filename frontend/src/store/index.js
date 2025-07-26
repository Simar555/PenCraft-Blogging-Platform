import { configureStore, createSlice } from '@reduxjs/toolkit';

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    token: localStorage.getItem('token') || null
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    addUserCommunity: (state, action) => {
      if (!state.user.communities) {
        state.user.communities = [];
      }
      if (!state.user.communities.includes(action.payload)) {
        state.user.communities.push(action.payload);
      }
    },
    removeUserCommunity: (state, action) => {
      if (state.user.communities) {
        state.user.communities = state.user.communities.filter(id => id !== action.payload);
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

// User Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    error: null
  },
  reducers: {
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = null;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

// Notifications Slice
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [
      {
        id: 1,
        type: 'like',
        message: 'John Doe liked your post "Getting Started with React Development"',
        postId: 1,
        userId: 1,
        read: false,
        createdAt: '2024-01-15T14:30:00Z'
      },
      {
        id: 2,
        type: 'comment',
        message: 'Sarah Wilson commented on your post "The Art of Mindful Living"',
        postId: 2,
        userId: 2,
        read: false,
        createdAt: '2024-01-15T13:45:00Z'
      },
      {
        id: 3,
        type: 'follow',
        message: 'Mike Chen started following you',
        userId: 3,
        read: true,
        createdAt: '2024-01-15T12:20:00Z'
      },
      {
        id: 4,
        type: 'like',
        message: 'Dr. Emily Rodriguez liked your post "Exploring the Hidden Gems of Southeast Asia"',
        postId: 3,
        userId: 4,
        read: false,
        createdAt: '2024-01-15T11:15:00Z'
      }
    ],
    unreadCount: 3
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(n => n.read = true);
      state.unreadCount = 0;
    },
    deleteNotification: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    }
  }
});

// Communities Slice
const communitiesSlice = createSlice({
  name: 'communities',
  initialState: {
    communities: [
      {
        id: 1,
        name: 'React Developers',
        description: 'A community for React developers to share knowledge, ask questions, and discuss the latest trends in React development.',
        category: 'technology',
        members: 1247,
        posts: 89,
        createdAt: '2024-01-01T10:00:00Z',
        creator: { id: 1, firstName: 'John', lastName: 'Doe', username: 'johndoe' },
        moderators: [1, 2],
        rules: [
          'Be respectful to other members',
          'Share relevant React content only',
          'No spam or self-promotion',
          'Use appropriate tags for posts'
        ],
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
        isJoined: true
      },
      {
        id: 2,
        name: 'Mindful Living',
        description: 'A supportive community for people interested in mindfulness, meditation, and conscious living.',
        category: 'lifestyle',
        members: 892,
        posts: 156,
        createdAt: '2024-01-05T14:30:00Z',
        creator: { id: 2, firstName: 'Sarah', lastName: 'Wilson', username: 'sarahw' },
        moderators: [2, 3],
        rules: [
          'Practice kindness and compassion',
          'Share personal experiences respectfully',
          'No judgment or criticism',
          'Support each other\'s journey'
        ],
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
        isJoined: false
      },
      {
        id: 3,
        name: 'Travel Enthusiasts',
        description: 'Share your travel experiences, tips, and discover amazing destinations around the world.',
        category: 'travel',
        members: 2156,
        posts: 234,
        createdAt: '2024-01-10T09:15:00Z',
        creator: { id: 3, firstName: 'Mike', lastName: 'Chen', username: 'mikechen' },
        moderators: [3, 4],
        rules: [
          'Share authentic travel experiences',
          'Include location details when possible',
          'Respect local cultures and customs',
          'No promotional content without permission'
        ],
        image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=200&fit=crop',
        isJoined: true
      },
      {
        id: 4,
        name: 'AI & Healthcare',
        description: 'Exploring the intersection of artificial intelligence and healthcare innovation.',
        category: 'technology',
        members: 567,
        posts: 67,
        createdAt: '2024-01-12T16:45:00Z',
        creator: { id: 4, firstName: 'Dr. Emily', lastName: 'Rodriguez', username: 'emilyrod' },
        moderators: [4, 1],
        rules: [
          'Share evidence-based content',
          'Respect medical privacy and ethics',
          'No medical advice without credentials',
          'Focus on AI applications in healthcare'
        ],
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop',
        isJoined: false
      },
      {
        id: 5,
        name: 'Photography Masters',
        description: 'A community for photographers to share techniques, equipment reviews, and stunning captures.',
        category: 'lifestyle',
        members: 1345,
        posts: 189,
        createdAt: '2024-01-15T11:20:00Z',
        creator: { id: 5, firstName: 'Alex', lastName: 'Thompson', username: 'alexphoto' },
        moderators: [5, 2],
        rules: [
          'Share original photography only',
          'Include camera settings when helpful',
          'Provide constructive feedback',
          'Respect copyright and attribution'
        ],
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=200&fit=crop',
        isJoined: false
      },
      {
        id: 6,
        name: 'Sustainable Living',
        description: 'Tips, ideas, and discussions about eco-friendly living and reducing environmental impact.',
        category: 'lifestyle',
        members: 987,
        posts: 123,
        createdAt: '2024-01-18T13:45:00Z',
        creator: { id: 6, firstName: 'Lisa', lastName: 'Green', username: 'lisagreen' },
        moderators: [6, 3],
        rules: [
          'Share practical sustainability tips',
          'Be supportive of different approaches',
          'No judgment of others\' choices',
          'Focus on positive solutions'
        ],
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=200&fit=crop',
        isJoined: true
      }
    ],
    currentCommunity: null,
    loading: false,
    error: null
  },
  reducers: {
    joinCommunity: (state, action) => {
      const community = state.communities.find(c => c.id === action.payload);
      if (community) {
        community.isJoined = true;
        community.members += 1;
      }
    },
    leaveCommunity: (state, action) => {
      const community = state.communities.find(c => c.id === action.payload);
      if (community) {
        community.isJoined = false;
        community.members = Math.max(0, community.members - 1);
      }
    },
    createCommunity: (state, action) => {
      state.communities.unshift(action.payload);
    },
    setCurrentCommunity: (state, action) => {
      state.currentCommunity = action.payload;
    },
    savePost: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.blog.posts.find(p => p.id === postId);
      if (post && !post.savedBy) {
        post.savedBy = [];
      }
      if (post && !post.savedBy.includes(userId)) {
        post.savedBy.push(userId);
      }
    },
    unsavePost: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.blog.posts.find(p => p.id === postId);
      if (post && post.savedBy) {
        post.savedBy = post.savedBy.filter(id => id !== userId);
      }
    }
  }
});

// Blog Slice
const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [
      {
        id: 1,
        title: "Getting Started with React Development",
        content: `
          <h2>Introduction to React</h2>
          <p>React is a powerful JavaScript library for building user interfaces. It was developed by Facebook and has become one of the most popular frontend frameworks in the world.</p>
          
          <h3>Why Choose React?</h3>
          <ul>
            <li><strong>Component-Based Architecture:</strong> Build reusable UI components</li>
            <li><strong>Virtual DOM:</strong> Efficient rendering and updates</li>
            <li><strong>Rich Ecosystem:</strong> Extensive library and tool support</li>
            <li><strong>Community Support:</strong> Large and active developer community</li>
          </ul>
          
          <h3>Setting Up Your First React Project</h3>
          <p>To get started with React, you can use Create React App:</p>
          <pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>
          
          <p>This will create a new React project with all the necessary dependencies and start the development server.</p>
          
          <h3>Key Concepts</h3>
          <p>Understanding these concepts is crucial for React development:</p>
          <ul>
            <li><strong>JSX:</strong> JavaScript XML for writing components</li>
            <li><strong>Props:</strong> Passing data between components</li>
            <li><strong>State:</strong> Managing component data</li>
            <li><strong>Hooks:</strong> Modern way to use state and effects</li>
          </ul>
        `,
        tags: ['react', 'javascript', 'frontend', 'web development'],
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
        likedBy: [2, 3, 4], // User IDs who liked this post
        commentsList: [
          {
            id: 1,
            content: "Great article! Really helped me understand React better.",
            author: { id: 2, firstName: 'Alice', lastName: 'Johnson', username: 'alicej' },
            createdAt: '2024-01-14T15:30:00Z'
          },
          {
            id: 2,
            content: "Thanks for sharing these insights. Looking forward to more content!",
            author: { id: 3, firstName: 'Bob', lastName: 'Smith', username: 'bobsmith' },
            createdAt: '2024-01-13T12:15:00Z'
          }
        ],
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
      },
      {
        id: 2,
        title: "The Art of Mindful Living: A Complete Guide",
        content: `
          <h2>What is Mindful Living?</h2>
          <p>Mindful living is the practice of being fully present in each moment, aware of your thoughts, feelings, and surroundings without judgment. It's about cultivating awareness and finding peace in the present moment.</p>
          
          <h3>Benefits of Mindfulness</h3>
          <ul>
            <li><strong>Reduced Stress:</strong> Lower cortisol levels and anxiety</li>
            <li><strong>Better Focus:</strong> Improved concentration and productivity</li>
            <li><strong>Emotional Balance:</strong> Better regulation of emotions</li>
            <li><strong>Improved Relationships:</strong> More present and empathetic interactions</li>
          </ul>
          
          <h3>Daily Mindfulness Practices</h3>
          <p>Here are some simple practices you can incorporate into your daily routine:</p>
          
          <h4>1. Morning Meditation</h4>
          <p>Start your day with 10-15 minutes of meditation. Focus on your breath and observe your thoughts without getting caught up in them.</p>
          
          <h4>2. Mindful Eating</h4>
          <p>Pay attention to the taste, texture, and smell of your food. Eat slowly and savor each bite.</p>
          
          <h4>3. Walking Meditation</h4>
          <p>Take a walk and focus on the sensation of your feet touching the ground, the sounds around you, and the feeling of the air on your skin.</p>
          
          <h3>Creating a Mindful Environment</h3>
          <p>Your environment plays a crucial role in supporting mindful living. Consider these elements:</p>
          <ul>
            <li>Declutter your space</li>
            <li>Add natural elements like plants</li>
            <li>Create a dedicated meditation corner</li>
            <li>Use calming colors and lighting</li>
          </ul>
        `,
        tags: ['mindfulness', 'wellness', 'meditation', 'lifestyle'],
        category: 'lifestyle',
        author: {
          id: 2,
          firstName: 'Sarah',
          lastName: 'Wilson',
          username: 'sarahw'
        },
        createdAt: '2024-01-12T14:20:00Z',
        likes: 78,
        comments: 23,
        likedBy: [1, 3, 4], // User IDs who liked this post
        commentsList: [
          {
            id: 3,
            content: "This guide really helped me start my mindfulness journey. Thank you!",
            author: { id: 1, firstName: 'John', lastName: 'Doe', username: 'johndoe' },
            createdAt: '2024-01-14T10:20:00Z'
          },
          {
            id: 4,
            content: "The daily practices section is gold. I've been doing morning meditation for a week now.",
            author: { id: 4, firstName: 'Dr. Emily', lastName: 'Rodriguez', username: 'emilyrod' },
            createdAt: '2024-01-13T09:45:00Z'
          }
        ],
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop'
      },
      {
        id: 3,
        title: "Exploring the Hidden Gems of Southeast Asia",
        content: `
          <h2>Adventure Awaits in Southeast Asia</h2>
          <p>Southeast Asia is a treasure trove of diverse cultures, stunning landscapes, and unforgettable experiences. From pristine beaches to ancient temples, this region offers something for every type of traveler.</p>
          
          <h3>Must-Visit Destinations</h3>
          
          <h4>1. Bali, Indonesia</h4>
          <p>Known as the "Island of the Gods," Bali offers a perfect blend of culture, spirituality, and natural beauty. Visit the iconic rice terraces of Tegalalang, explore ancient temples, and unwind on pristine beaches.</p>
          
          <h4>2. Chiang Mai, Thailand</h4>
          <p>This cultural capital of Northern Thailand is famous for its temples, night markets, and elephant sanctuaries. Don't miss the Sunday Night Market and the Doi Suthep Temple.</p>
          
          <h4>3. Luang Prabang, Laos</h4>
          <p>A UNESCO World Heritage site, Luang Prabang is known for its well-preserved architecture, Buddhist temples, and the daily alms-giving ceremony.</p>
          
          <h3>Travel Tips</h3>
          <ul>
            <li><strong>Best Time to Visit:</strong> November to March (dry season)</li>
            <li><strong>Budget:</strong> $30-50 per day for budget travelers</li>
            <li><strong>Transportation:</strong> Use local buses and trains for authentic experience</li>
            <li><strong>Accommodation:</strong> Mix of hostels, guesthouses, and luxury resorts</li>
          </ul>
          
          <h3>Cultural Experiences</h3>
          <p>Immerse yourself in local culture through these experiences:</p>
          <ul>
            <li>Learn traditional cooking classes</li>
            <li>Participate in meditation retreats</li>
            <li>Visit local markets and villages</li>
            <li>Attend traditional ceremonies and festivals</li>
          </ul>
        `,
        tags: ['travel', 'southeast asia', 'adventure', 'culture'],
        category: 'travel',
        author: {
          id: 3,
          firstName: 'Mike',
          lastName: 'Chen',
          username: 'mikechen'
        },
        createdAt: '2024-01-10T09:15:00Z',
        likes: 156,
        comments: 34,
        likedBy: [1, 2, 4], // User IDs who liked this post
        image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=400&fit=crop'
      },
      {
        id: 4,
        title: "The Future of Artificial Intelligence in Healthcare",
        content: `
          <h2>AI Revolution in Healthcare</h2>
          <p>Artificial Intelligence is transforming the healthcare industry, offering new possibilities for diagnosis, treatment, and patient care. From machine learning algorithms to robotic surgery, AI is becoming an integral part of modern medicine.</p>
          
          <h3>Current Applications</h3>
          
          <h4>1. Medical Imaging</h4>
          <p>AI-powered imaging systems can detect diseases like cancer, heart disease, and neurological disorders with remarkable accuracy. These systems analyze X-rays, MRIs, and CT scans faster than human radiologists.</p>
          
          <h4>2. Drug Discovery</h4>
          <p>Machine learning algorithms are accelerating the drug discovery process by predicting molecular interactions and identifying potential drug candidates.</p>
          
          <h4>3. Personalized Medicine</h4>
          <p>AI analyzes patient data to create personalized treatment plans based on genetic makeup, lifestyle, and medical history.</p>
          
          <h3>Benefits of AI in Healthcare</h3>
          <ul>
            <li><strong>Improved Accuracy:</strong> Reduced diagnostic errors</li>
            <li><strong>Faster Diagnosis:</strong> Quicker identification of diseases</li>
            <li><strong>Cost Reduction:</strong> Lower healthcare costs through efficiency</li>
            <li><strong>Better Patient Care:</strong> 24/7 monitoring and support</li>
          </ul>
          
          <h3>Challenges and Considerations</h3>
          <p>While AI offers tremendous potential, there are important considerations:</p>
          <ul>
            <li>Data privacy and security concerns</li>
            <li>Need for human oversight and validation</li>
            <li>Ethical implications of AI decision-making</li>
            <li>Training requirements for healthcare professionals</li>
          </ul>
          
          <h3>The Road Ahead</h3>
          <p>The future of AI in healthcare looks promising, with ongoing research and development in areas like:</p>
          <ul>
            <li>Predictive analytics for disease prevention</li>
            <li>Virtual health assistants and chatbots</li>
            <li>Robotic surgery and rehabilitation</li>
            <li>Mental health monitoring and support</li>
          </ul>
        `,
        tags: ['artificial intelligence', 'healthcare', 'technology', 'medicine'],
        category: 'technology',
        author: {
          id: 4,
          firstName: 'Dr. Emily',
          lastName: 'Rodriguez',
          username: 'emilyrod'
        },
        createdAt: '2024-01-08T16:45:00Z',
        likes: 203,
        comments: 67,
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop'
      }
    ],
    currentPost: null,
    loading: false,
    error: null
  },
  reducers: {
    fetchPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = null;
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPostStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createPostSuccess: (state, action) => {
      state.loading = false;
      state.posts.unshift(action.payload);
      state.error = null;
    },
    createPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
   toggleLike: (state, action) => {
  const { postId, userId } = action.payload;
  const post = state.posts.find(p => p.id === postId);
  if (post) {
    // 🛡️ Ensure likedBy is initialized
    if (!Array.isArray(post.likedBy)) {
      post.likedBy = [];
    }

    if (post.likedBy.includes(userId)) {
      // Unlike
      post.likedBy = post.likedBy.filter(id => id !== userId);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      // Like
      post.likedBy.push(userId);
      post.likes += 1;
    }
  }
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        if (!post.commentsList) {
          post.commentsList = [];
        }
        post.commentsList.unshift(comment);
        post.comments += 1;
      }
    },
    deleteComment: (state, action) => {
      const { postId, commentId } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post && post.commentsList) {
        post.commentsList = post.commentsList.filter(c => c.id !== commentId);
        post.comments = Math.max(0, post.comments - 1);
      }
    }
  }
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  updateUser,
  addUserCommunity,
  removeUserCommunity,
  clearError
} = authSlice.actions;

export const {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure
} = userSlice.actions;

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  createPostStart,
  createPostSuccess,
  createPostFailure,
  toggleLike,
  addComment,
  deleteComment
} = blogSlice.actions;

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications
} = notificationsSlice.actions;

export const {
  joinCommunity,
  leaveCommunity,
  createCommunity,
  setCurrentCommunity,
  savePost,
  unsavePost
} = communitiesSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    blog: blogSlice.reducer,
    notifications: notificationsSlice.reducer,
    communities: communitiesSlice.reducer
  }
}); 