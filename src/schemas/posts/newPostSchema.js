const joi = require('joi');

// Modificamos los mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': 'El valor de "{#key}" debe ser una cadena',
    'any.required': 'El campo "{#key}" es requerido',
    'string.empty': 'El campo "{#key}" no debe estar vacío',
    'number.base': 'El valor de "{#key}" debe ser un número',
    'number.max': 'El archivo no debe exceder los 5 MB',
    'object.base': 'El valor de "{#key}" debe ser un objeto',
};

const photoSchema = joi
    .object({
        name: joi.string().required().messages(joiErrorMessages),
    })
    .unknown(true);

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newPostSchema = joi.object({
    description: joi
        .string()
        .min(5)
        .max(100)
        .required()
        .messages(joiErrorMessages),
    photo: photoSchema.messages(joiErrorMessages),
});

module.exports = newPostSchema;
