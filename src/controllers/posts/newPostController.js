// Importamos los modulos
const insertPostModel = require('../../models/posts/insertPosrModel');

// Importamos los servicios.
const savePhotoService = require('../../services/savePhotoService');
const validateSchemaService = require('../../services/validateSchemaService');
const newPostSchema = require('../../services/newPostSchema');

// Función controladora final que agrega una nueva entrada.
/*const newPostController = async (req, res, next) => {
    try {
        const { title, place, description } = req.body;

        // Validamos el body con Joi. Fusionamos en un solo objeto las propiedades de body y de files.
        await validateSchemaService(
            newEntrySchema,
            Object.assign(req.body, req.files)
        );
        }*/
