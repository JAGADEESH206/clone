import { Play } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function SongCard({ song, list }) {
  const { playSong } = usePlayer();

  return (
    <article className="card group">
      <img src={song.coverImage || 'https://placehold.co/300x300/1e1e1e/ffffff?text=Song'} alt={song.title} className="w-full rounded-lg mb-3 aspect-square object-cover" loading="lazy"/>
      <h3 className="font-semibold truncate">{song.title}</h3>
      <p className="text-sm text-zinc-400 truncate">{song.artistId?.name || 'Unknown Artist'}</p>
      <button
        onClick={() => playSong(song, list)}
        className="mt-3 w-full bg-accent text-black font-semibold py-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
      >
        <Play className="inline mr-1" size={16} /> Play
      </button>
    </article>
  );
}
