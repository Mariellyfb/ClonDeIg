const joi = require('joi');

const joiErrorMessages = {
    'any.required': 'El campo "{#label}" es obligatorio.',
    'string.email':
        'El campo "{#label}" debe ser un correo electrónico válido.',
    'string.min':
        'El campo "{#label}" debe tener al menos {#limit} caracteres.',
    'string.base': 'El campo "{#label}" debe ser una cadena de texto.',
    'date.iso':
        'El campo "{#label}" debe tener un formato ISO válido (AAAA-MM-DD).',
    'date.max': 'El campo (#label) ha de ser menor al día de hoy',
    'any.only': 'El campo "{#label}" debe ser {#valids}.',
};

const newUserSchema = joi.object({
    email: joi.string().email().required().messages(joiErrorMessages),
    password: joi.string().min(6).required().messages(joiErrorMessages),
    firstName: joi.string().required().messages(joiErrorMessages),
    lastName: joi.string().required().messages(joiErrorMessages),
    birthdate: joi
        .date()
        .iso()
        .max(new Date())
        .required()
        .messages(joiErrorMessages),
    phone: joi
        .string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages(joiErrorMessages),
});

module.exports = newUserSchema;
