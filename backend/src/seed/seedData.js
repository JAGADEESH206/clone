import 'dotenv/config';
import { connectDB } from '../config/db.js';
import { Artist } from '../models/Artist.js';
import { Album } from '../models/Album.js';
import { Song } from '../models/Song.js';

const run = async () => {
  await connectDB();
  await Promise.all([Artist.deleteMany({}), Album.deleteMany({}), Song.deleteMany({})]);

  const artist = await Artist.create({ name: 'Nova Echo', bio: 'Electronic indie project', image: '' });
  const album = await Album.create({ title: 'Night Drives', artistId: artist._id, coverImage: '', songs: [] });
  const song = await Song.create({
    title: 'Midnight Run',
    artistId: artist._id,
    albumId: album._id,
    audioUrl: '/backend/uploads/sample.mp3',
    coverImage: '',
    duration: 210
  });

  album.songs = [song._id];
  await album.save();

  console.log('Seeded basic catalog data');
  process.exit(0);
};

run();
