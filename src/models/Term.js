import { Schema, model } from 'mongoose';

const termSchema = new Schema({
    type: {
        type: String,
        enum: [
            'DIARIO',
            'QUINCENAL',
            'MENSUAL',
            'BIMESTRAL',
            'TRIMESTRAL',
            'CUATRIMESTRAL',
            'SEMESTRAL',
            'ANUAL'
        ],
        required: true,
        unique: true
    }
}, {
    timestamps: false
});

const Term = model('Term', termSchema);

export default Term;