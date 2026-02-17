import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { User } from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = generateToken(user);

  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const logout = async (_req, res) => {
  res.json({ message: 'Logged out successfully on client side' });
};
