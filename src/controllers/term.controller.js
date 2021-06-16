import Term from '../models/Term';

export const getAllTerms = async (req, res) => {

    const termsDB = await Term.find();
    return res.status(200).json({
        message: 'Lista de plazos disponibles',
        data: termsDB
    });

}