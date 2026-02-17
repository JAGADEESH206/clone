import { Artist } from '../models/Artist.js';
import { Album } from '../models/Album.js';
import { Song } from '../models/Song.js';

export const getArtists = async (_req, res) => {
  const artists = await Artist.find().sort({ name: 1 });
  res.json(artists);
};

export const getArtistById = async (req, res) => {
  const artist = await Artist.findById(req.params.id);
  if (!artist) return res.status(404).json({ message: 'Artist not found' });
  const songs = await Song.find({ artistId: artist._id }).populate('albumId');
  const albums = await Album.find({ artistId: artist._id });
  res.json({ artist, songs, albums });
};

export const getAlbums = async (_req, res) => {
  const albums = await Album.find().populate('artistId').sort({ createdAt: -1 });
  res.json(albums);
};

export const getAlbumById = async (req, res) => {
  const album = await Album.findById(req.params.id).populate('artistId').populate({
    path: 'songs',
    populate: ['artistId', 'albumId']
  });
  if (!album) return res.status(404).json({ message: 'Album not found' });
  res.json(album);
};
