const joi = require('joi');

const joiErrorMessages = {
    'any.required': 'El campo "{#key}" es obligatorio',
    'string.base': 'El campo "{#key}" ha de ser un string',
    'string.empty': 'El campo "{#key}" no debe estar vacío',
    'string.email':
        'Debe proporcionar un correo electrónico válido para "{#key}"',
    'string.pattern.base':
        'La contraseña debe contener 8 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo de puntuación para "{#key}"',
};

const newUserSchema = joi.object({
    username: joi.string().max(50).required().messages(joiErrorMessages),
    email: joi.string().email().max(100).required().messages(joiErrorMessages),
    password: joi
        .string()
        .pattern(
            /^(?=.*[!$%^&*()_+|~=`{}:";'<>¿?,.@\[\]])[a-zA-Z0-9!$%^&*()_+|~=`{}:";'<>¿?,.@\[\]]{8,}$/
        )
        .required()
        .messages(joiErrorMessages),
});
module.exports = newUserSchema;
