module.exports = {
    cannotLikeOwnPostError() {
        throw {
            httpStatus: 403, // Forbidden
            code: 'CANNOT_LIKE_OWN_POST',
            message: 'No puedes dar like a tu propio post',
        };
    },

    emailAlreadyRegisteredError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'USER_ALREADY_REGISTERED',
            message: 'El email ya está registrado',
        };
    },

    invalidCredentialsError() {
        throw {
            httpStatus: 401, // Invalid Credentials
            code: 'INVALID_CREDENTIALS',
            message: 'Las credenciales no son validas',
        };
    },

    invalidTokenError() {
        throw {
            httpStatus: 401, // Invalid Token
            code: 'INVALID_TOKEN',
            message: 'Token inválido',
        };
    },

    likeAlreadyExistsError() {
        throw {
            httpStatus: 403, // Like exists
            code: 'LIKE_ALREADY_EXIST',
            message: 'Ya le has dado like al mismo post',
        };
    },

    missingFieldsError() {
        throw {
            httpStatus: 400, // Bad Request
            code: 'MISSING_FIELDS',
            message: 'faltan campos',
        };
    },
    notAuthenticatedError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'NOT_AUTHENTICATED',
            message: `Debe enviar un token en el header 'Authorization'`,
        };
    },

    notFoundError() {
        throw {
            httpStatus: 404, // Not Found
            code: 'RESOURCE_NOT_FOUND',
            message: 'El recurso requerido no existe',
        };
    },

    saveFileError() {
        throw {
            httpStatus: 500, // Internal Server Error
            code: 'FILE_SAVE_FAILED',
            message: 'Error al guardar el archivo en el disco',
        };
    },

    userAlreadyRegisteredError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'USER_ALREADY_REGISTERED',
            message: 'El nombre de usuario ya está registrado',
        };
    },
};
