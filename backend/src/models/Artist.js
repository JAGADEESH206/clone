import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    bio: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Artist = mongoose.model('Artist', artistSchema);
