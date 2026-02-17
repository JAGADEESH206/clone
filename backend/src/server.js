import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import songRoutes from './routes/songRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import catalogRoutes from './routes/catalogRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/backend/uploads', express.static(path.join(process.cwd(), 'backend/uploads')));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/catalog', catalogRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
  })
  .catch((e) => {
    console.error('DB connection failed', e);
    process.exit(1);
  });
