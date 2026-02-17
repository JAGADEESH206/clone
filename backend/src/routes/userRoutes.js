import { Router } from 'express';
import { addHistory, getMe, toggleLikeSong } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.use(protect);

router.get('/me', getMe);
router.patch('/likes/:songId', toggleLikeSong);
router.post('/history', addHistory);

export default router;
