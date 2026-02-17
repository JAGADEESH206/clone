import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import LibraryPage from './pages/LibraryPage';
import PlaylistsPage from './pages/PlaylistsPage';
import ArtistPage from './pages/ArtistPage';
import AlbumPage from './pages/AlbumPage';
import AuthPage from './pages/AuthPage';
import LikedSongsPage from './pages/LikedSongsPage';
import { useAuth } from './context/AuthContext';

const Protected = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="*"
        element={
          <Protected>
            <AppLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/playlists" element={<PlaylistsPage />} />
                <Route path="/artist/:id" element={<ArtistPage />} />
                <Route path="/album/:id" element={<AlbumPage />} />
                <Route path="/liked" element={<LikedSongsPage />} />
              </Routes>
            </AppLayout>
          </Protected>
        }
      />
    </Routes>
  );
}
