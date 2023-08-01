// Importamos las dependencias.
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const getDb = require('../../db/getDb');

//importamos error
const { emailAlreadyRegisteredError } = require('../../services/errorService');

const insertUserModel = async (username, email, password, registrationCode) => {
    let connection;

    try {
        connection = await getDb();

        // Buscamos en la base de datos algún usuario con ese nombre.
        let [users] = await connection.query(
            `SELECT id FROM users WHERE username = ?`,
            [username]
        );
        // Buscamos en la base de datos algún usuario con ese email.
        [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        // Si existe algún usuario con ese email lanzamos un error.
        if (users.length > 0) {
            emailAlreadyRegisteredError();
        }

        // Encriptamos la contraseña.
        const hashedPass = await bcrypt.hash(password, 10);

        // Insertamos el usuario.
        await connection.query(
            `INSERT INTO users(id, username, email, password, registrationCode) VALUES(?, ?, ?, ?, ?)`,
            [uuid.v4(), username, email, hashedPass, registrationCode]
        );
    } catch (err) {
        // Si hubo algún problema deshacemos todos los cambios en la base de datos que insertáramos
        // en el bloque try.
        await connection.rollback();

        // Arrojamos el error para enviarlo al middleware de error.
        throw err;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserModel;
