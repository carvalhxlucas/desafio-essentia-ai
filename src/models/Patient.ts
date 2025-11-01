import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Patient extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
}

Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'patients',
    timestamps: false,
  }
);

export default Patient;

