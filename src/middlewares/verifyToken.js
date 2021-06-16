import jwt from 'jsonwebtoken';
import config from '../config'

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            auth: false,
            message: 'Debe autenticarse'
        });
    }

    const [bearer, token] = authorization.split(' ');

    if (!bearer || !token) {
        return res.status(401).json({
            auth: false,
            message: 'Estructura incorrecta de token'
        });
    }

    try {
        const payload = jwt.verify(token, config.token_secret);
        req.user_id = payload.id;
        next();
    } catch (error) {
        return res.status(401).json({
            auth: false,
            message: 'Token no válido'
        });
    }

}

export default verifyToken;