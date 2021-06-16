import { Schema, model } from 'mongoose';

const letterSchema = new Schema({
    issue_date: {
        type: Date,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    retention: {
        type: Number,
        default: 0
    },
    amount: {
        type: Number,
        required: true,
        min: 100
    },
    portfolio_id: {
        ref: 'Portfolio',
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: false
});

const Letter = model('Letter', letterSchema);

export default Letter;