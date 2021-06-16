import { Schema, model } from 'mongoose';

const portfolioSchema = new Schema({
    discount_date: {
        type: Date,
        required: true
    },
    rate: {
        type: Number,
        max: 1,
        required: true
    },
    capitalization: {
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
        ]
    },
    currency: {
        type: String,
        enum: [
            'SOLES',
            'DOLARES'
        ],
        required: true
    },
    days: {
        type: Number,
        enum: [360, 365],
        default: 360
    },
    active: {
        type: Boolean,
        default: true
    },
    term_id: {
        ref: 'Term',
        type: Schema.Types.ObjectId,
        required: true
    },
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

const Portfolio = model('Portfolio', portfolioSchema);

export default Portfolio;