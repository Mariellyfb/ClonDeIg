// Importamos los modelos.
const insertPostModel = require('../../models/posts/insertPostModel');

// Importamos los servicios.
const savePhotoService = require('../../services/savePhotoService');

// Función controladora final que agrega un nuevo post.
const newPostController = async (req, res, next) => {
    try {
        const { description } = req.body;

        let fotoName;
        // Si "req.files" existe quiere decir que hay algún archivo en la petición.
        if (req.files) {
            // Recorremos los posts. Utilizamos el método "Object.values" para obtener un array de posts y limitamos los resultados a 10.
            for (const photo of Object.values(req.files).slice(0, 1)) {
                // Guardamos el post en disco y obtenemos su nombre. Redimensionamosusers/register a un ancho
                // de 500px.
                fotoName = await savePhotoService(photo, 500);
            }
        }

        // Insertamos el post y obtenemos el id que se le ha asignado.
        const postId = await insertPostModel(
            description,
            fotoName,
            req.user.id
        );

        res.status(201).send({
            status: 'ok',
            data: {
                post: {
                    postId,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newPostController;
