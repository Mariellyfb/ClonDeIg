const getDb = require('../../db/getDb');

const { notFoundError } = require('../../services/errorService');

const searchAllPostModel = async () => {
    let connection;

    try {
        connection = await getDb();

        const [posts] = await connection.query(
            `
        SELECT * FROM posts
        ORDER BY createdAt DESC
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

const searchPostHome = async (req, res, next) => {
    try {
        const posts = await searchAllPostModel();

        res.send({
            status: 'ok',
            data: {
                posts,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = searchPostHome;
