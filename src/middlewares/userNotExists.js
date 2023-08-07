// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDB = require('../db/getDb');

// Importamos los errores.
const { notFoundError } = require('../services/errorService');

// Función controladora intermedia que lanza un error si no existe el usuario con el id establecido.
const userNotExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const userId = req.user?.id || req.params.userId;

        const [users] = await connection.query(
            `SELECT id FROM users WHERE id = ?`,
            [userId]
        );

        // Lanzamos un error si el usuario no existe.
        if (users.length < 1) {
            notFoundError();
        }

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = userNotExists;
