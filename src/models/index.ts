import sequelize from '../config/database';
import Patient from './Patient';
import MedicalSlot from './MedicalSlot';
import Appointment from './Appointment';

Appointment.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
Appointment.belongsTo(MedicalSlot, { foreignKey: 'medicalSlotId', as: 'medicalSlot' });

Patient.hasMany(Appointment, { foreignKey: 'patientId', as: 'appointments' });
MedicalSlot.hasMany(Appointment, { foreignKey: 'medicalSlotId', as: 'appointments' });

export { sequelize, Patient, MedicalSlot, Appointment };

