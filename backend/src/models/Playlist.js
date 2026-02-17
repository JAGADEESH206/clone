import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
  },
  { timestamps: true }
);

export const Playlist = mongoose.model('Playlist', playlistSchema);
