import { Pause, Play, SkipBack, SkipForward, Shuffle, Repeat, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';

export default function MusicPlayer() {
  const { currentSong, isPlaying, setIsPlaying, audioRef, next, prev, volume, setVolume, shuffle, setShuffle, repeat, setRepeat } = usePlayer();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume, audioRef]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [isPlaying, currentSong, audioRef]);

  if (!currentSong) return <footer className="fixed bottom-0 left-0 right-0 bg-panel border-t border-zinc-800 p-4 text-center">Choose a song to start listening.</footer>;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-panel border-t border-zinc-800 p-3 md:p-4">
      <audio
        ref={audioRef}
        src={`${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api')}/songs/${currentSong._id}/stream`}
        onTimeUpdate={(e) => setProgress((e.target.currentTime / (e.target.duration || 1)) * 100)}
        onEnded={next}
      />
      <div className="flex items-center gap-4">
        <img src={currentSong.coverImage || 'https://placehold.co/64x64/1e1e1e/ffffff?text=Song'} className="w-12 h-12 rounded" />
        <div className="min-w-0">
          <p className="font-medium truncate">{currentSong.title}</p>
          <p className="text-xs text-zinc-400 truncate">{currentSong.artistId?.name}</p>
        </div>
        <div className="flex-1 flex items-center gap-2 justify-center">
          <button onClick={() => setShuffle(!shuffle)} className={shuffle ? 'text-accent' : ''}><Shuffle size={16} /></button>
          <button onClick={prev}><SkipBack size={18} /></button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="bg-accent rounded-full p-2 text-black">{isPlaying ? <Pause size={18} /> : <Play size={18} />}</button>
          <button onClick={next}><SkipForward size={18} /></button>
          <button onClick={() => setRepeat(!repeat)} className={repeat ? 'text-accent' : ''}><Repeat size={16} /></button>
        </div>
        <div className="hidden md:flex items-center gap-2 w-40">
          <Volume2 size={16} />
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full" />
        </div>
      </div>
      <div className="w-full bg-zinc-700 h-1 rounded mt-2">
        <div className="bg-accent h-1 rounded" style={{ width: `${progress}%` }} />
      </div>
    </footer>
  );
}
