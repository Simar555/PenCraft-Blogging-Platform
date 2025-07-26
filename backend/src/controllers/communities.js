import Community from '../models/Community.js';
import User from '../models/User.js';

export const createCommunity = async (req, res) => {
  try {
    const community = new Community({ ...req.body, creator: req.user.id, members: [req.user.id] });
    await community.save();

    // Add this community to user's list
    await User.findByIdAndUpdate(req.user.id, { $push: { communities: community._id } });

    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to create community', error: error.message });
  }
};

export const getCommunities = async (req, res) => {
  try {
    const communities = await Community.find().populate('creator', 'username');
    res.json(communities);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to get communities', error: error.message });
  }
};

export const getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id).populate('creator', 'username').populate('members', 'username');
    if (!community) return res.status(404).json({ msg: 'Community not found' });
    res.json(community);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to get community', error: error.message });
  }
};

export const joinCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ msg: 'Community not found' });

    if (community.members.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already a member' });
    }

    community.members.push(req.user.id);
    await community.save();

    await User.findByIdAndUpdate(req.user.id, { $push: { communities: community._id } });

    res.json({ msg: 'Joined community' });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to join community', error: error.message });
  }
};

export const leaveCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ msg: 'Community not found' });

    const memberIdx = community.members.indexOf(req.user.id);
    if (memberIdx === -1) {
      return res.status(400).json({ msg: 'Not a member of this community' });
    }

    community.members.splice(memberIdx, 1);
    await community.save();

    await User.findByIdAndUpdate(req.user.id, { $pull: { communities: community._id } });

    res.json({ msg: 'Left community' });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to leave community', error: error.message });
  }
};
