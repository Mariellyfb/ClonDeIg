// Importa la función para obtener la conexión a la base de datos.
const getDb = require('../../db/getDb');

const userExists = async (userId) => {
    let connection;

    try {
        connection = await getDb();

        const [users] = await connection.query(
            `SELECT id FROM users WHERE id = ?`,
            [userId]
        );

        return users.length > 0;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    userExists,
};
