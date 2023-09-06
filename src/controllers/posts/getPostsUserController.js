// Importamos los modelos.
const { searchPostsUserModel } = require('../../models/posts');

// Función controladora final que retorna una entrada con un id dado.
const getPostController = async (req, res, next) => {
    try {
        // Obtenemos el id de la entrada.
        const { userId } = req.params;

        const post = await searchPostsUserModel(userId);

        res.send({
            status: 'ok',
            data: post,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getPostController;
