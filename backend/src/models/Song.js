import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
    audioUrl: { type: String, required: true },
    coverImage: { type: String, default: '' },
    duration: { type: Number, required: true },
    plays: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Song = mongoose.model('Song', songSchema);
