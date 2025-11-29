import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { uploadSingle } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin routes (cần thêm middleware auth)
// router.post('/', authenticate, authorizeAdmin, createProduct);
// router.put('/:id', authenticate, authorizeAdmin, updateProduct);
// router.delete('/:id', authenticate, authorizeAdmin, deleteProduct);

// Tạm thời để public để test (có thể thêm auth middleware sau)
router.post('/', uploadSingle, createProduct);
router.put('/:id', uploadSingle, updateProduct);
router.delete('/:id', deleteProduct);

export default router;

