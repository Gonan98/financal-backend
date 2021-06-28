import Operation from '../models/Operation';
import Portfolio from '../models/Portfolio';
import PortfolioDetail from '../models/PortfolioDetail';

export const createDetail = async (req, res) => {
    const { reason, amount, moment, portfolio_id } = req.body;

    if (!reason || !amount || !moment || !portfolio_id) {
        return res.status(400).json({
            message: 'Faltan datos'
        });
    }

    try {
        const operations = await Operation.find({ user_id: req.user_id });

        if (!operations) {
            return res.status(404).json({
                message: 'Debe registrar un cliente y una cartera primero'
            });
        }

        const ids = operations.map(o => o._id);
        const portfolio = await Portfolio.findOne({ _id: portfolio_id, operation_id: { $in: ids } });

        if (!portfolio) {
            return res.status(404).json({
                message: 'Cartera no existe o no tiene acceso a ella'
            });
        }

        let detail = await PortfolioDetail.findOne({ reason, portfolio_id: portfolio._id });

        if (detail) {
            return res.status(400).json({
                message: 'Ya existe un detalle con esa razón'
            });
        }

        detail = new PortfolioDetail({
            reason,
            amount,
            moment,
            portfolio_id
        });

        await detail.save();
        res.status(201).json({
            message: 'Detalle agregado correctamente'
        });

    } catch (e) {
        res.status(500).json({
            message: 'Error en la base de datos'
        });
    }

}

export const getDetailsByPortfolioId = async (req, res) => {

    const { portfolioId } = req.params;

    try {
        const portfolio = await Portfolio.findById(portfolioId);

        if (!portfolio) {
            return res.status(404).json({
                message: 'La cartera no existe'
            });
        }

        const details = await PortfolioDetail.find({ portfolio_id: portfolioId });

        return res.status(200).json({
            message: 'Detalle de costos de la cartera',
            data: details
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Error en el servidor'
        });
    }

}