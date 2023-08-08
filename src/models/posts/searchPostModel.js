// Importamos la función que nos permite obtener una conexión libre con la base de datos.
const getDB = require('../../db/getDb');

// Importamos los errores.
const { notFoundError } = require('../../services/errorService');

// Función que realiza una consulta a la base de datos para obtener los post de un usuario en concreto.
const searchPostIdModel = async (userId, postId = 0) => {
    let connection;

    try {
        connection = await getDB();

        const [posts] = await connection.query(
            `
                SELECT
                    P.id,
                    P.description,
                    P.photo,
                    U.username,
                    P.userId,
                    P.createdAt
                FROM posts P
                INNER JOIN users U ON U.id = P.userId
                WHERE P.id = ?
                GROUP BY U.id
                ORDER BY P.createdAt DESC
            `,
            [userId, postId]
        );

        // Si no hay posts para mostrar lanzamos un error.
        if (posts.length < 1) {
            notFoundError();
        }

        // Si el usuario tiene algun post, lo obtenemos.
        for (const post of posts) {
            const [posts] = await connection.query(
                `SELECT id, description, photo FROM posts WHERE id = ?`,
                [post.id]
            );

            // Agregamos los posts a la entrada.
            posts.post = posts;
        }
        return posts;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = searchPostIdModel;
