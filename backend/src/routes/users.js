import express from 'express';
import authenticate from '../middleware/auth.js';
import { getUserById, updateUser } from '../controllers/users.js';

const router = express.Router();

router.get('/:id', getUserById);
router.put('/:id', authenticate, updateUser);

export default router;
