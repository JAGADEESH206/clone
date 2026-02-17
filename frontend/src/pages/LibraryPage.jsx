import { useEffect, useState } from 'react';
import api from '../api/client';

export default function LibraryPage() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    api.get('/playlists').then((res) => setPlaylists(res.data)).catch(() => setPlaylists([]));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Library</h2>
      <div className="space-y-3">{playlists.map((pl) => <div className="card" key={pl._id}>{pl.name} ({pl.songs.length} songs)</div>)}</div>
    </div>
  );
}
