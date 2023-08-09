// Importamos los modelos.
const { searchPostModel, insertLikeModel } = require('../../models/posts');

// Importamos los errores.
const { cannotLikeOwnPostError } = require('../../services/errorService');

// Función controladora final que permite votar una entrada.
const likePostController = async (req, res, next) => {
    try {
        const { postId } = req.params;

        // Obtenemos los detalles de la entrada.
        const post = await searchPostModel(postId);

        // Si somos los dueños de la entrada lanzamos un error.
        if (post[0].userId === req.user.id) {
            cannotLikeOwnPostError();
        }

        // Insertamos el like y obtenemos la cantidad modificada.
        const likeAvg = await insertLikeModel(postId, req.user.id);

        res.send({
            status: 'ok',
            data: {
                likeAvg,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = likePostController;
