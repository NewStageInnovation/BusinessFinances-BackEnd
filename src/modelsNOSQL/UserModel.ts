// Importa las bibliotecas necesarias
import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { IDeuda, DeudaModel } from './DeudaModel';
import { IGasto, GastoModel } from './GastoModel';
import { IIngreso, IngresoModel } from './IngresoModel';

interface IUser {
  cognitoId: string;
  correo: string;
  gastos: Types.DocumentArray<IGasto>;
  ingresos: Types.DocumentArray<IIngreso>;
  deudas: Types.DocumentArray<IDeuda>;
}

const userSchema = new Schema<IUser>({
    cognitoId: { type: String, required: true },
    correo: { type: String, required: true, unique: true,},
    gastos: { type: [GastoModel.schema], required: false, default: [] },
    ingresos: { type: [IngresoModel.schema], required: false, default: [] },
    deudas: { type: [DeudaModel.schema], required: false, default: [] },
});


const UserModel: Model<IUser> = mongoose.model('User', userSchema);
export { IUser, UserModel };
