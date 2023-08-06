const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDb = require("../../db/getDb");
const selectUserByEmailModel = require("../../models/users/selectUserByEmailModel");

const { missingFields } = require("../../services/errorService");
const { invalidCredentialsError } = require("../../services/errorService");
let connection;
const loginUser = async (req, res, next) => {
  try {
    connection = await getDb();
    const { email, password } = req.body;

    if (!email || !password) {
      missingFields();
    }
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
      /* role: user.role, */
    };

    //Creamos el token
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "7d",
    });

    res.send({
      status: "ok",
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = loginUser;
