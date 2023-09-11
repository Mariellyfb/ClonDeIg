const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const selectUserByEmailModel = require('../../models/users/selectUserByEmailModel');
const validateSchemaService = require('../../services/validateSchemaService');
const loginUserSchema = require('../../schemas/users/loginUserSchema');

const { missingFieldsError } = require('../../services/errorService');
const { invalidCredentialsError } = require('../../services/errorService');
let connection;
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        await validateSchemaService(loginUserSchema, req.body);

        //Seleccionamos los datos del usuario que necesitamos utilizando el email.
        const user = await selectUserByEmailModel(email, password);

        //Comprobamos si la contraseña es válida.
        const validPass = await bcrypt.compare(password, user.password);

        //Si las contraseñas no coinciden lanzamos un error.
        if (!validPass) {
            invalidCredentialsError();
        }
        const tokenInfo = {
            id: user.id,
        };

        //Creamos el token
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '7d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;
