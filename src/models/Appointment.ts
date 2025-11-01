import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Appointment extends Model {
  public id!: number;
  public status!: 'confirmed' | 'cancelled';
  public patientId!: number;
  public medicalSlotId!: number;
}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['confirmed', 'cancelled']],
      },
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patients',
        key: 'id',
      },
    },
    medicalSlotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'medical_slots',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'appointments',
    timestamps: false,
  }
);

export default Appointment;

