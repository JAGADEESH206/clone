import { createContext, useContext, useMemo, useRef, useState } from 'react';

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const audioRef = useRef(null);

  const currentSong = queue[currentIndex];

  const playSong = (song, list = queue) => {
    const index = list.findIndex((s) => s._id === song._id);
    setQueue(list);
    setCurrentIndex(Math.max(index, 0));
    setIsPlaying(true);
  };

  const next = () => {
    if (!queue.length) return;
    if (shuffle) return setCurrentIndex(Math.floor(Math.random() * queue.length));
    if (currentIndex === queue.length - 1) return setCurrentIndex(repeat ? 0 : currentIndex);
    setCurrentIndex((idx) => idx + 1);
  };

  const prev = () => setCurrentIndex((idx) => Math.max(0, idx - 1));

  const value = useMemo(
    () => ({
      queue,
      currentSong,
      isPlaying,
      volume,
      shuffle,
      repeat,
      audioRef,
      setIsPlaying,
      setVolume,
      setShuffle,
      setRepeat,
      playSong,
      next,
      prev
    }),
    [queue, currentSong, isPlaying, volume, shuffle, repeat]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export const usePlayer = () => useContext(PlayerContext);
