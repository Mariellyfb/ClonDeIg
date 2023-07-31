/* eslint-disable no-undef */
const { notFoundError } = require('../../services/errorService');

// Función controladora final que utilizaremos en el middleware de ruta no encontrada.
const notFoundController = (req, res, next) => {
    next(notFoundError('ruta'));
};

module.exports = notFoundController;
