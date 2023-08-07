const joi = require('joi');

// Modificamos los mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'any.required': 'El campo "{#key}" es requerido',
    'number.base': 'El valor de "{#key}" debe ser un número',
    'number.min': 'El valor de "{#key}" debe ser mayor o igual a 1',
    'number.max': 'El valor de "{#key}" debe ser menor o igual a 5',
    'number.integer': 'El valor de "{#key}" debe ser un número entero',
};

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const likePostSchema = joi.object({
    value: joi
        .number()
        .integer()
        .min(1)
        .max(5)
        .required()
        .messages(joiErrorMessages),
});

module.exports = likePostSchema;
