const getDb = require('../../db/getDb');

const { notFoundError } = require('../../services/errorService');

const searchPostModel = async (postId) => {
    let connection;

    try {
        connection = await getDb();

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
        ORDER BY P.createdAt DESC
        `, [postId]
        );

        // Si no hay posts para mostrar lanzamos un error.
        if (posts.length < 1) {
            notFoundError();
        }
        return posts;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = searchPostModel;
