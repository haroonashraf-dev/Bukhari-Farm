import express from 'express';
import {
  createGoat,
  getGoats,
  getGoatById,
  updateGoat,
  deleteGoat,
} from '../controllers/goatController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All goat routes require login
router.use(protect);

router.route('/')
  .post(createGoat)
  .get(getGoats);

router.route('/:id')
  .get(getGoatById)
  .put(updateGoat)
  .delete(authorize('admin', 'manager'), deleteGoat);

export default router;
