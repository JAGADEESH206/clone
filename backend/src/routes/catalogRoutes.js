import { Router } from 'express';
import { getAlbumById, getAlbums, getArtistById, getArtists } from '../controllers/catalogController.js';

const router = Router();

router.get('/artists', getArtists);
router.get('/artists/:id', getArtistById);
router.get('/albums', getAlbums);
router.get('/albums/:id', getAlbumById);

export default router;
