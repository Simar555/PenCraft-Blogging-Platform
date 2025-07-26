const API_BASE_URL = 'http://localhost:5000/api';

// Auth API
export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`);
    return response.json();
  },
};

// Communities API
export const communitiesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/communities`);
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/communities/${id}`);
    return response.json();
  },

  join: async (communityId, userId) => {
    const response = await fetch(`${API_BASE_URL}/communities/${communityId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    return response.json();
  },

  leave: async (communityId, userId) => {
    const response = await fetch(`${API_BASE_URL}/communities/${communityId}/leave`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    return response.json();
  },

  create: async (communityData) => {
    const response = await fetch(`${API_BASE_URL}/communities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(communityData),
    });
    return response.json();
  },
};

// Users API
export const usersAPI = {
  getProfile: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    return response.json();
  },

  updateProfile: async (userId, userData) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  joinCommunity: async (userId, communityId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/join-community`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ communityId }),
    });
    return response.json();
  },

  leaveCommunity: async (userId, communityId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/leave-community`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ communityId }),
    });
    return response.json();
  },
};

// Blogs API
export const blogsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
    return response.json();
  },

  create: async (blogData) => {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });
    return response.json();
  },

  update: async (id, blogData) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
}; 