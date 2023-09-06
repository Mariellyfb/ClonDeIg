const insertUSerModel = require('../../models/users/insertUserModel');
const validateSchemaService = require('../../services/validateSchemaService');
const newUserSchema = require('../../schemas/users/newUserSchema');

const newUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        await validateSchemaService(newUserSchema, req.body);

        // Insertamos el usuario.
        await insertUSerModel(username, email, password);

        // Devolvemos un status 201 junto con la respuesta.
        res.status(201).send({
            status: 'created',
            message: 'Usuario creado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newUser;
