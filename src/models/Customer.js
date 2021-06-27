import { Schema, model } from 'mongoose';

const customerSchema = new Schema({
    ruc: {
        type: String,
        unique: true,
        required: true
    },
    business_name: {
        type: String,
        unique: true,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        maxLength: 70,
        required: true
    }
}, {
    timestamps: true
});

const Customer = model('Customer', customerSchema);

export default Customer;