require('dotenv').config();

//Importamos las dependencias
const express = require('express');
// Ejecutamos el metodo "config" de "dotenv".
require('dotenv').config();

//Importamos las dependencias.
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// Importamos las rutas.
const routes = require('./src/routes');

// creamos servidor
const app = express();

// Middleware que muestra por consola info sobre la peticion entrante.
app.use(morgan('dev'));

// Middleware que evita que las CORS interfieran a la hora de conectar el frontend con
// el backend.
app.use(cors());

// Middleware que indica a Express cuál es el directorio de ficheros estáticos.
app.use(express.static(process.env.UPLOADS_DIR));

// Middleware que "Z" un body en formato raw, creando la propiedad "body" en el objeto "request".
app.use(express.json());

// Middleware que "desencripta" un body en formato "form-data" creando la propiedad
// "body" y la propiedad "files" en el objeto "request"
app.use(fileUpload());

//Middleware que indica a express dónde estan las rutas.
app.use(routes);

// Falta middleware errores

app.use((err, req, res, next) => {
    console.error(err);
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
