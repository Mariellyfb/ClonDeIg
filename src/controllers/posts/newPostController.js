// Importamos los modelos.
const insertPostModel = require('../../models/posts/insertPostModel');
const insertPhotoModel = require('../../models/posts/insertPhotoModel');

// Importamos los servicios.
const savePhotoService = require('../../services/savePhotoService');
const validateSchemaService = require('../../services/validateSchemaService');

// Importamos el esquema.
const newPostSchema = require('../../schemas/posts/newPostSchema');

// Función controladora final que agrega un nuevo post.
const newPostController = async (req, res, next) => {
    try {
        const { description, photo } = req.body;

        // Validamos el body con Joi. Fusionamos en un solo objeto las propiedades de body y de files.
        /*
        await validateSchemaService(
            newPostSchema,
            Object.assign(req.body, req.files)
        );
        */

        let fotoName;
        // Si "req.files" existe quiere decir que hay algún archivo en la petición.
        if (req.files) {
            // Recorremos los posts. Utilizamos el método "Object.values" para obtener un array de posts y limitamos los resultados a 10.
            for (const photo of Object.values(req.files).slice(0, 1)) {
                // Guardamos el post en disco y obtenemos su nombre. Redimensionamos a un ancho
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