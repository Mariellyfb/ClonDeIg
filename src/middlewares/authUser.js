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
            notAuthenticatedError(next);
        }

        let tokenInfo;

        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (err) {
            invalidCredentialsError();
        }

        req.user = tokenInfo;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;
