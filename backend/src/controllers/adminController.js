import path from 'path';
import { Artist } from '../models/Artist.js';
import { Album } from '../models/Album.js';
import { Song } from '../models/Song.js';

const publicPath = (file) => `/backend/uploads/${path.basename(file.path)}`;

export const createArtist = async (req, res) => {
  const artist = await Artist.create({
    name: req.body.name,
    bio: req.body.bio || '',
    image: req.file ? publicPath(req.file) : req.body.image || ''
  });
  res.status(201).json(artist);
};

export const createAlbum = async (req, res) => {
  const album = await Album.create({
    title: req.body.title,
    artistId: req.body.artistId,
    coverImage: req.file ? publicPath(req.file) : req.body.coverImage || '',
    songs: []
  });
  res.status(201).json(album);
};

export const createSong = async (req, res) => {
  const song = await Song.create({
    title: req.body.title,
    artistId: req.body.artistId,
    albumId: req.body.albumId || null,
    audioUrl: req.files?.audio?.[0] ? publicPath(req.files.audio[0]) : req.body.audioUrl,
    coverImage: req.files?.cover?.[0] ? publicPath(req.files.cover[0]) : req.body.coverImage || '',
    duration: Number(req.body.duration || 0)
  });

  if (song.albumId) {
    await Album.findByIdAndUpdate(song.albumId, { $addToSet: { songs: song._id } });
  }

  res.status(201).json(song);
};
