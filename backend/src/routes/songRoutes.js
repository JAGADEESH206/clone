import { Router } from 'express';
import { getSongById, getSongs, streamSong } from '../controllers/songController.js';

const router = Router();

router.get('/', getSongs);
router.get('/:id', getSongById);
router.get('/:id/stream', streamSong);

export default router;
