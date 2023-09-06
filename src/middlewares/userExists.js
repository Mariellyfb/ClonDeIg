const userModel = require('../models/users/userModel');
// Importamos los errores.
const { notFoundError } = require('../services/errorService');

// Función controladora intermedia que lanza un error si no existe el usuario con el id establecido.
const userExists = async (req, res, next) => {
    let connection;

    try {
        const userId = req.user?.id || req.params.userId;
        const exists = await userModel.userExists(userId);

        // Lanzamos un error si el usuario no existe.
        if (!exists) {
            notFoundError();
        }

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = userExists;
