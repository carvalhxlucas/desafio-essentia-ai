import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class MedicalSlot extends Model {
  public id!: number;
  public start_time!: Date;
  public end_time!: Date;
  public is_available!: boolean;
}

MedicalSlot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'medical_slots',
    timestamps: false,
  }
);

export default MedicalSlot;

