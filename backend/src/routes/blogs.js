const express = require('express');
const router = express.Router();

// Mock blog data
let blogs = [
  {
    id: 1,
    title: 'Welcome to PenCraft',
    content: 'This is a sample blog post about our amazing platform.',
    author: 'demo',
    authorId: 1,
    createdAt: new Date().toISOString(),
    likes: [], // Change 0 to []
    comments: []
  }
];

// Get all blogs
router.get('/', (req, res) => {
  return res.json({ blogs });
});

// Get single blog by ID
router.get('/:id', (req, res) => {
  const blogId = parseInt(req.params.id);
  const blog = blogs.find(b => b.id === blogId);

  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  return res.json({ blog });
});

// Create new blog
router.post('/', (req, res) => {
  const { title, content, authorId } = req.body;

  const newBlog = {
    id: blogs.length + 1,
    title,
    content,
    author: 'demo', // Hardcoded for mock
    authorId: authorId || 1,
    createdAt: new Date().toISOString(),
    likes: [],
    comments: []
  };

  blogs.push(newBlog);

  return res.status(201).json({
    message: 'Blog created successfully',
    blog: newBlog
  });
});

// Update blog
router.put('/:id', (req, res) => {
  const blogId = parseInt(req.params.id);
  const { title, content } = req.body;

  const blogIndex = blogs.findIndex(b => b.id === blogId);
  if (blogIndex === -1) return res.status(404).json({ message: 'Blog not found' });

  // For mock, no auth check, just update fields if provided
  blogs[blogIndex] = {
    ...blogs[blogIndex],
    title: title || blogs[blogIndex].title,
    content: content || blogs[blogIndex].content
  };

  return res.json({
    message: 'Blog updated successfully',
    blog: blogs[blogIndex]
  });
});

// Delete blog
router.delete('/:id', (req, res) => {
  const blogId = parseInt(req.params.id);

  const blogIndex = blogs.findIndex(b => b.id === blogId);
  if (blogIndex === -1) return res.status(404).json({ message: 'Blog not found' });

  blogs.splice(blogIndex, 1);

  return res.json({ message: 'Blog deleted successfully' });
});

// Toggle like/unlike blog
router.post('/:id/like', (req, res) => {
  const blogId = parseInt(req.params.id);

  // In mock, user id from body or hardcoded demo user 1
  const userId = req.body.userId || 1;

  const blog = blogs.find(b => b.id === blogId);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  if (!blog.likes) blog.likes = [];

  const index = blog.likes.indexOf(userId);

  if (index === -1) {
    // Add like
    blog.likes.push(userId);
  } else {
    // Remove like
    blog.likes.splice(index, 1);
  }

  return res.json({
    message: index === -1 ? 'Blog liked' : 'Blog unliked',
    likesCount: blog.likes.length,
    likes: blog.likes
  });
});

module.exports = router;
