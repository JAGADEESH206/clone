import { Router } from 'express';
import multer from 'multer';
import { createAlbum, createArtist, createSong } from '../controllers/adminController.js';
import { adminOnly, protect } from '../middleware/auth.js';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'backend/uploads'),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`)
});

const upload = multer({ storage });
const router = Router();

router.use(protect, adminOnly);
router.post('/artists', upload.single('image'), createArtist);
router.post('/albums', upload.single('coverImage'), createAlbum);
router.post('/songs', upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), createSong);

export default router;
