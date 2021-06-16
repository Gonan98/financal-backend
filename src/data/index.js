import Term from '../models/Term';
import Cost from '../models/Cost';
import Portfolio from '../models/Portfolio';

const initData = async () => {
    const termData = [
        {
            type: "DIARIO"
        },
        {
            type: "QUINCENAL"
        },
        {
            type: "MENSUAL"
        },
        {
            type: "BIMESTRAL"
        },
        {
            type: "TRIMESTRAL"
        },
        {
            type: "CUATRIMESTRAL"
        },
        {
            type: "SEMESTRAL"
        },
        {
            type: "ANUAL"
        }
    ];

    const costData = [
        {
            reason: "Fotocopias"
        },
        {
            reason: "Gastos Administrativos"
        },
        {
            reason: "Seguro"
        },
        {
            reason: "Comisiones"
        },
        {
            reason: "Portes"
        }
    ];

    try {
        await Portfolio.deleteMany({});
        await Term.deleteMany({});
        await Cost.deleteMany({});
        await Term.insertMany(termData);
        await Cost.insertMany(costData);
    } catch (error) {
        console.error(error);
    }
}

export default initData;