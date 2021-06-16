import Cost from '../models/Cost';

export const getAllCosts = async (req, res) => {

    const costs = await Cost.find();
    return res.status(200).json({
        message: 'Lista de costos disponibles',
        data: costs
    });

}