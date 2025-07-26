import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blogs.js';
import communityRoutes from './routes/communities.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000', // your frontend origin
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Rate limiter for security
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(limiter);

// Health check
app.get('/', (req, res) => res.json({ message: 'PenCraft API is running!' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use('*', (req, res) => res.status(404).json({ message: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log(`API Running on port ${process.env.PORT || 5000}`)))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
