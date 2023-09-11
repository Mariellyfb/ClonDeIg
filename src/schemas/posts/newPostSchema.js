const joi = require('joi');

const joiErrorMessages = {
    'any.required': 'El campo "{#key}" es obligatorio',
    'string.base': 'El campo "{#key}" ha de ser un string',
    'string.empty': 'El campo "{#key}" no debe estar vacío',
    'number.max': 'El archivo no debe exceder los 625 MB',
    'any.only': 'Solo se permiten fotos gif, jpg, jpeg o png',
    'string.max': 'El campo "{#key}" no debe exceder los {#limit} caracteres',
    'object.unknown': 'No se permiten campos adicionales en este objeto',
};

const photoSchema = joi
    .object({
        name: joi.string().required().messages(joiErrorMessages),
        mimetype: joi
            .string()
            .valid('image/jpeg', 'image/png', 'image/jpg', 'image/gif')
            .required()
            .messages(joiErrorMessages),
        size: joi.number().max(625000000).required().messages(joiErrorMessages),
    })
    .unknown(true);

const newPostSchema = joi.object({
    description: joi.string().max(500).required().messages(joiErrorMessages),
    photo: photoSchema.required().messages(joiErrorMessages),
});
module.exports = newPostSchema;
