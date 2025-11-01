import { Router } from 'express';
import scheduleRoutes from './scheduleRoutes';
import appointmentRoutes from './appointmentRoutes';
import paymentRoutes from './paymentRoutes';

const router = Router();

router.use('/schedule', scheduleRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/payment', paymentRoutes);

export default router;

