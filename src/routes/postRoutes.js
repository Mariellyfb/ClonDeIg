const express = require('express');
const router = express.Router();

// Importamos las funciones controladoras requeridas.
const searchPostIdModel = require('../middlewares/userNotExists');

const { searchPostUser } = require('../controllers/posts');

// Listar entradas.
router.get('/users/posts', searchPostIdModel, searchPostUser);

module.exports = router;
