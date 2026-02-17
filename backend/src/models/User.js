import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
    likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
