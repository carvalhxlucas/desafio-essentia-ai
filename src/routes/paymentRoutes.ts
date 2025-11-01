import { Router } from 'express';
import { getPaymentInfo } from '../controllers/paymentController';

const router = Router();

router.get('/info', getPaymentInfo);

export default router;

