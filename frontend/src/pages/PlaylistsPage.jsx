import { useEffect, useState } from 'react';
import api from '../api/client';

export default function PlaylistsPage() {
  const [name, setName] = useState('');
  const [playlists, setPlaylists] = useState([]);

  const load = () => api.get('/playlists').then((res) => setPlaylists(res.data)).catch(() => setPlaylists([]));
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!name.trim()) return;
    await api.post('/playlists', { name });
    setName('');
    load();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Playlists</h2>
      <div className="flex gap-2 mb-4"><input value={name} onChange={(e) => setName(e.target.value)} className="bg-zinc-900 px-3 py-2 rounded" placeholder="Playlist name"/><button onClick={create} className="bg-accent text-black px-4 rounded">Create</button></div>
      <div className="space-y-2">{playlists.map((pl) => <div className="card" key={pl._id}>{pl.name}</div>)}</div>
    </div>
  );
}
