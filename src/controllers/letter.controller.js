import Portfolio from '../models/Portfolio';
import Letter from '../models/Letter';
import Operation from '../models/Operation';

export const addLetter = async (req, res) => {
    const {
        issue_date,
        due_date,
        retention,
        amount,
        portfolio_id
    } = req.body;

    if (!issue_date || !due_date || !amount || !portfolio_id) {
        return res.status(400).json({
            message: 'Faltan datos de la letra'
        });
    }

    const portfolioDB = await Portfolio.findById(portfolio_id);

    if (!portfolioDB) {
        return res.status(404).json({
            message: `Cartera con ID:${portfolio_id} no existe`
        });
    }

    const operation = await Operation.findById(portfolioDB.operation_id);

    if (operation.user_id !== req.user_id) {
        return res.status(400).json({
            message: 'La cartera no ha sido registrada por usted'
        });
    }

    const issueDate = new Date(issue_date);
    const dueDate = new Date(due_date);

    if (issueDate.getTime() > dueDate.getTime() || portfolioDB.discount_date.getTime() >= dueDate.getTime() || portfolioDB.discount_date.getTime() <= issueDate.getTime()) {
        return res.status(400).json({
            message: 'Fechas incorrectas'
        });
    }

    const newLetter = new Letter({
        issue_date,
        due_date,
        retention,
        amount,
        portfolio_id
    });

    try {
        await newLetter.save();
        return res.status(201).json({
            message: 'Letra agregada correctamente'
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Error al crear la letra'
        });
    }
}

export const getLettersByPortfolioId = async (req, res) => {
    const { portfolioId } = req.params;

    const portfolio = await Portfolio.findById(portfolioId);

    if (!portfolio) {
        return res.status(404).json({
            message: `Cartera con ID:${portfolioId} no existe`
        });
    }

    const operation = await Operation.findById(portfolio.operation_id);

    if (operation.user_id !== req.user_id) {
        return res.status(404).json({
            message: `La cartera no ha sido registrada por ustede`
        });
    }

    const letters = await Letter.find({ portfolio_id: portfolioId });

    return res.status(200).json({
        message: 'Letras de la cartera ' + portfolioId,
        data: letters
    });
}