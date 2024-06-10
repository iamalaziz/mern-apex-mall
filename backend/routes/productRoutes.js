import express from 'express';
import {
    getProductById,
    getProducts,
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview,
    likeProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleWare/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:id/like').put(protect, likeProduct);
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

export default router;
