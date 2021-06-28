import { Schema, model } from 'mongoose';

const portfolioDetailSchema = new Schema({
    reason: {
        type: String,
        enum: [
            'FOTOCOPIAS',
            'PORTES',
            'COMISIONES',
            'GASTOS ADMINISTRATIVOS',
            'SEGURO',
            'OTROS GASTOS'
        ],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    moment: {
        type: String,
        enum: ['INICIAL', 'FINAL'],
        required: true,
    },
    portfolio_id: {
        ref: 'Portfolio',
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const PortfolioDetail = model('PortfolioDetail', portfolioDetailSchema);

export default PortfolioDetail;