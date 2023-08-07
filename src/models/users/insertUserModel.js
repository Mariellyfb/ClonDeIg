const bcrypt = require("bcrypt");
const getDb = require("../../db/getDb");

const {
  emailAlreadyRegisteredError,
  userAlreadyRegisteredError,
} = require("../../services/errorService.js");

const insertUserModel = async (username, email, password) => {
  let connection;

  try {
    connection = await getDb();

    //Buscamos en la base de datos algun usuario con nombre
    let [users] = await connection.query(
      `SELECT id FROM users WHERE username = ?`,
      [username]
    );

    // Si existe algun usuario con ese nombre lanzamos un error.
    if (users.length > 0) {
      userAlreadyRegisteredError();
    }

    // Buscamos en la base de datos un usuario con ese email.
    [users] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      /* eslint-disable-next-line */
      [email]
    );

    // Si existe un usuario con ese email, lanzamos un error.
    if (users.length > 0) {
      emailAlreadyRegisteredError();
    }
    //Encriptamos la contraseña
    const hashedPass = await bcrypt.hash(password, 10);

    //Insertamos el usuario

    await connection.query(
      `INSERT INTO users(username, email, password) VALUES(?, ?, ?)`,
      [username, email, hashedPass]
    );
  } finally {
    if (connection) connection.release();
  }
};
module.exports = insertUserModel;
