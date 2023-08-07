// Importamos los modulos
const insertPostModel = require('../../models/posts/insertPostModel');
const insertPhotoModel = require('../../models/posts/insertPhotoModel');

// Importamos los servicios.
const savePhotoService = require('../../services/savePhotoService');
const validateSchemaService = require('../../services/validateSchemaService');

// Importamos el esquema.
const newPostSchema = require('../../services/newPostSchema');

// Función controladora final que agrega una nueva entrada.
const newPostController = async (req, res, next) => {
    try {
        const { description, photo } = req.body;

         // Validamos el body con Joi. Fusionamos en un solo objeto las propiedades de body y de files.
         await validateSchemaService(
            newPostSchema,
            Object.assign(req.body, req.files)
        );

        // Validamos el body con Joi. Fusionamos en un solo objeto las propiedades de body y de files.
        await (
            newPostSchema,
            Object.assign(req.body, req.files)
        );

          // Insertamos el post y obtenemos el id que se le ha asignado.
          const postId = await insertPostModel(
            description,
            photo,
            req.user.id
        );
        // Array donde almacenaremos las fotos
        const photos = [];

        // Si "req.files" existe quiere decir que hay algún archivo en la petición.
        if (req.files) {
            // Recorremos las fotos. Utilizamos el método "Object.values" para obtener un
            // array de fotos. Para limitar la subida a 10 fotos, aplico slice 
            for (const photo of Object.values(req.files).slice(0, 10)) {
                // Guardamos la foto en disco y obtenemos su nombre. Redimensionamos a un ancho
                // de 500px.
                const photoName = await savePhotoService(photo, 500);

                // Insertamos la foto en la tabla de fotos.
                const photoId = await insertPhotoModel(photoName, postId);

                // Pusheamos la foto al array de fotos.
                photos.push({
                    id: photoId,
                    name: photoName,
                });
            }
        }

        res.send({
            status: 'ok',
            data: {
                post: {
                    id: postId,
                    description,
                    userId: req.user.id,
                    photo,
                    createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newPostController;










