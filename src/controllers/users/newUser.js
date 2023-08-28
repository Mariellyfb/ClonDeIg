/* const insertUSerModel = require('../../models/users/insertUserModel');

const newUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        //Si falta algun campo lanzamos un error
        if (!username || !email || !password) {
            const err = new Error('Faltan campos');
            err.httpStatus = 400;
            throw err;
        }
        //Insertamos el usuario.
        await insertUSerModel(username, email, password);

        res.send({
            status: 'ok',
            message: 'Usuario creado',
        });
    } catch (err) {
        next(err);
    }
};
module.exports = newUser; */

const insertUSerModel = require('../../models/users/insertUserModel');

const newUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Si falta algún campo, lanzamos un error
        if (!username || !email || !password) {
            const err = new Error('Faltan campos');
            err.httpStatus = 400;
            throw err;
        }

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
