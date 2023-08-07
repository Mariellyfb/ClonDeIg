require('dotenv').config();

//Importamos las dependencias
const express = require('express');
const morgan = require('morgan');
/* const cors = require("cors"); */
/* const fileUpload = require("express-fileupload"); */
const routes = require('./src/routes');

// creamos servidor
const app = express();

// Middleware que muestra por consola info sobre la peticion entrante.
app.use(morgan('dev'));

// Middleware que "Z" un body en formato raw, creando la propiedad "body" en el objeto "request".
app.use(express.json());

// falta middleware static y express-fileupload

//Middleware que indica a express dónde estan las rutas.
app.use(routes);

// Middleware de error.
app.use((err, req, res, next) => {
    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

// Middleware de ruta no encontrada.
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'La ruta no existe',
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor en escucha en http://localhost:${process.env.PORT}`);
});
