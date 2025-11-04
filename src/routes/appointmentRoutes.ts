import { Router } from 'express';
import { getAllAppointments, createAppointment, cancelAppointment } from '../controllers/appointmentController';

const router = Router();

router.get('/', getAllAppointments);
router.post('/', createAppointment);
router.post('/cancel', cancelAppointment);

export default router;

