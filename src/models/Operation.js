import { Schema, model } from 'mongoose';

const operationSchema = new Schema({
    customer_id: {
        ref: 'Customer',
        type: Schema.Types.ObjectId,
        required: true
    },
    user_id: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const Operation = model('Operation', operationSchema);

export default Operation;