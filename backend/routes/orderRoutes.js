import express from 'express';
import { addOrderItems, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middleWare/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)

export default router;
