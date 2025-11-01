import { Router } from 'express';
import { getAvailableSlots } from '../controllers/scheduleController';

const router = Router();

router.get('/available', getAvailableSlots);

export default router;

