import { useEffect, useState } from 'react';
import api from '../api/client';
import SongCard from '../components/SongCard';

export default function LikedSongsPage() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    api.get('/users/me').then((res) => setSongs(res.data.likedSongs || []));
  }, []);

  return <div><h2 className="text-xl font-semibold mb-4">Liked Songs</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{songs.map((song) => <SongCard key={song._id} song={song} list={songs} />)}</div></div>;
}
