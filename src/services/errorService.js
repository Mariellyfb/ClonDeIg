// eslint-disable-next-line no-undef
module.exports = {
    notFoundError(resource) {
        throw {
            httpStatus: 404, // Not Found
            code: 'RESOURCE_NOT_FOUND',
            message: `El recurso requerido '${resource}' no existe`,
        };
    },

    emailAlreadyRegisteredError() {
        throw {
            httpStatus: 409,
            code: 'EMAIL_ALREADY_REGISTERED',
            message: 'Email ya registrado',
        };
    },
    invalidCredentialsError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'INVALID_CREDENTIALS',
            message: 'Credenciales inválidas',
        };
    },
    notAuthenticatedError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'NOT_AUTHENTICATED',
            message: `Debes enviar un token en el header 'Authorization'`,
        };
    },
    saveFileError() {
        throw {
            httpStatus: 500, // Internal Server Error
            code: 'FILE_SAVE_FAILED',
            message: 'Error al guardar el archivo en el disco',
        };
    },
};
