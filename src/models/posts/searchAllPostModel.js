const getDb = require('../../db/getDb');

const { notFoundError } = require('../../services/errorService');

const searchAllPostModel = async () => {
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
            P.createdAt,
            L.postId,
            SUM(CASE WHEN L.postId IS NULL THEN 0 ELSE 1 END) AS numLikes
        FROM posts P
        INNER JOIN users U ON U.id = P.userId
        LEFT JOIN likes L ON P.id = L.postId
      GROUP BY P.id
        ORDER BY P.createdAt DESC
        `
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

module.exports = searchAllPostModel;
