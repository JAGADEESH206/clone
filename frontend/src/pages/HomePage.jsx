import { useEffect, useState } from 'react';
import api from '../api/client';
import SongCard from '../components/SongCard';

export default function HomePage() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    api.get('/songs').then((res) => setSongs(res.data)).catch(() => setSongs([]));
  }, []);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Trending Songs</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {songs.map((song) => <SongCard key={song._id} song={song} list={songs} />)}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Featured Playlists</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Focus Flow', 'Night Drive', 'Coding Beats'].map((name) => <div className="card" key={name}>{name}</div>)}
        </div>
      </section>
    </div>
  );
}
