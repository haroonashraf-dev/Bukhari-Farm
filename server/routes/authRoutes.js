import express from 'express';
import { registerUser, loginUser, getMe, getUsers, updateUserRole, deleteUser } from '../controllers/authController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// User Management Routes (Admin & Manager)
router.get('/users', protect, authorize('admin', 'manager'), getUsers);
router.put('/users/:id/role', protect, authorize('admin', 'manager'), updateUserRole);
router.delete('/users/:id', protect, authorize('admin', 'manager'), deleteUser);

export default router;
