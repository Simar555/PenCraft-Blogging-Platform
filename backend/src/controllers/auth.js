import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

export const register = async (req, res) => {
  try {
    const { email, password, username, firstName, lastName } = req.body;

    // Check for existing user/email
    const existUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existUser) return res.status(400).json({ msg: 'Email or Username already registered' });

    const user = new User({ email, password, username, firstName, lastName });
    await user.save();

    const token = signToken(user._id);
    res.cookie('token', token, { httpOnly: true, maxAge: 6048e5 }); // 7 days

    // Send user info without password
    const userData = user.toObject();
    delete userData.password;

    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ msg: 'Registration failed', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = signToken(user._id);
    res.cookie('token', token, { httpOnly: true, maxAge: 6048e5 });

    // Send user info (hide password)
    const userData = user.toObject();
    delete userData.password;

    res.json(userData);
  } catch (error) {
    res.status(500).json({ msg: 'Login failed', error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token').json({ msg: 'Logged out successfully' });
};

// Get currently logged in user from cookie token
export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').populate('communities');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to get user info' });
  }
};
