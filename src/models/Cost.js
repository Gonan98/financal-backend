import { Schema, model } from 'mongoose';

const costSchema = new Schema({
    reason: {
        type: String,
        required: true,
        unique: true,
        minLenght: 3
    }
}, {
    timestamps: false
});

const Cost = model('Cost', costSchema);

export default Cost;