import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';

export const signUp = async (req, res) => {
    const { ruc, business_name, email, password } = req.body;

    if (!ruc || !business_name || !email || !password) {
        return res.status(400).json({
            message: 'Faltan datos'
        });
    }

    const userDB = await User.findOne({ email });

    if (userDB) {
        return res.status(400).json({
            message: 'El email ya está registrado'
        });
    }

    const newUser = new User({
        ruc,
        business_name,
        email,
        password
    });

    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();

    return res.status(201).json({
        auth: true,
        message: 'Usuario registrado correctamente'
    });
}

export const signIn = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            auth: false,
            message: 'Faltan datos'
        });
    }

    const userDB = await User.findOne({ email });

    if (!userDB) {
        return res.status(400).json({
            auth: false,
            message: 'Email o contraseña incorrectos'
        });
    }

    const validation = await userDB.validatePassword(password);

    if (!validation) {
        return res.status(400).json({
            auth: false,
            message: 'Email o contraseña incorrectos'
        });
    }

    const token = jwt.sign({ id: userDB._id }, config.token_secret, { expiresIn: 36000 });

    return res.status(200).json({
        auth: true,
        token: `Bearer ${token}`
    });
}

export const getProfile = async (req, res) => {
    const userDB = await User.findById(req.user_id, { password: 0 });
    if (!userDB) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }
    return res.status(200).json({
        message: 'Perfil de usuario actual',
        data: userDB
    });
}