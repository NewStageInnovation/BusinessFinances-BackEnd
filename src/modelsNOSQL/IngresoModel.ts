import mongoose, { Model, Schema } from 'mongoose';

interface IIngreso {
    fecha: Date;
    concepto: string;
    cantidad: number;
    categoria: string;
}

const ingresoSchema = new Schema<IIngreso>({
    fecha: { type: Date, required: true, default: Date.now },
    concepto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    categoria: { type: String, required: true },
});

const IngresoModel: Model<IIngreso> = mongoose.model('Ingreso', ingresoSchema);
export { IIngreso, IngresoModel };