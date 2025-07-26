import express from 'express';
import authenticate from '../middleware/auth.js';
import {
  createCommunity,
  getCommunities,
  getCommunityById,
  joinCommunity,
  leaveCommunity,
} from '../controllers/communities.js';

const router = express.Router();

router.get('/', getCommunities);
router.get('/:id', getCommunityById);

router.post('/', authenticate, createCommunity);
router.post('/:id/join', authenticate, joinCommunity);
router.post('/:id/leave', authenticate, leaveCommunity);

export default router;
