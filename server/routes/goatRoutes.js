import express from 'express';
import {
  createGoat,
  getGoats,
  getGoatById,
  updateGoat,
  archiveGoat,
} from '../controllers/goatController.js';

const router = express.Router();

router.route('/')
  .post(createGoat)
  .get(getGoats);

router.route('/:id')
  .get(getGoatById)
  .put(updateGoat)
  .delete(archiveGoat);

export default router;
