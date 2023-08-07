// Importamos la base de datos.
const getDb = require('../db/getDb');

// Importamos los errores.
const { notFoundError } = require('../services/errorService');

const postExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();

        // Obtenemos el id de la entrada de los path params.
        const { postId } = req.params;

        const [posts] = await connection.query(
            `SELECT id FROM posts WHERE id = ?`,
            [postId]
        );

        // Lanzamos un error si la entrada no existe.
        if (posts.length < 1) {
            notFoundError('post');
        }

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = postExists;
