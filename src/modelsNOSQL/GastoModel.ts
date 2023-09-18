import mongoose, { Model, Schema } from 'mongoose';

interface IGasto {
    fecha: Date;
    concepto: string;
    cantidad: number;
    categoria: string;
}

const gastoSchema = new Schema<IGasto>({
    fecha: { type: Date, required: true, default: Date.now },
    concepto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    categoria: { type: String, required: true },
});

const GastoModel: Model<IGasto> = mongoose.model('Gasto', gastoSchema);
export { IGasto, GastoModel };