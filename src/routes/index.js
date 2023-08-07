// Importamos las dependencias.
const express = require('express');
const router = express.Router();

// Importamos las rutas de los usuarios y de las entradas.
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// Indicamos a express dónde están las rutas de los usuarios y las entradas.
router.use(userRoutes);
router.use(postRoutes);

module.exports = router;
