// Importa las bibliotecas necesarias
import mongoose, { Document, Model, Schema, Types } from 'mongoose';

interface IGasto {
  fecha: Date;
  concepto: string;
  categoria: string;
  cantidad: number;
}

interface IIngreso {
  fecha: Date;
  concepto: string;
  categoria: string;
  cantidad: number;
}

interface IDeuda {
  fechaInicio: Date;
  plazos: number;
  monto: number;
  entidad: string;
  interes: number;
}

interface IUser {
  cognitoId: string;
  correo: string;
  gastos: Types.DocumentArray<IGasto>;
  ingresos: Types.DocumentArray<IIngreso>;
  deudas: Types.DocumentArray<IDeuda>;
}


const userSchema = new Schema<IUser>({
    cognitoId: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
    },
    gastos: {
        type: [{
            fecha: {
                type: Date,
                required: true,
            },
            concepto: {
                type: String,
                required: true,
            },
            categoria: {
                type: String,
                required: true,
            },
            cantidad: {
                type: Number,
                required: true,
            },
        }],
        required: false,
        default: [],
    },
    ingresos: {
        type: [{
            fecha: {
                type: Date,
                required: true,
            },
            concepto: {
                type: String,
                required: true,
            },
            categoria: {
                type: String,
                required: true,
            },
            cantidad: {
                type: Number,
                required: true,
            },
        }],
        required: false,
        default: [],
    },
    deudas: {
        type: [{
            fechaInicio: {
                type: Date,
                required: true,
            },
            plazos: {
                type: Number,
                required: true,
            },
            monto: {
                type: Number,
                required: true,
            },
            entidad: {
                type: String,
                required: true,
            },
            interes: {
                type: Number,
                required: true,
            },
        }],
        required: false,
        default: [],
    },
});


const UserModel: Model<IUser> = mongoose.model('User', userSchema);

export { IUser, UserModel };
