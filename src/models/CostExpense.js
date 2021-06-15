import { Schema, model } from 'mongoose';

const costExpenseSchema = new Schema({
    reason: {
        type: String,
        required: true,
        unique: true,
        minLenght: 3
    }
}, {
    timestamps: false
});

const CostExpense = model('CostExpense', costExpenseSchema);

export default CostExpense;