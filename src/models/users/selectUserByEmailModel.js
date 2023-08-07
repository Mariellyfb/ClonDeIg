const getDb = require("../../db/getDb");

const { invalidCredentialsError } = require("../../services/errorService");

const selectUserByEmailModel = async (email) => {
  let connection;

  try {
    connection = await getDb();

    // Comprobamos si hay algun usuario con el email proporcionado.
    const [users] = await connection.query(
      `SELECT id, password FROM users  WHERE email = ?`,
      [email]
    );

    // Si no existe un usuario con ese email lanzamos un error.
    if (users.length < 1) {
      invalidCredentialsError();
    }

    // El array de usuarios solo podra contener un unico usuario.
    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByEmailModel;
