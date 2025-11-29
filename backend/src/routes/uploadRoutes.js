import express from 'express';
import { uploadImage, uploadMultipleImages, deleteImage } from '../controllers/uploadController.js';
import { uploadSingle, uploadMultiple } from '../middleware/upload.js';

const router = express.Router();

// Upload single image
router.post('/single', uploadSingle, uploadImage);

// Upload multiple images
router.post('/multiple', uploadMultiple, uploadMultipleImages);

// Delete image
router.delete('/:filename', deleteImage);

export default router;

