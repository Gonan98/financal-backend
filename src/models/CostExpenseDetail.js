import { Schema, model } from 'mongoose';

const costExpenseDetail = new Schema({
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
    cost_expense_id: {
        ref: 'CostExpense',
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const CostExpenseDetail = model('CostExpenseDetail', costExpenseDetail);