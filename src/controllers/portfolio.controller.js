import Operation from '../models/Operation';
import Portfolio from '../models/Portfolio';

export const createPortfolio = async (req, res) => {
    const { discount_date, rate, capitalization, currency, days, term, customer_id } = req.body

    if (!discount_date || !rate || !currency || !term || !customer_id) {
        return res.status(400).json({
            message: 'Faltan datos de la cartera'
        });
    }

    const operation = await Operation.findOne({ customer_id, user_id: req.user_id });

    if (!operation) {
        return res.status(400).json({
            message: 'No tiene registrado a ese cliente'
        });
    }

    let portfolioDB = await Portfolio.findOne({
        discount_date,
        operation_id: operation._id
    });

    if (portfolioDB) {
        return res.status(400).json({
            message: 'La cartera ya está registrada'
        });
    }

    portfolioDB = new Portfolio({
        discount_date,
        rate,
        capitalization,
        currency,
        days,
        term,
        operation_id: operation._id
    });

    try {
        await portfolioDB.save();
        return res.status(201).json({
            message: 'Cartera creada correctamente'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error en la base de datos'
        });
    }
}

export const getPortfolioById = async (req, res) => {
    const { id } = req.params;

    try {

        const operation = await Operation.find({ user_id: req.user_id });

        if (!operation) {
            return res.status(404).json({
                message: 'No tiene clientes para ver una cartera'
            });
        }

        const operationIds = operation.map(o => o._id);
        const portfolio = await Portfolio.findOne({ _id: id, operation_id: { $in: operationIds } });

        if (!portfolio) {
            return res.status(404).json({
                message: `Cartera con Id:${id} no existe o no tiene acceso a ella`
            });
        }

        return res.status(200).json({
            message: 'Cartera encontrada',
            data: portfolio
        });

    } catch (e) {
        return res.status(500).json({
            message: 'Error en el servidor'
        });
    }
}

export const getPortfolioByCustomerId = async (req, res) => {
    const { customerId } = req.params;

    const operation = await Operation.findOne({ customer_id: customerId, user_id: req.user_id });

    if (!operation) {
        return res.status(404).json({
            message: `No tiene al cliente registrado`
        });
    }

    const portfolios = await Portfolio.find({ operation_id: operation._id });

    if (!portfolios) {
        return res.status(404).json({
            message: `El cliente no tiene carteras`
        });
    }

    return res.status(200).json({
        message: `Carteras del cliente ${customerId}`,
        data: portfolios
    });
}

export const deletePortfolio = async (req, res) => {
    const { id } = req.params;

    try {

        const operation = await Operation.find({ user_id: req.user_id });

        if (!operation) {
            return res.status(404).json({
                message: 'No tiene clientes para ver una cartera'
            });
        }

        const operationIds = operation.map(o => o._id);
        const portfolio = await Portfolio.findOne({ _id: id, operation_id: { $in: operationIds } });

        if (!portfolio) {
            return res.status(404).json({
                message: `Cartera con Id:${id} no existe o no tiene accesoa ella`
            });
        }

        portfolio.active = false;

        await portfolio.save();

        return res.status(200).json({
            message: `Cartera eliminada`
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar la cartera'
        });
    }

}