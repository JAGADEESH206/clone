import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/client';
import SongCard from '../components/SongCard';

export default function SearchPage() {
  const [params] = useSearchParams();
  const [results, setResults] = useState({ songs: [], artists: [], albums: [] });
  const q = params.get('q') || '';

  useEffect(() => {
    if (!q) return;
    api.get(`/search?q=${encodeURIComponent(q)}`).then((res) => setResults(res.data));
  }, [q]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Search Results for "{q}"</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {results.songs.map((song) => <SongCard key={song._id} song={song} list={results.songs} />)}
      </div>
      <p className="text-zinc-400">Artists: {results.artists.length} • Albums: {results.albums.length}</p>
    </div>
  );
}
