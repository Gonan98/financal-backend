import Customer from '../models/Customer';
import Operation from '../models/Operation';

export const getAllCustomer = async (req, res) => {

    const operations = await Operation.find({ user_id: req.user_id });
    const ids = operations.map(o => o.customer_id);
    const customers = await Customer.find({ _id: { $in: ids } });
    return res.status(200).json({
        message: 'Lista de clientes',
        data: customers
    });

}

export const addCustomer = async (req, res) => {
    const { ruc, business_name, firstname, lastname, phone, address } = req.body;

    if (!ruc || !business_name || !firstname || !lastname || !phone || !address) {
        return res.status(400).json({
            message: 'Faltan datos del cliente'
        });
    }

    try {
        let customer = await Customer.findOne({ $or: [{ ruc }, { business_name }] });

        if (!customer) {

            customer = new Customer({
                ruc,
                business_name,
                firstname,
                lastname,
                phone,
                address
            });

            customer = await customer.save();

        } else {

            if (customer.business_name !== business_name || customer.ruc !== ruc) {
                return res.status(400).json({
                    message: 'El ruc y la razon social no coinciden'
                });
            }

        }


        let operation = await Operation.findOne({ customer_id: customer._id, user_id: req.user_id });

        if (operation) {
            return res.status(400).json({
                message: 'El cliente ya fue registrado'
            });
        }

        operation = new Operation({
            customer_id: customer._id,
            user_id: req.user_id
        });

        await operation.save();

        res.status(201).json({
            message: 'Cliente registrado correctamente'
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Error al registrar el cliente'
        });
    }
}

export const getCustomerById = async (req, res) => {
    const { id } = req.params;

    try {
        const operation = await Operation.findOne({ customer_id: id, user_id: req.user_id });

        if (!operation) {
            return res.status(404).json({
                message: `Cliente no registrado`
            });
        }

        const customer = await Customer.findById(operation.customer_id);

        return res.status(200).json({
            message: 'Cliente encontrado',
            data: customer
        });

    } catch (error) {
        return res.status(400).json({
            message: 'El id no es válido'
        });
    }
}

export const updateCustomer = async (req, res) => {

    res.status(200).json({
        message: 'updateCustomer'
    });

}