const insertUserModel = require('../../models/users/insertUserModel');

//falta importar los servicios schema

const newUserController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del body.
        const { username, email, password } = req.body;
        // Insertamos el usuario.
        await insertUserModel(username, email, password);
        res.send({
            status: 'ok',
            message:
                'Usuario creado. Por favor, verifica tu usuario mediante el email que has recibido en tu email',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newUserController;
