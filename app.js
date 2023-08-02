require('dotenv').config();
const morgan = require('morgan');
const newUserController = require('./src/controllers/users/newUserController');
//Importamos las dependencias

const express = require('express');
/*const cors = require("cors");
 */

// creamos servidor
const app = express();

//midleware de info por consola
app.use(morgan('dev'));

// Importamos los errores.
const {
    notFoundController,
    errorController,
} = require('./src/controllers/errors');

app.post(newUserController);

app.use(notFoundController)
app.use(errorController)

app.listen(process.env.PORT, () => {
    console.log(`Servidor en escucha en http://localhost:${process.env.PORT}`);
});
