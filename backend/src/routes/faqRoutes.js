import express from 'express';
import {
  getFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getFAQCategories
} from '../controllers/faqController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getFAQs);
router.get('/categories', getFAQCategories);
router.get('/:id', getFAQById);

// Admin routes (protected)
router.post('/', authenticate, isAdmin, createFAQ);
router.put('/:id', authenticate, isAdmin, updateFAQ);
router.delete('/:id', authenticate, isAdmin, deleteFAQ);

export default router;


