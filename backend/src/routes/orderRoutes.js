import express from 'express';
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/:id', getOrderById);
router.get('/', getOrders);
router.put('/:id/status', updateOrderStatus);

export default router;

