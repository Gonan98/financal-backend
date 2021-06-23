import { Schema, model } from 'mongoose';

const letterDetailSchema = new Schema({
    reason: {
        type: String,
        enum: [
            'Fotocopias',
            'Portes',
            'Comisiones',
            'Gastos Administrativos',
            'Seguro',
            'Otros gastos'
        ],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    moment: {
        type: String,
        enum: ['INICIO', 'FINAL'],
        required: true,
    },
    letter_id: {
        ref: 'Letter',
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const LetterDetail = model('LetterDetail', letterDetailSchema);

export default LetterDetail;