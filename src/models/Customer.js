import { Schema, model } from 'mongoose';

const customerSchema = new Schema({
    ruc: {
        type: String,
        minLength: 11,
        maxLength: 11,
        unique: true,
        required: true
    },
    business_name: {
        type: String,
        maxLength: 30,
        minLength: 3,
        required: true
    },
    firstname: {
        type: String,
        maxLength: 30,
        minLength: 3,
        required: true
    },
    lastname: {
        type: String,
        maxLength: 30,
        minLength: 3,
        required: true
    },
    phone: {
        type: String,
        maxLength: 9,
        minLength: 9,
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