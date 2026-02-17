import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import SongCard from '../components/SongCard';

export default function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    api.get(`/catalog/albums/${id}`).then((res) => setAlbum(res.data));
  }, [id]);

  if (!album) return <p>Loading...</p>;
  return <div><h2 className="text-2xl font-bold mb-4">{album.title}</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{album.songs.map((song) => <SongCard key={song._id} song={song} list={album.songs} />)}</div></div>;
}
