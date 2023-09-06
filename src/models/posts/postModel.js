// Importa la función para obtener la conexión a la base de datos.
const getDb = require('../../db/getDb');

const postExists = async (postId) => {
    let connection;

    try {
        connection = await getDb();

        const [posts] = await connection.query(
            `SELECT id FROM posts WHERE id = ?`,
            [postId]
        );

        return posts.length > 0;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    postExists,
};
