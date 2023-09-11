const joi = require('joi');

const joiErrorMessages = {
    'any.required': 'El campo "{#key}" es obligatorio',
    'string.base': 'El campo "{#key}" ha de ser un string',
    'string.empty': 'El campo "{#key}" no debe estar vacío',
    'string.email':
        'Debe proporcionar un correo electrónico válido para "{#key}"',
};

const loginUserSchema = joi.object({
    email: joi.string().email().max(100).required().messages(joiErrorMessages),

    password: joi.string().required().messages(joiErrorMessages),
});

module.exports = loginUserSchema;
