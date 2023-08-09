// Importamos los modelos.
const {searchAllPostModel} = require('../../models/posts');

// Función controladora final que retorna una entrada con un id dado.
const getPostController = async (req, res, next) => {
    try {
        // Obtenemos el id de la entrada.
        //const { userId } = req.params;

        // Con la interrogación indicamos
        // a JavaScript que "user" puede ser undefined.
        const post = await searchAllPostModel();

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
