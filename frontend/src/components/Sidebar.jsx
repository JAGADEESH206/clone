import { Home, Library, ListPlus, Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/library', label: 'Your Library', icon: Library },
  { to: '/playlists', label: 'Create Playlist', icon: ListPlus },
  { to: '/liked', label: 'Liked Songs', icon: Heart }
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-panel p-4 flex-col gap-2 rounded-xl">
      {links.map(({ to, label, icon: Icon }) => (
        <Link key={to} to={to} className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 transition">
          <Icon size={18} /> {label}
        </Link>
      ))}
    </aside>
  );
}
