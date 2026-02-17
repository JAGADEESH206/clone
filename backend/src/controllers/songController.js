import fs from 'fs';
import path from 'path';
import { Song } from '../models/Song.js';

export const getSongs = async (_req, res) => {
  const songs = await Song.find().populate('artistId albumId').sort({ createdAt: -1 });
  res.json(songs);
};

export const getSongById = async (req, res) => {
  const song = await Song.findById(req.params.id).populate('artistId albumId');
  if (!song) return res.status(404).json({ message: 'Song not found' });
  res.json(song);
};

export const streamSong = async (req, res) => {
  const song = await Song.findById(req.params.id);
  if (!song) return res.status(404).json({ message: 'Song not found' });

  const cleanPath = song.audioUrl.replace(/^\/+/, '');
  const filePath = path.join(process.cwd(), cleanPath);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Audio file missing on server' });
  }

  const stat = fs.statSync(filePath);
  const total = stat.size;
  const range = req.headers.range;

  if (range) {
    const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : total - 1;
    const chunkSize = end - start + 1;
    const stream = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'audio/mpeg'
    });

    stream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': total,
      'Content-Type': 'audio/mpeg'
    });
    fs.createReadStream(filePath).pipe(res);
  }

  await Song.findByIdAndUpdate(song._id, { $inc: { plays: 1 } });
};
