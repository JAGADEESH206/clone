import { Song } from '../models/Song.js';
import { Artist } from '../models/Artist.js';
import { Album } from '../models/Album.js';

export const searchAll = async (req, res) => {
  const q = req.query.q?.trim() || '';
  if (!q) return res.json({ songs: [], artists: [], albums: [] });

  const regex = new RegExp(q, 'i');
  const [songs, artists, albums] = await Promise.all([
    Song.find({ title: regex }).limit(20).populate('artistId albumId'),
    Artist.find({ name: regex }).limit(20),
    Album.find({ title: regex }).limit(20).populate('artistId')
  ]);

  res.json({ songs, artists, albums });
};
