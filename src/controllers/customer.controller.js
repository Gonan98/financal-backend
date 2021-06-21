import Customer from '../models/Customer';

export const getAllCustomer = async (req, res) => {

    const customers = await Customer.find();
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


    const customerDB = await Customer.findOne({ ruc });

    if (customerDB) {
        return res.status(400).json({
            message: 'El cliente ya está registrado'
        });
    }

    let newCustomer = new Customer({
        ruc,
        business_name,
        firstname,
        lastname,
        phone,
        address
    });

    try {
        newCustomer = await newCustomer.save();
        return res.status(201).json({
            message: 'Cliente agregado correctamente',
            data: newCustomer
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error en la base de datos'
        });
    }
}

export const getCustomerById = async (req, res) => {
    const { id } = req.params;

    try {
        const customerDB = await Customer.findById(id);

        if (!customerDB) {
            return res.status(404).json({
                message: `Cliente con ID:${id} no existe`
            });
        }

        return res.status(200).json({
            message: 'Cliente encontrado',
            data: customerDB
        });

    } catch (error) {
        return res.status(400).json({
            message: 'El id no es válido'
        });
    }
}

export const updateCustomer = async (req, res) => {
    const { ruc, business_name, firstname, lastname, phone, address } = req.body;
    const { id } = req.body;

    try {
        const customerDB = await Customer.findByIdAndUpdate(id, {
            ruc, business_name, firstname, lastname, phone, address
        });
        return res.status(200).json({
            message: 'Cliente actualizado',
            data: customerDB
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error en la base de datos'
        });
    }
}