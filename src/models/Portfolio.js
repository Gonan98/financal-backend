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
        type: Number,
        enum: [
            1,
            15,
            30,
            60,
            90,
            120,
            180,
            360
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
    term: {
        type: Number,
        enum: [
            1,
            15,
            30,
            60,
            90,
            120,
            180,
            360
        ],
        required: true
    },
    operation_id: {
        ref: 'Operation',
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const Portfolio = model('Portfolio', portfolioSchema);

export default Portfolio;