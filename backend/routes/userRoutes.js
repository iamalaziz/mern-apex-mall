import express from 'express';
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
  handleWishlist,
  getUserWithWishlist
} from '../controllers/userController.js';
import { protect, admin } from '../middleWare/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

// wishlist routes
router.get('/wishlist', protect, getUserWithWishlist);
router.post('/wishlist', protect, handleWishlist);
// router.delete('/wishlist/:productId', protect, removeFromWishlist);

export default router;
