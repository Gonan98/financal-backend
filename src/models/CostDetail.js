import { Schema, model } from 'mongoose';

const costDetailSchema = new Schema({
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
    letra_id: {
        ref: 'Letter',
        type: Schema.Types.ObjectId,
        required: true
    },
    cost_id: {
        ref: 'Cost',
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const CostDetail = model('CostDetail', costDetailSchema);