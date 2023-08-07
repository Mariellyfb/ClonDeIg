// Importamos las dependencias.
const uuid = require('uuid');

// Importamos la funcion que devuelve la conexion con la base de datos.
const getDb = require('../../db/getDb');

const insertPostModel = async (description, userId) => {
    let connection;

    try {
        connection = await getDb();

        // Generamos el id del post.
        let postId = uuid.v4();

        // Insertamos el nuevo post.
        await connection.query(
            `INSERT INTO posts(id, description, userId) VALUES(?, ?, ?)`,
            [postId, description, userId]
        );

        // Retornamos el id del post.
        return postId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertPostModel;
