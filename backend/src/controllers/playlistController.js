import { Playlist } from '../models/Playlist.js';
import { User } from '../models/User.js';

export const getMyPlaylists = async (req, res) => {
  const playlists = await Playlist.find({ userId: req.user._id }).populate({
    path: 'songs',
    populate: ['artistId', 'albumId']
  });
  res.json(playlists);
};

export const createPlaylist = async (req, res) => {
  const playlist = await Playlist.create({
    userId: req.user._id,
    name: req.body.name,
    songs: []
  });
  await User.findByIdAndUpdate(req.user._id, { $push: { playlists: playlist._id } });
  res.status(201).json(playlist);
};

export const updatePlaylist = async (req, res) => {
  const playlist = await Playlist.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { name: req.body.name },
    { new: true }
  );
  if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
  res.json(playlist);
};

export const deletePlaylist = async (req, res) => {
  const playlist = await Playlist.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

  await User.findByIdAndUpdate(req.user._id, { $pull: { playlists: playlist._id } });
  res.json({ message: 'Playlist deleted' });
};

export const addSongToPlaylist = async (req, res) => {
  const playlist = await Playlist.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { $addToSet: { songs: req.body.songId } },
    { new: true }
  ).populate({ path: 'songs', populate: ['artistId', 'albumId'] });

  if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
  res.json(playlist);
};

export const removeSongFromPlaylist = async (req, res) => {
  const playlist = await Playlist.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { $pull: { songs: req.params.songId } },
    { new: true }
  ).populate({ path: 'songs', populate: ['artistId', 'albumId'] });

  if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
  res.json(playlist);
};
