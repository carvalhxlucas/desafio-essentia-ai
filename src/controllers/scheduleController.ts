import { Request, Response } from 'express';
import { MedicalSlot } from '../models';

export const getAvailableSlots = async (req: Request, res: Response): Promise<void> => {
  try {
    const availableSlots = await MedicalSlot.findAll({
      where: {
        is_available: true,
      },
      order: [['start_time', 'ASC']],
    });

    res.status(200).json({
      success: true,
      data: availableSlots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar slots disponíveis',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
};

