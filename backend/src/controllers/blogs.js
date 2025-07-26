import Blog from '../models/Blog.js';

export const createBlog = async (req, res) => {
  try {
    const blog = new Blog({ ...req.body, author: req.user.id });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to create blog', error: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const { q, category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (q) filter.$text = { $search: q };

    // Populate author username
    const blogs = await Blog.find(filter).populate('author', 'username');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to get blogs', error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'username')
      .populate('comments.author', 'username');
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to get blog', error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });
    if (blog.author.toString() !== req.user.id) return res.status(403).json({ msg: 'Forbidden' });

    Object.assign(blog, req.body);

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to update blog', error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });
    if (blog.author.toString() !== req.user.id) return res.status(403).json({ msg: 'Forbidden' });

    await blog.remove();
    res.json({ msg: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to delete blog', error: error.message });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    const idx = blog.likes.findIndex(userId => userId.toString() === req.user.id);
    if (idx === -1) {
      blog.likes.push(req.user.id);
    } else {
      blog.likes.splice(idx, 1);
    }
    await blog.save();

    res.json({ likesCount: blog.likes.length });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to like blog', error: error.message });
  }
};

export const commentBlog = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: 'Comment text required' });

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    const comment = { author: req.user.id, text };
    blog.comments.push(comment);
    await blog.save();

    // Populate the comment author username
    const savedComment = blog.comments[blog.comments.length - 1];
    await savedComment.populate('author', 'username');

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to comment', error: error.message });
  }
};
