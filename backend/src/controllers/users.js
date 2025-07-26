import User from '../models/User.js';

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('communities');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to get user', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ msg: 'Forbidden to update other users' });
    }

    const allowedFields = ['firstName', 'lastName', 'bio', 'avatar'];
    const toUpdate = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) toUpdate[field] = req.body[field];
    });

    const updatedUser = await User.findByIdAndUpdate(req.params.id, toUpdate, { new: true }).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to update user', error: error.message });
  }
};
