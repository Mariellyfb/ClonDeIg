// Importamos los modelos.
const { searchAllPostModel } = require('../../models/posts');

// Función controladora final que retorna una entrada con un id dado.
const getPostsController = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        const post = await searchAllPostModel(keyword, req.user?.id);

        res.send({
            status: 'ok',
            data: post,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getPostsController;
