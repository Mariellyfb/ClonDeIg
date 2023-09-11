// Importamos los modelos y errores.
const { searchPostModel, insertLikeModel } = require('../../models/posts');
const { cannotLikeOwnPostError } = require('../../services/errorService');

// Función controladora final que permite votar una entrada.
const likePostController = async (req, res, next) => {
    try {
        const { postId } = req.params;

        // Obtenemos los detalles de la entrada.
        const post = await searchPostModel(postId);

        // Si somos los dueños de la entrada lanzamos un error.
        if (post.userId === req.user.id) {
            cannotLikeOwnPostError();
        }

        // Insertamos el like y obtenemos el número de likes.
        const numLike = await insertLikeModel(postId, req.user.id);

        res.send({
            status: 'ok',
            data: numLike,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = likePostController;
