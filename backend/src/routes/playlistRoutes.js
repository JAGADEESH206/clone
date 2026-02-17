import { Router } from 'express';
import {
  addSongToPlaylist,
  createPlaylist,
  deletePlaylist,
  getMyPlaylists,
  removeSongFromPlaylist,
  updatePlaylist
} from '../controllers/playlistController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.get('/', getMyPlaylists);
router.post('/', createPlaylist);
router.patch('/:id', updatePlaylist);
router.delete('/:id', deletePlaylist);
router.post('/:id/songs', addSongToPlaylist);
router.delete('/:id/songs/:songId', removeSongFromPlaylist);

export default router;
