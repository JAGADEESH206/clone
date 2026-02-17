import { Router } from 'express';
import { body } from 'express-validator';
import { login, logout, signup } from '../controllers/authController.js';

const router = Router();

router.post('/signup', [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })], signup);
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], login);
router.post('/logout', logout);

export default router;
