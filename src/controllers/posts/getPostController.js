// Importamos los modelos.
const searchPostModel = require('../../models/posts/searchPostModel');

// Función controladora final que retorna una entrada con un id dado.
const getPostController = async (req, res, next) => {
    try {
        // Obtenemos el id de la entrada.
        const { postId } = req.params;

        // Con la interrogación indicamos
        // a JavaScript que "user" puede ser undefined.
        const post = await searchPostModel(postId, req.user?.id);

        res.send({
            status: 'ok',
            data: {
                post,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getPostController;
