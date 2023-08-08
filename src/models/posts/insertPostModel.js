// Importamos la funcion que devuelve la conexion con la base de datos.
const getDb = require('../../db/getDb');

const insertPostModel = async (description, fotoName, userId) => {
    let connection;

    try {
        connection = await getDb();

        // Insertamos el nuevo post.
        const [post] = await connection.query(
            `INSERT INTO posts( description, photo, userId) VALUES( ?, ?, ?)`,
            [description, fotoName, userId]
        );

        // Retornamos el id del post.
        return post.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertPostModel;
