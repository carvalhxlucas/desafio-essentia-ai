import { Request, Response } from 'express';
import { Appointment, Patient, MedicalSlot } from '../models';

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { patientId, medicalSlotId } = req.body;

    if (!patientId || !medicalSlotId) {
      res.status(400).json({
        success: false,
        message: 'patientId e medicalSlotId são obrigatórios',
      });
      return;
    }

    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      res.status(404).json({
        success: false,
        message: 'Paciente não encontrado',
      });
      return;
    }

    const medicalSlot = await MedicalSlot.findByPk(medicalSlotId);
    if (!medicalSlot) {
      res.status(404).json({
        success: false,
        message: 'Slot médico não encontrado',
      });
      return;
    }

    if (!medicalSlot.is_available) {
      res.status(400).json({
        success: false,
        message: 'Slot não está disponível',
      });
      return;
    }

    const appointment = await Appointment.create({
      patientId,
      medicalSlotId,
      status: 'confirmed',
    });

    await medicalSlot.update({ is_available: false });

    const appointmentWithRelations = await Appointment.findByPk(appointment.id, {
      include: [
        { model: Patient, as: 'patient' },
        { model: MedicalSlot, as: 'medicalSlot' },
      ],
    });

    res.status(201).json({
      success: true,
      data: appointmentWithRelations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar agendamento',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
};

export const cancelAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      res.status(400).json({
        success: false,
        message: 'appointmentId é obrigatório',
      });
      return;
    }

    const appointment = await Appointment.findByPk(appointmentId, {
      include: [{ model: MedicalSlot, as: 'medicalSlot' }],
    });

    if (!appointment) {
      res.status(404).json({
        success: false,
        message: 'Agendamento não encontrado',
      });
      return;
    }

    if (appointment.status === 'cancelled') {
      res.status(400).json({
        success: false,
        message: 'Agendamento já foi cancelado',
      });
      return;
    }

    await appointment.update({ status: 'cancelled' });

    if (appointment.medicalSlot) {
      await appointment.medicalSlot.update({ is_available: true });
    }

    const updatedAppointment = await Appointment.findByPk(appointmentId, {
      include: [
        { model: Patient, as: 'patient' },
        { model: MedicalSlot, as: 'medicalSlot' },
      ],
    });

    res.status(200).json({
      success: true,
      data: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao cancelar agendamento',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
};

