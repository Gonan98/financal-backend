import Customer from '../models/Customer';
import Portfolio from '../models/Portfolio';
import Term from '../models/Term';

export const createPortfolio = async (req, res) => {
    const { discount_date, rate, capitalization, currency, days, term_id, customer_id } = req.body

    if (!discount_date || !rate || !currency || !term_id || !customer_id) {
        return res.status(400).json({
            message: 'Faltan datos'
        });
    }

    const termDB = await Term.findById(term_id);

    if (!termDB) {
        return res.status(404).json({
            message: 'Plazo no encontrado'
        });
    }

    const customerDB = await Customer.findById(customer_id);

    if (!customerDB) {
        return res.status(404).json({
            message: 'Cliente no encontrado'
        });
    }

    let portfolioDB = await Portfolio.findOne({
        discount_date,
        rate,
        capitalization,
        currency,
        days,
        term_id,
        customer_id,
        user_id: req.user_id
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
        term_id,
        customer_id,
        user_id: req.user_id
    });

    try {
        portfolioDB = await portfolioDB.save();
        return res.status(200).json({
            message: 'Cartera creada correctamente',
            data: portfolioDB
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error en la base de datos'
        });
    }
}

export const getPortfolioBydId = async (req, res) => {
    const { id } = req.params;

    const portfolioDB = await Portfolio.findById(id);

    if (!portfolioDB) {
        return res.status(404).json({
            message: 'Cartera no encontrada'
        });
    }

    return res.status(200).json({
        message: 'Cartera encontrada',
        data: portfolioDB
    });
}

export const getPortfolioByCustomerId = async (req, res) => {
    const { customerId } = req.params;

    const portfoliosDB = await Portfolio.find({ customer_id: customerId });

    return res.status(200).json({
        message: `Carteras del cliente ${customerId}`,
        data: portfoliosDB
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