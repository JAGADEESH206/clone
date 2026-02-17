import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TopBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-wrap gap-3 items-center justify-between mb-6">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?q=${query}`)}
        placeholder="Search songs, albums, artists"
        className="w-full md:w-96 bg-zinc-900 px-4 py-2 rounded-full border border-zinc-700 focus:outline-none focus:border-accent"
      />
      <div className="flex items-center gap-3">
        <div className="text-sm text-zinc-300">{user?.name || 'Guest'}</div>
        {user && (
          <button onClick={logout} className="text-sm px-3 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700">
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
