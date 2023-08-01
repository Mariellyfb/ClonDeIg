// Importamos las dependencias.
const uuid = require('uuid');

// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Función que realiza una consulta a la base de datos para agregar una nueva entrada.
const insertPostModel = async (description, photo, userId) => {
    let connection;

    try {
        connection = await getDb();

        // Generamos el id de la entrada.
        const postId = uuid.v4();

        // Insertamos la entrada.
        await connection.query(
            `INSERT INTO post(id, description, photo, userId) VALUES(?, ?, ?, ?)`,
            [postId, description, photo, userId]
        );

        return postId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertPostModel;
