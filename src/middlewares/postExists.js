const postModel = require('../models/posts/postModel');

// Importamos los errores.
const { notFoundError } = require('../services/errorService');

const postExists = async (req, res, next) => {
    try {
        // Obtenemos el id de la entrada de los path params.
        const { postId } = req.params;

        const exists = await postModel.postExists(postId);

        // Lanzamos un error si la entrada no existe.
        if (!exists) {
            notFoundError('post');
        }

        // Pasamos el control a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = postExists;
