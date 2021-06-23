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
        return res.status(404).json({
            message: 'Cliente del usuario actual no encontrado'
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
        return res.status(500).json({
            message: 'Error en la base de datos'
        });
    }
}

export const getPortfolioById = async (req, res) => {
    const { id } = req.params;

    try {
        const portfolio = await Portfolio.findById(id);

        if (!portfolio) {
            return res.status(404).json({
                message: `Cartera con Id:${id} no existe`
            });
        }

        const operation = await Operation.findById(portfolio.operation_id);

        if (operation.user_id !== req.user_id) {
            return res.status(401).json({
                message: 'No tiene acceso a esta cartera'
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
            message: `Cliente no registrado`
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
        const portfolioDB = await Portfolio.findByIdAndUpdate(id, { active: false });

        return res.status(200).json({
            message: `Cartera eliminada`,
            data: portfolioDB
        });
    } catch (error) {
        return res.status(500).json({
            message: 'No se puedo eliminar la cartera'
        });
    }

}