import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import MusicPlayer from '../components/MusicPlayer';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen p-3 md:p-4 pb-28 bg-black text-white">
      <div className="flex gap-4">
        <Sidebar />
        <main className="flex-1 bg-panel rounded-xl p-4 md:p-6">
          <TopBar />
          {children}
        </main>
      </div>
      <MusicPlayer />
    </div>
  );
}
