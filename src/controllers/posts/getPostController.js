// Importamos los modelos.
const { searchAllPostModel } = require('../../models/posts');

// Función controladora final que retorna una entrada con un id dado.
const getPostsController = async (req, res, next) => {
    try {
        const post = await searchAllPostModel();

        res.send({
            status: 'ok',
            data: post,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getPostsController;
