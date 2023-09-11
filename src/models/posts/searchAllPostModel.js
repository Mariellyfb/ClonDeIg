const getDb = require('../../db/getDb');

const { notFoundError } = require('../../services/errorService');

const searchAllPostModel = async (keyword = '', userId = '') => {
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
            Bit_OR(L.userId = ?) AS likedByMe,
            P.userId,
            P.userId = ? AS owner,
            P.createdAt,
            L.postId,
            SUM(CASE WHEN L.postId IS NULL THEN 0 ELSE 1 END) AS numLikes
        FROM posts P
        INNER JOIN users U ON U.id = P.userId
        LEFT JOIN likes L ON P.id = L.postId
        GROUP BY P.id
        ORDER BY P.createdAt DESC
        `,
            [userId, userId, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
        );

        // Si no hay posts para mostrar lanzamos un error.
        if (posts.length < 1) {
            notFoundError();
        }

        for (const post of posts) {
            console.log(`Post ID: ${post.id}`);
            console.log(`Description: ${post.description}`);
            console.log(`Liked by Me: ${post.likedByMe}`);
        }
        return posts;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = searchAllPostModel;
