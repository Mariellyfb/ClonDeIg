// Importamos los modelos.
const { searchAllPostModel } = require('../../models/posts');

// Función controladora final que retorna todas los posts.
const getPostsController = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        console.log(req.user?.id);

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
