import mongoose, { Model, Schema } from 'mongoose';

interface IDeuda {
    fechaInicio: Date;
    plazos: number;
    monto: number;
    entidad: string;
    interes: number;
}

const deudaSchema = new Schema<IDeuda>({
    fechaInicio: { type: Date, required: true, default: Date.now },
    plazos: { type: Number, required: true },
    monto: { type: Number, required: true },
    entidad: { type: String, required: true },
    interes: { type: Number, required: true },
});

const DeudaModel: Model<IDeuda> = mongoose.model('Deuda', deudaSchema);
export { IDeuda, DeudaModel };