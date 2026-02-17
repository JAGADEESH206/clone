import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import SongCard from '../components/SongCard';

export default function ArtistPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/catalog/artists/${id}`).then((res) => setData(res.data));
  }, [id]);

  if (!data) return <p>Loading...</p>;
  return <div><h2 className="text-2xl font-bold mb-2">{data.artist.name}</h2><p className="text-zinc-400 mb-4">{data.artist.bio}</p><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{data.songs.map((song) => <SongCard key={song._id} song={song} list={data.songs} />)}</div></div>;
}
