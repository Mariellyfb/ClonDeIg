// Importamos los modelos.
const { searchPostModel } = require('../../models/posts');

// Función controladora final que retorna una entrada con un id dado.
const getPostController = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const post = await searchPostModel(postId);

        res.send({
            status: 'ok',
            data: post,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getPostController;
