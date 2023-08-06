const express = require("express");
const router = express.Router();

const loginUser = require("../controllers/users/loginUser");

//Importamos las funciones controladoras neceasrias.
const newUser = require("../controllers/users/newUser");

//Crear un usuario.
router.post("/users", newUser);

// Login de usuario.
router.post("/users/login", loginUser);

module.exports = router;
