const getDb = require('../../db/getDb');

const { notFoundError } = require('../../services/errorService');

const selectUserByIdModel = async (userId) => {
    let connection;

    try {
        connection = await getDb();

        // Comprobamos si hay algun usuario con el email proporcionado.
        const [users] = await connection.query(
            `SELECT id, username, email, createdAt FROM users WHERE id = ?`,
            [userId]
        );

        // Si no existe un usuario lanzamos un error.
        if (users.length < 1) {
            notFoundError();
        }

        // El array de usuarios solo podra contener un unico usuario.
        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdModel;
