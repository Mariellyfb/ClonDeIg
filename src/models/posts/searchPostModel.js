const getDb = require('../../db/getDb');

const { notFoundError } = require('../../services/errorService');

const searchPostModel = async (postId) => {
    let connection;

    try {
        connection = await getDb();

        const [postResults] = await connection.query(
            `
            SELECT 
            P.id,
            P.description,
            P.photo,
            U.username AS postOwnerUsername,
            P.userId AS postOwnerId,
            P.createdAt,
            COUNT(P.id)AS numLikes
            FROM posts P
            INNER JOIN users U ON U.id = P.userId
            LEFT JOIN likes L ON P.id = L.postId
          WHERE P.id = ?
          GROUP BY P.id
          ORDER BY P.createdAt DESC
            `,
            [postId]
        );

        // Si no hay posts para mostrar lanzamos un error.
        if (postResults.length < 1) {
            notFoundError();
        }

        const post = postResults[0];
        return post;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = searchPostModel;
