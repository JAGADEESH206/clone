import { User } from '../models/User.js';

export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id)
    .select('-password')
    .populate('likedSongs')
    .populate('playlists');
  res.json(user);
};

export const toggleLikeSong = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { songId } = req.params;
  const exists = user.likedSongs.some((id) => id.toString() === songId);

  await User.findByIdAndUpdate(req.user._id, exists ? { $pull: { likedSongs: songId } } : { $addToSet: { likedSongs: songId } });

  res.json({ liked: !exists });
};

export const addHistory = async (req, res) => {
  const { songId } = req.body;
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { history: songId }
  });
  const updated = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { history: { $each: [songId], $position: 0, $slice: 20 } } },
    { new: true }
  ).populate('history');

  res.json(updated.history);
};
