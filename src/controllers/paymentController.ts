import { Request, Response } from 'express';

export const getPaymentInfo = (req: Request, res: Response): void => {
  const paymentInfo = {
    method: 'credit_card',
    currency: 'BRL',
    amount: 150.00,
    status: 'pending',
    dueDate: '2024-12-31',
  };

  res.status(200).json({
    success: true,
    data: paymentInfo,
  });
};

