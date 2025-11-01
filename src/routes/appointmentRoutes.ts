import { Router } from 'express';
import { createAppointment, cancelAppointment } from '../controllers/appointmentController';

const router = Router();

router.post('/', createAppointment);
router.post('/cancel', cancelAppointment);

export default router;

