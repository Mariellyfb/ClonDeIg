const jwt = require('jsonwebtoken');
// Importamos los errores.
const {
    notAuthenticatedError,
    invalidCredentialsError,
} = require('../services/errorService');

const authUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            notAuthenticatedError();
        }

        // variable que almacenara el token

        let tokenInfo;

        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (err) {
            console.log(err);
            invalidCredentialsError();
        }
        // Creamos la propiedad 'user' en el objeto "request"
        req.user = tokenInfo;
        // pasamos a la siguiente funcion
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;
